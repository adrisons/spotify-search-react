import ArtistCard from "components/artist-card/ArtistCard";
import { Artist } from "model/Artist";
import React from "react";
import "./ArtistList.scss";

const ArtistsList = ({ artists }: { artists: Artist[] }) => {
  return (
    <React.Fragment>
      {artists.length > 0 && (
        <div className="artists-container">
          <h2>Artists</h2>
          <div className="artist-list">
            {artists.map((artist, index) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default ArtistsList;
