import { NextRequest, NextResponse } from 'next/server';
import { getUserRecord, incrementFreeSpin } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const deviceId = body.deviceId || request.cookies.get('cg_device_id')?.value || 'dev_guest';

    const record = await getUserRecord(deviceId);
    const now = Date.now();
    const hasActivePass = record.paidUntil > now;

    // Check if user is trying to spin when free spins are used up and no pass
    if (!hasActivePass && record.freeSpinsUsed >= 3) {
      return NextResponse.json(
        { 
          error: 'PAYWALL_REQUIRED', 
          message: 'Free spin limit reached (3/3). Unlock 24-hour pass for ₹25 INR!' 
        }, 
        { status: 402 }
      );
    }

    // Increment free spin count if not on paid pass
    let updatedRecord = record;
    if (!hasActivePass) {
      updatedRecord = await incrementFreeSpin(deviceId);
    }

    const freeSpinsLeft = Math.max(0, 3 - updatedRecord.freeSpinsUsed);

    return NextResponse.json({
      success: true,
      deviceId,
      freeSpinsLeft,
      freeSpinsUsed: updatedRecord.freeSpinsUsed,
      hasActivePass,
    });
  } catch (err) {
    return NextResponse.json({ error: 'SERVER_ERROR' }, { status: 500 });
  }
}
