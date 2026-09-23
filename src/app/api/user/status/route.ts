import { NextRequest, NextResponse } from 'next/server';
import { getUserRecord } from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const deviceId = searchParams.get('deviceId') || request.cookies.get('cg_device_id')?.value || 'dev_guest';

  const record = await getUserRecord(deviceId);

  const now = Date.now();
  const hasActivePass = record.paidUntil > now;
  const freeSpinsLeft = Math.max(0, 3 - record.freeSpinsUsed);

  return NextResponse.json({
    deviceId: record.deviceId,
    freeSpinsUsed: record.freeSpinsUsed,
    freeSpinsLeft,
    hasActivePass,
    passExpiresAt: record.paidUntil,
    isPaywallActive: !hasActivePass && freeSpinsLeft <= 0,
  });
}
