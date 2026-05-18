import { useState, useCallback, useEffect, useRef } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@application/store/hooks";
import {
  selectAccessToken,
  selectIsValidSession,
  logout,
} from "@application/store/session/sessionSlice";
import { addSearchTerm } from "@application/store/ui/uiSlice";
import { searchSpotify } from "@infrastructure/spotify";
import type { Artist, Track, PaginatedResult } from "@domain/models";
import { Navbar } from "@ui/components/Navbar";
import { SearchForm } from "@ui/components/SearchForm";
import { ArtistCard } from "@ui/components/ArtistCard";
import { artistCarouselItemClass } from "@ui/components/ArtistCard/artistCardStyles";
import { Carousel } from "@ui/components/Carousel";
import { TrackCard } from "@ui/components/TrackCard";
import { SearchResultsSkeleton } from "@ui/components/Skeleton";
import { useSearchDocked } from "@ui/hooks/useSearchDocked";
import { useSearchQueryParam } from "@ui/hooks/useSearchQueryParam";
import { cn } from "@ui/lib/utils";

export function DashboardPage() {
  const location = useLocation();
  const isValidSession = useAppSelector(selectIsValidSession);
  const accessToken = useAppSelector(selectAccessToken);
  const dispatch = useAppDispatch();
  const { sentinelRef, isDocked } = useSearchDocked();
  const { query: queryFromUrl, setQuery: setUrlQuery } = useSearchQueryParam();
  const lastFetchedQueryRef = useRef<string | null>(null);

  const [tracks, setTracks] = useState<PaginatedResult<Track>>();
  const [artists, setArtists] = useState<PaginatedResult<Artist>>();
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const executeSearch = useCallback(
    async (term: string) => {
      if (!accessToken) return;
      const normalized = term.trim();
      if (!normalized) return;

      scrollToTop();
      setIsLoading(true);
      setHasSearched(true);
      dispatch(addSearchTerm(normalized));

      try {
        const result = await searchSpotify(normalized, accessToken);
        if (result) {
          setTracks(result.tracks);
          setArtists(result.artists);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [accessToken, dispatch, scrollToTop]
  );

  const handleSearch = useCallback(
    (term: string) => {
      setUrlQuery(term);
    },
    [setUrlQuery]
  );

  const handleClearSearch = useCallback(() => {
    lastFetchedQueryRef.current = null;
    setUrlQuery("");
    setTracks(undefined);
    setArtists(undefined);
    setHasSearched(false);
  }, [setUrlQuery]);

  useEffect(() => {
    const term = queryFromUrl.trim();
    if (!term) {
      if (lastFetchedQueryRef.current !== null) {
        lastFetchedQueryRef.current = null;
        setTracks(undefined);
        setArtists(undefined);
        setHasSearched(false);
      }
      return;
    }
    if (!accessToken) return;
    if (term === lastFetchedQueryRef.current) return;

    lastFetchedQueryRef.current = term;
    void executeSearch(term);
  }, [queryFromUrl, accessToken, executeSearch]);

  if (!isValidSession) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const hasArtists = artists?.items && artists.items.length > 0;
  const hasTracks = tracks?.items && tracks.items.length > 0;
  const noResults = hasSearched && !isLoading && !hasArtists && !hasTracks;

  return (
    <div className="relative min-h-screen text-white">
      <Navbar
        onLogout={() => dispatch(logout())}
        isSearchDocked={isDocked}
        search={
          <SearchForm
            initialQuery={queryFromUrl}
            onSearch={handleSearch}
            onClear={handleClearSearch}
            compact={isDocked}
          />
        }
      />

      <main className="layout-page pb-12" aria-label="Search results">
        <div ref={sentinelRef} className="h-px w-full" aria-hidden="true" />

        <div aria-live="polite" aria-atomic="true">
          {isLoading && <SearchResultsSkeleton />}

          {!hasSearched && !isLoading && (
            <p className="layout-section type-muted text-center">
              Search for an artist, album, or track to get started.
            </p>
          )}

          {!isLoading && hasArtists && (
            <section className="layout-section animate-fade-in" aria-label="Artists">
              <h2 className="type-section mb-4">Artists</h2>
              <Carousel ariaLabel="Artists carousel" className="px-1">
                {artists!.items.map((artist, i) => (
                  <div
                    key={artist.id}
                    role="listitem"
                    className={cn("animate-slide-up", artistCarouselItemClass)}
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <ArtistCard artist={artist} />
                  </div>
                ))}
              </Carousel>
            </section>
          )}

          {!isLoading && hasTracks && (
            <section
              className="layout-section animate-fade-in"
              style={{ animationDelay: "100ms" }}
              aria-label="Tracks"
            >
              <h2 className="type-section mb-4">Tracks</h2>
              <div
                className="scrollbar-themed surface-panel flex max-h-[450px] flex-col gap-0.5 overflow-y-auto p-1.5"
                role="list"
              >
                {tracks!.items.map((track, i) => (
                  <div
                    key={track.id}
                    role="listitem"
                    className="animate-slide-up"
                    style={{ animationDelay: `${i * 30}ms` }}
                  >
                    <TrackCard track={track} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {noResults && (
            <p className="layout-section type-muted animate-fade-in text-center">
              No results found. Try a different search term.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
