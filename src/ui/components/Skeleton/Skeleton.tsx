import { memo } from "react";
import { Carousel } from "@ui/components/Carousel";
import {
  artistCardSizeClass,
  artistCarouselItemClass,
} from "@ui/components/ArtistCard/artistCardStyles";
import { cn } from "@ui/lib/utils";

interface SkeletonProps {
  className?: string;
}

export const Skeleton = memo(function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded bg-white/[0.06] ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
});

export function ArtistCardSkeleton() {
  return (
    <div
      className={cn(
        artistCardSizeClass,
        "surface-card flex flex-col p-5"
      )}
    >
      <Skeleton className="h-24 w-24 shrink-0 rounded-full" />
      <Skeleton className="mt-4 h-10 w-full" />
      <Skeleton className="mt-auto h-5 w-16 rounded-full" />
    </div>
  );
}

export function TrackCardSkeleton() {
  return (
    <div className="flex items-center rounded-lg p-2.5">
      <Skeleton className="h-10 w-10 mr-4 rounded" />
      <div className="flex flex-col gap-1.5">
        <Skeleton className="h-4 w-36" />
        <Skeleton className="h-3 w-24" />
      </div>
      <Skeleton className="ml-auto mr-4 h-3 w-10" />
    </div>
  );
}

export function SearchResultsSkeleton() {
  return (
    <div role="status" aria-label="Loading search results">
      <section className="layout-section">
        <Skeleton className="mb-4 h-3 w-16" />
        <Carousel ariaLabel="Loading artists">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className={artistCarouselItemClass}>
              <ArtistCardSkeleton />
            </div>
          ))}
        </Carousel>
      </section>
      <section className="layout-section">
        <Skeleton className="mb-4 h-3 w-16" />
        <div className="surface-panel flex flex-col gap-0.5 p-1.5">
          {Array.from({ length: 6 }, (_, i) => (
            <TrackCardSkeleton key={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
