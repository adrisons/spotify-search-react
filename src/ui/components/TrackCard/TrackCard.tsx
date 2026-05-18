import { memo } from "react";
import type { Track } from "@domain/models";
import { SPOTIFY_ICON } from "@config/assets";
import { LazyImage } from "@ui/components/LazyImage";

interface TrackCardProps {
  track: Track;
}

function formatDuration(ms: number): string {
  const minutes = Math.floor(ms / 60000);
  const seconds = Number(((ms % 60000) / 1000).toFixed(0));
  return seconds === 60
    ? `${minutes + 1}:00`
    : `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

const linkClassName =
  "text-inherit no-underline transition-colors duration-200 focus-ring";

export const TrackCard = memo(function TrackCard({ track }: TrackCardProps) {
  const imageUrl = track.album?.images?.[0]?.url ?? SPOTIFY_ICON;
  const primaryArtist = track.artists[0];
  const trackUrl = track.external_urls.spotify;

  return (
    <div className="group flex items-center rounded-xl p-2.5 transition-all duration-200 hover:bg-gradient-to-r hover:from-spotify-green/10 hover:via-violet-500/5 hover:to-cyan-400/5 hover:backdrop-blur-sm">
      <a
        target="_blank"
        href={trackUrl}
        rel="noopener noreferrer"
        aria-label={`Play ${track.name}${primaryArtist ? ` by ${primaryArtist.name}` : ""}`}
        className={`${linkClassName} shrink-0`}
      >
        <LazyImage
          className="h-10 w-10 rounded"
          skeletonClassName="h-10 w-10 rounded"
          src={imageUrl}
          alt=""
        />
      </a>
      <div className="ml-4 flex min-w-0 flex-1 flex-col">
        <a
          target="_blank"
          href={trackUrl}
          rel="noopener noreferrer"
          className={`${linkClassName} type-title truncate group-hover:text-spotify-green`}
        >
          {track.name}
        </a>
        {primaryArtist && (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={primaryArtist.external_urls.spotify}
            aria-label={`Open ${primaryArtist.name} on Spotify`}
            className={`${linkClassName} type-caption truncate hover:text-white/80 hover:underline`}
          >
            {primaryArtist.name}
          </a>
        )}
      </div>
      <time
        className="type-caption ml-auto mr-4 shrink-0 tabular-nums"
        dateTime={`PT${Math.floor(track.duration_ms / 1000)}S`}
      >
        {formatDuration(track.duration_ms)}
      </time>
    </div>
  );
});
