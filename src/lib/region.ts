import { headers } from 'next/headers';
import type { Region } from './pricing';

export async function getRegion(): Promise<Region> {
  const h = await headers();
  // Vercel sets this header in production. Locally, use DEV_COUNTRY from .env.local
  const country = (h.get('x-vercel-ip-country') ?? process.env.DEV_COUNTRY ?? 'IN').toUpperCase();
  return country === 'IN' ? 'IN' : 'INTL';
}