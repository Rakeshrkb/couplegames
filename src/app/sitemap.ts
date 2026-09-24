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
        ...gamePages, { url: `${SITE}/privacy`, lastModified: new Date(), priority: 0.3 },
        { url: `${SITE}/terms`, lastModified: new Date(), priority: 0.3 }, { url: `${SITE}/about`, lastModified: new Date(), priority: 0.4 },
        { url: `${SITE}/contact`, lastModified: new Date(), priority: 0.3 },
        { url: `${SITE}/credits`, lastModified: new Date(), priority: 0.2 },
        { url: `${SITE}/games`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    ];
}