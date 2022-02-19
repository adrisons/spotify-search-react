import ArtistCard from "components/artist-card/ArtistCard";
import { Artist } from "model/Artist.model";
import React from "react";
import "./ArtistList.scss";

const ArtistsList = ({ artists }: { artists: Artist[] }) => {
  return (
    <React.Fragment>
      {Object.keys(artists).length > 0 && (
        <div className="artist-list">
          {artists.map((artist, index) => (
            <ArtistCard key={index} artist={artist} />
          ))}
        </div>
      )}
    </React.Fragment>
  );
};

export default ArtistsList;
