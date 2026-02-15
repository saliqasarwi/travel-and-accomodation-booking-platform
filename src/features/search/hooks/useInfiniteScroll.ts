import { useEffect, useRef, useState, useCallback } from "react";

interface UseInfiniteScrollOptions {
  rootMargin?: string;
}

export default function useInfiniteScroll(
  options: UseInfiniteScrollOptions = {}
) {
  const { rootMargin = "200px" } = options;
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState(1);

  const resetPage = useCallback(() => setPage(1), []);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { rootMargin }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [rootMargin]);

  return { sentinelRef, page, resetPage } as const;
}
