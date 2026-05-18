import { memo } from "react";
import type { Track } from "@domain/models";
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

export const TrackCard = memo(function TrackCard({ track }: TrackCardProps) {
  const imageUrl = track.album?.images?.[0]?.url ?? "/vite.svg";
  const primaryArtist = track.artists[0];

  return (
    <a
      target="_blank"
      href={track.external_urls.spotify}
      rel="noopener noreferrer"
      aria-label={`Play ${track.name}${primaryArtist ? ` by ${primaryArtist.name}` : ""}`}
      className="group flex items-center rounded-lg p-2.5 text-inherit no-underline transition-all duration-200 hover:bg-white/[0.06] focus-ring"
    >
      <LazyImage
        className="h-10 w-10 mr-4 rounded"
        skeletonClassName="h-10 w-10 rounded"
        src={imageUrl}
        alt={track.name}
      />
      <div className="flex flex-col min-w-0">
        <span className="text-base text-white truncate group-hover:text-spotify-green transition-colors duration-200">
          {track.name}
        </span>
        {primaryArtist && (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={primaryArtist.external_urls.spotify}
            aria-label={`Open ${primaryArtist.name} on Spotify`}
            className="text-sm text-gray-400 no-underline truncate hover:text-white hover:underline transition-colors duration-200 focus-ring"
            onClick={(e) => e.stopPropagation()}
          >
            {primaryArtist.name}
          </a>
        )}
      </div>
      <time className="ml-auto mr-4 text-sm text-gray-400 shrink-0" dateTime={`PT${Math.floor(track.duration_ms / 1000)}S`}>
        {formatDuration(track.duration_ms)}
      </time>
    </a>
  );
});
