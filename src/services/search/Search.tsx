import { Artist } from "model/Artist.model";
import { SearchResultType } from "model/SearchResultType";
import { get } from "utils/httpRequests";

const SPOTIFY_API = `https://api.spotify.com/v1`;
export const spotifySearch = async (searchTerm: string, accessToken: string) => {
  try {
    const API_URL = `${SPOTIFY_API}/search?query=${encodeURIComponent(
      searchTerm
    )}&type=album,track,artist`;
    const result: { albums: any; tracks: any; artists: SearchResultType<Artist> } = await get(
      API_URL,
      accessToken
    );
    return result;
  } catch (error) {
    console.log("error", error);
    return null;
  }
};
