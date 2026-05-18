import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { SEARCH_QUERY_PARAM } from "@config/search";

export function useSearchQueryParam() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get(SEARCH_QUERY_PARAM) ?? "";

  const setQuery = useCallback(
    (term: string) => {
      const normalized = term.trim();
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (normalized) {
            next.set(SEARCH_QUERY_PARAM, normalized);
          } else {
            next.delete(SEARCH_QUERY_PARAM);
          }
          return next;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  return { query, setQuery };
}
