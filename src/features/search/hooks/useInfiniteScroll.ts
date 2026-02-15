import { useRef, useState, useCallback } from "react";

interface UseInfiniteScrollOptions {
  rootMargin?: string;
}

export default function useInfiniteScroll(
  options: UseInfiniteScrollOptions = {}
) {
  const { rootMargin = "200px" } = options;
  const [page, setPage] = useState(1);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const resetPage = useCallback(() => setPage(1), []);

  const sentinelRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      if (node) {
        observerRef.current = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setPage((prev) => prev + 1);
            }
          },
          { rootMargin }
        );
        observerRef.current.observe(node);
      }
    },
    [rootMargin]
  );

  return { sentinelRef, page, resetPage } as const;
}
