import { NextResponse } from 'next/server';
import { getCurrentAccount } from '@/lib/currentAccount';
import { hasActivePass } from '@/lib/accounts';
import { FREE_TURNS, PACK_GAMES } from '@/lib/packGames';

export const dynamic = 'force-dynamic';

// Returns the full prompts only to users with an active pass; everyone else gets the preview
export async function GET(req: Request) {
  const gameId = new URL(req.url).searchParams.get('game') ?? '';
  const game = PACK_GAMES[gameId];
  if (!game) return NextResponse.json({ error: 'UNKNOWN_GAME' }, { status: 404 });

  const account = await getCurrentAccount();
  const unlocked = hasActivePass(account);

  return NextResponse.json(
    {
      unlocked,
      freeTurns: FREE_TURNS,
      total: game.total,
      data: unlocked ? game.full : game.preview,
    },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}