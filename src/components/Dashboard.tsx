import { Artist } from "model/Artist";
import { SearchResultType } from "model/SearchResultType";
import { Track } from "model/Track";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  selectAccessToken,
  selectIsValidSession,
} from "redux/session/session.selector";
import { spotifySearch } from "services/search/Search";
import ArtistsList from "./artist-list/ArtistList";
import Navbar from "./navbar/Navbar";
import SearchForm from "./search/SearchForm";
import TracksList from "./track-list/TrackList";

const Dashboard = () => {
  const isValidSession = useSelector(selectIsValidSession);
  const accessToken = useSelector(selectAccessToken);
  const [tracks, setTracks] = useState<SearchResultType<Track>>();
  const [albums, setAlbums] = useState({});
  const [artists, setArtists] = useState<SearchResultType<Artist>>();

  const search = async (term: string) => {
    const result = await spotifySearch(term, accessToken!);
    if (!result) {
      // display error
    } else {
      const { tracks, albums, artists } = result;
      setTracks(tracks);
      setAlbums(albums);
      setArtists(artists);
    }
  };

  return (
    <React.Fragment>
      {isValidSession ? (
        <div>
          <Navbar />
          <div className="content">
            <SearchForm searchFn={(term) => search(term)} />
            {!!artists?.items?.length && (
              <ArtistsList artists={artists.items} />
            )}
            {!!tracks?.items?.length && <TracksList tracks={tracks.items} />}
          </div>
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </React.Fragment>
  );
};

export default Dashboard;
