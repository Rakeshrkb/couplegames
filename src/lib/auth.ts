'use client';

// Zero-Input 1-Click Device Token Generator
export function getOrCreateDeviceId(): string {
  if (typeof window === 'undefined') {
    return 'server_device_placeholder';
  }

  const STORAGE_KEY = 'cg_device_id';
  let deviceId = localStorage.getItem(STORAGE_KEY);

  if (!deviceId) {
    // Auto-generate crypto UUIDv4 token for 1-click device identity
    deviceId = 'dev_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    localStorage.setItem(STORAGE_KEY, deviceId);
  }

  // Sync to cookie so Next.js API endpoints can read it
  document.cookie = `cg_device_id=${deviceId}; path=/; max-age=31536000; SameSite=Lax`;

  return deviceId;
}
