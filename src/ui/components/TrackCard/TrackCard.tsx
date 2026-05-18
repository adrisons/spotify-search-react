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
      className="flex items-center rounded-lg bg-zinc-900 p-2.5 text-inherit no-underline hover:bg-zinc-800 transition-colors"
    >
      <LazyImage
        className="h-10 w-10 mr-4 rounded"
        src={imageUrl}
        alt={track.name}
      />
      <div className="flex flex-col">
        <span className="text-base text-white">{track.name}</span>
        {primaryArtist && (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={primaryArtist.external_urls.spotify}
            className="text-sm text-gray-400 no-underline hover:text-white hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            {primaryArtist.name}
          </a>
        )}
      </div>
      <span className="ml-auto mr-4 text-sm text-gray-400">
        {formatDuration(track.duration_ms)}
      </span>
    </a>
  );
});
