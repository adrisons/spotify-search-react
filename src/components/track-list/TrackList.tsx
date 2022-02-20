import TrackCard from "components/track-card/TrackCard";
import { Track } from "model/Track";
import React from "react";
import "./TrackList.scss";

const TracksList = ({ tracks }: { tracks: Track[] }) => {
  return (
    <React.Fragment>
      {tracks.length > 0 && (
        <div className="tracks-container">
          <h2>Tracks</h2>
          <div className="track-list">
            {tracks.map((track, index) => (
              <TrackCard key={track.id} track={track} />
            ))}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default TracksList;
