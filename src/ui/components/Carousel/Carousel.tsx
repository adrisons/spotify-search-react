import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@ui/components/ui/button";
import { cn } from "@ui/lib/utils";

interface CarouselProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  ariaLabel: string;
}

export function Carousel({
  children,
  className,
  contentClassName,
  ariaLabel,
}: CarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 1);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateScrollState();

    el.addEventListener("scroll", updateScrollState, { passive: true });

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(updateScrollState)
        : null;
    resizeObserver?.observe(el);

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      resizeObserver?.disconnect();
    };
  }, [updateScrollState, children]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;

    const amount = Math.max(el.clientWidth * 0.75, 200);
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={cn("group/carousel relative overflow-visible", className)}
      aria-label={ariaLabel}
      role="region"
    >
      {canScrollLeft && (
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          aria-label="Scroll left"
          onClick={() => scroll("left")}
          className={cn(
            "absolute top-1/2 left-0 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full glass-strong",
            "border-white/10 text-white shadow-lg shadow-black/30",
            "opacity-0 transition-all duration-200",
            "group-hover/carousel:opacity-100",
            "hover:scale-105 hover:border-white/20 hover:bg-white/10",
            "focus-visible:opacity-100"
          )}
        >
          <ChevronLeft />
        </Button>
      )}

      <div
        ref={scrollRef}
        className={cn(
          "scrollbar-themed flex gap-2 overflow-x-auto scroll-smooth py-4",
          "snap-x snap-mandatory",
          contentClassName
        )}
        role="list"
      >
        {children}
      </div>

      {canScrollRight && (
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          aria-label="Scroll right"
          onClick={() => scroll("right")}
          className={cn(
            "absolute top-1/2 right-0 z-10 translate-x-1/2 -translate-y-1/2 rounded-full glass-strong",
            "border-white/10 text-white shadow-lg shadow-black/30",
            "opacity-0 transition-all duration-200",
            "group-hover/carousel:opacity-100",
            "hover:scale-105 hover:border-white/20 hover:bg-white/10",
            "focus-visible:opacity-100"
          )}
        >
          <ChevronRight />
        </Button>
      )}
    </div>
  );
}
