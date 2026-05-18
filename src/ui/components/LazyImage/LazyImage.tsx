import { useState, useCallback, useEffect, useRef, memo } from "react";
import { SPOTIFY_ICON } from "@config/assets";
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
  const imgRef = useRef<HTMLImageElement>(null);
  const [displaySrc, setDisplaySrc] = useState(src);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setDisplaySrc(src);
    setLoaded(false);
    setFailed(false);
  }, [src]);

  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [displaySrc]);

  const handleLoad = useCallback(() => setLoaded(true), []);
  const handleError = useCallback(() => {
    if (displaySrc !== SPOTIFY_ICON) {
      setDisplaySrc(SPOTIFY_ICON);
      setLoaded(false);
      return;
    }
    setFailed(true);
    setLoaded(true);
  }, [displaySrc]);

  return (
    <div className={`relative ${className}`}>
      {!loaded && (
        <Skeleton className={`absolute inset-0 ${skeletonClassName ?? className}`} />
      )}
      {!failed ? (
        <img
          ref={imgRef}
          src={displaySrc}
          alt={alt}
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
