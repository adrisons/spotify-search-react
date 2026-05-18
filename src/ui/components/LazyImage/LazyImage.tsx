import { useState, useCallback, memo } from "react";
import { Skeleton } from "@ui/components/Skeleton";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  skeletonClassName?: string;
}

export const LazyImage = memo(function LazyImage({
  src,
  alt,
  className = "",
  skeletonClassName,
}: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleLoad = useCallback(() => setLoaded(true), []);
  const handleError = useCallback(() => {
    setError(true);
    setLoaded(true);
  }, []);

  return (
    <div className={`relative ${className}`}>
      {!loaded && (
        <Skeleton className={`absolute inset-0 ${skeletonClassName ?? className}`} />
      )}
      {!error ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={`${className} transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
        />
      ) : (
        <div
          className={`${className} flex items-center justify-center bg-zinc-700 text-zinc-400 text-xs`}
        >
          {alt.charAt(0).toUpperCase()}
        </div>
      )}
    </div>
  );
});
