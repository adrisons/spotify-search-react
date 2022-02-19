import { Artist } from "model/Artist.model";
import React from "react";
import { BsFillPlayCircleFill } from "react-icons/bs";
import "./ArtistCard.scss";

const ArtistCard = ({ artist }: { artist: Artist }) => {
  return (
    <React.Fragment>
      <a
        target="_blank"
        href={artist.external_urls.spotify}
        rel="noopener noreferrer"
        className="artist-card"
      >
        {
          <img
            className="artist-card__img"
            src={
              !!artist.images?.length
                ? artist.images[0].url
                : "assets/spotify-logo.png"
            }
            alt="Artist"
          />
        }
        <div className="artist-card__title">{artist.name}</div>
        <div className="artist-card__tag">Artist</div>
        <BsFillPlayCircleFill className="artist-card__play-icon" />
      </a>
    </React.Fragment>
  );
};

export default ArtistCard;
