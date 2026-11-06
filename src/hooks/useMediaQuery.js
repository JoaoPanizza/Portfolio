import { useCallback, useMemo, useSyncExternalStore } from 'react';

export default function useMediaQuery(query, serverValue = false) {
  const media = useMemo(() => window.matchMedia(query), [query]);
  const subscribe = useCallback(
    (callback) => {
      media.addEventListener('change', callback);
      return () => media.removeEventListener('change', callback);
    },
    [media],
  );

  return useSyncExternalStore(
    subscribe,
    () => media.matches,
    () => serverValue,
  );
}
