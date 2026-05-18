import { memo } from "react";
import type { Artist } from "@domain/models";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { LazyImage } from "@ui/components/LazyImage";

interface ArtistCardProps {
  artist: Artist;
}

export const ArtistCard = memo(function ArtistCard({ artist }: ArtistCardProps) {
  const imageUrl = artist.images?.[0]?.url ?? "/vite.svg";

  return (
    <a
      target="_blank"
      href={artist.external_urls.spotify}
      rel="noopener noreferrer"
      aria-label={`Open ${artist.name} on Spotify`}
      className="group relative flex min-w-[150px] flex-col rounded-xl glass p-5 mr-4 text-inherit no-underline transition-all duration-200 hover:bg-white/[0.08] hover:scale-[1.02] hover:shadow-lg hover:shadow-black/20 focus-ring"
    >
      <LazyImage
        className="h-24 w-24 rounded-full object-cover"
        skeletonClassName="h-24 w-24 rounded-full"
        src={imageUrl}
        alt={artist.name}
      />
      <div className="mt-4 text-2xl font-bold break-words leading-tight">
        {artist.name}
      </div>
      <span className="mt-1 inline-block w-fit rounded-full bg-white/5 px-3 py-1 text-[0.625rem] font-bold uppercase tracking-wider text-gray-300">
        Artist
      </span>
      <BsFillPlayCircleFill
        className="absolute bottom-5 right-5 text-spotify-green text-4xl opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200"
        aria-hidden="true"
      />
    </a>
  );
});
