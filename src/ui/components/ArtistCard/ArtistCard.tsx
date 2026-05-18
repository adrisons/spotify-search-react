import { memo } from "react";
import type { Artist } from "@domain/models";
import { SPOTIFY_ICON } from "@config/assets";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { LazyImage } from "@ui/components/LazyImage";
import { Card } from "@ui/components/ui/card";
import { cn } from "@ui/lib/utils";
import { artistCardSizeClass } from "./artistCardStyles";

interface ArtistCardProps {
  artist: Artist;
}

export const ArtistCard = memo(function ArtistCard({ artist }: ArtistCardProps) {
  const imageUrl = artist.images?.[0]?.url ?? SPOTIFY_ICON;

  return (
    <Card
      className={cn(
        artistCardSizeClass,
        "surface-card group relative gap-0 bg-transparent py-0",
        "transition-all duration-300",
        "hover:scale-[1.02] hover:border-white/25",
        "hover:shadow-[0_16px_48px_rgba(0,0,0,0.38),0_0_48px_rgba(29,185,84,0.14),0_0_72px_rgba(139,92,246,0.1)]"
      )}
    >
      <a
        target="_blank"
        href={artist.external_urls.spotify}
        rel="noopener noreferrer"
        aria-label={`Open ${artist.name} on Spotify`}
        className="flex h-full flex-col text-inherit no-underline focus-ring"
      >
        <div className="relative aspect-square w-full shrink-0 overflow-hidden">
          <LazyImage
            className="h-full w-full object-cover"
            skeletonClassName="h-full w-full"
            src={imageUrl}
            alt={artist.name}
          />
        </div>
        <div className="flex min-h-0 flex-1 items-center px-4 py-3">
          <p className="type-card-title line-clamp-2 pr-8">{artist.name}</p>
        </div>
        <BsFillPlayCircleFill
          className="absolute right-3 bottom-3 text-3xl text-spotify-green opacity-0 translate-y-1 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100"
          aria-hidden="true"
        />
      </a>
    </Card>
  );
});
