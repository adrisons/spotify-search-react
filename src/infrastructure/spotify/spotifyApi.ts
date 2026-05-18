import type { Artist, Track, PaginatedResult } from "@domain/models";
import { httpClient } from "@infrastructure/http/httpClient";

const SPOTIFY_API = "https://api.spotify.com/v1";

export interface SpotifySearchResponse {
  albums: PaginatedResult<unknown>;
  tracks: PaginatedResult<Track>;
  artists: PaginatedResult<Artist>;
}

export async function searchSpotify(
  searchTerm: string,
  accessToken: string
): Promise<SpotifySearchResponse | null> {
  try {
    httpClient.setAuthToken(accessToken);
    const query = encodeURIComponent(searchTerm);
    const url = `${SPOTIFY_API}/search?query=${query}&type=album,track,artist`;
    return await httpClient.get<SpotifySearchResponse>(url);
  } catch (error) {
    console.error("Spotify search error:", error);
    return null;
  }
}
