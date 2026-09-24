import type { MetadataRoute } from 'next';
import { GAMES_DATA } from '@/data/gamesData';

const SITE = 'https://www.playcouplegames.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const gamePages = GAMES_DATA
    .filter((g) => g.category !== 'spicy')
    .map((g) => ({
      url: `${SITE}/games/${g.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

  return [
    { url: SITE, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    ...gamePages,
  ];
}