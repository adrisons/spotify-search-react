import type { Artist } from "@domain/models";
import { BsFillPlayCircleFill } from "react-icons/bs";

interface ArtistCardProps {
  artist: Artist;
}

export function ArtistCard({ artist }: ArtistCardProps) {
  const imageUrl = artist.images?.[0]?.url ?? "/vite.svg";

  return (
    <a
      target="_blank"
      href={artist.external_urls.spotify}
      rel="noopener noreferrer"
      className="group relative flex min-w-[150px] flex-col rounded-lg bg-zinc-900 p-5 mr-4 text-inherit no-underline hover:bg-zinc-800 transition-colors"
    >
      <img
        className="h-24 w-24 rounded-full object-cover"
        src={imageUrl}
        alt={artist.name}
      />
      <div className="mt-4 text-2xl font-bold break-words leading-tight">
        {artist.name}
      </div>
      <span className="mt-1 inline-block w-fit rounded-full bg-black/20 px-3 py-1 text-[0.625rem] font-bold uppercase tracking-wider">
        Artist
      </span>
      <BsFillPlayCircleFill className="absolute bottom-5 right-5 text-green-500 text-4xl opacity-0 group-hover:opacity-100 transition-opacity" />
    </a>
  );
}
