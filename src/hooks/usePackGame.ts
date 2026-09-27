'use client';

import { useCallback, useEffect, useState } from 'react';

interface PackGameState<T> {
  data: T | null;
  unlocked: boolean;
  freeTurns: number;
  total: number;
  loading: boolean;
  error: boolean;
  reload: () => void;
}

// Loads a locked game's prompts: full set with a pass, free preview without
export function usePackGame<T>(gameId: string): PackGameState<T> {
  const [data, setData] = useState<T | null>(null);
  const [unlocked, setUnlocked] = useState(false);
  const [freeTurns, setFreeTurns] = useState(3);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    setError(false);
    fetch(`/api/pack/prompts?game=${encodeURIComponent(gameId)}`, { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d) => {
        setData(d.data as T);
        setUnlocked(!!d.unlocked);
        setFreeTurns(d.freeTurns ?? 3);
        setTotal(d.total ?? 0);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [gameId]);

  useEffect(() => {
    load();
  }, [load]);

  return { data, unlocked, freeTurns, total, loading, error, reload: load };
}