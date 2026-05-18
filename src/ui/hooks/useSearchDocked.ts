import { useEffect, useRef, useState } from "react";

/**
 * Returns true when the sentinel has scrolled out of view (search should dock in the header).
 */
export function useSearchDocked(rootMargin = "-72px 0px 0px 0px") {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [isDocked, setIsDocked] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) setIsDocked(!entry.isIntersecting);
      },
      { rootMargin, threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { sentinelRef, isDocked };
}
