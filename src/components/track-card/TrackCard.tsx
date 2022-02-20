import { Track } from "model/Track";
import React from "react";
import "./TrackCard.scss";

function millisToMinutesAndSeconds(millis: number) {
  let minutes = Math.floor(millis / 60000);
  let seconds = Number(((millis % 60000) / 1000).toFixed(0));
  return seconds === 60
    ? minutes + 1 + ":00"
    : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

const TrackCard = ({ track }: { track: Track }) => {
  return (
    <React.Fragment>
      <a
        target="_blank"
        href={track.external_urls.spotify}
        rel="noopener noreferrer"
        className="track-card"
      >
        {
          <img
            className="track-card__img"
            src={
              !!track?.album?.images?.length
                ? track.album.images[0].url
                : "assets/spotify-logo.png"
            }
            alt="Track"
          />
        }
        <div className="center">
          <div className="track-card__title">{track.name}</div>

          {!!track.artists[0] && (
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="track-card__artist"
              href={track.artists[0].external_urls.spotify}
            >
              {track.artists[0].name}
            </a>
          )}
        </div>
        <span className="track-card__duration">{millisToMinutesAndSeconds(track.duration_ms)}</span>
      </a>
    </React.Fragment>
  );
};

export default TrackCard;
