import { memo } from "react";

interface SkeletonProps {
  className?: string;
}

export const Skeleton = memo(function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded bg-white/[0.08] ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
});

export function ArtistCardSkeleton() {
  return (
    <div className="flex min-w-[150px] flex-col rounded-xl glass p-5 mr-4">
      <Skeleton className="h-24 w-24 rounded-full" />
      <Skeleton className="mt-4 h-7 w-28" />
      <Skeleton className="mt-2 h-5 w-16 rounded-full" />
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
    <div className="mx-auto max-w-7xl" role="status" aria-label="Loading search results">
      <section className="px-5 mt-4">
        <Skeleton className="h-6 w-20 mb-3" />
        <div className="flex overflow-x-auto pb-4">
          {Array.from({ length: 5 }, (_, i) => (
            <ArtistCardSkeleton key={i} />
          ))}
        </div>
      </section>
      <section className="px-5 mt-6">
        <Skeleton className="h-6 w-20 mb-3" />
        <div className="flex flex-col gap-0.5 rounded-xl glass p-1">
          {Array.from({ length: 6 }, (_, i) => (
            <TrackCardSkeleton key={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
