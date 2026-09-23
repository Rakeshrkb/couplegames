import { NextRequest, NextResponse } from 'next/server';
import { activate24HourPass } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const deviceId = body.deviceId || request.cookies.get('cg_device_id')?.value || 'dev_guest';

    // Activate 24-hour pass in MongoDB
    const updatedRecord = await activate24HourPass(deviceId);

    return NextResponse.json({
      success: true,
      deviceId,
      hasActivePass: true,
      paidUntil: updatedRecord.paidUntil,
      message: '₹25 INR Payment Verified! 24-Hour Hot Fantasies Pass Activated!',
    });
  } catch (err) {
    return NextResponse.json({ error: 'PAYMENT_VERIFICATION_FAILED' }, { status: 500 });
  }
}
