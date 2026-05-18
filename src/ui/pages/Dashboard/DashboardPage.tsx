import { useState, useCallback } from "react";
import { Navigate } from "react-router-dom";
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
import { TrackCard } from "@ui/components/TrackCard";
import { SearchResultsSkeleton } from "@ui/components/Skeleton";

export function DashboardPage() {
  const isValidSession = useAppSelector(selectIsValidSession);
  const accessToken = useAppSelector(selectAccessToken);
  const dispatch = useAppDispatch();

  const [tracks, setTracks] = useState<PaginatedResult<Track>>();
  const [artists, setArtists] = useState<PaginatedResult<Artist>>();
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = useCallback(
    async (term: string) => {
      if (!accessToken) return;
      setIsLoading(true);
      setHasSearched(true);
      dispatch(addSearchTerm(term));

      try {
        const result = await searchSpotify(term, accessToken);
        if (result) {
          setTracks(result.tracks);
          setArtists(result.artists);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [accessToken, dispatch]
  );

  if (!isValidSession) {
    return <Navigate to="/login" />;
  }

  const hasArtists = artists?.items && artists.items.length > 0;
  const hasTracks = tracks?.items && tracks.items.length > 0;
  const noResults = hasSearched && !isLoading && !hasArtists && !hasTracks;

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-800 to-zinc-950 text-white">
      <Navbar onLogout={() => dispatch(logout())} />
      <main className="mx-auto max-w-7xl">
        <SearchForm onSearch={handleSearch} />

        {isLoading && <SearchResultsSkeleton />}

        {!isLoading && hasArtists && (
          <section className="px-5 mt-4">
            <h2 className="text-xl font-bold mb-3">Artists</h2>
            <div className="flex overflow-x-auto pb-4">
              {artists!.items.map((artist) => (
                <ArtistCard key={artist.id} artist={artist} />
              ))}
            </div>
          </section>
        )}

        {!isLoading && hasTracks && (
          <section className="px-5 mt-6">
            <h2 className="text-xl font-bold mb-3">Tracks</h2>
            <div className="flex flex-col gap-1 max-h-[450px] overflow-y-auto">
              {tracks!.items.map((track) => (
                <TrackCard key={track.id} track={track} />
              ))}
            </div>
          </section>
        )}

        {noResults && (
          <p className="px-5 mt-8 text-center text-gray-400">
            No results found. Try a different search term.
          </p>
        )}
      </main>
    </div>
  );
}
