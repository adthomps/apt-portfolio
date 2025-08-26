import React from "react";

interface MediaBannerProps {
  src?: string;
  srcSet?: string;
  sizes?: string;
  alt: string;
  className?: string;
  fallbackText?: string;
}

export function MediaBanner({ src, srcSet, sizes, alt, className, fallbackText }: MediaBannerProps) {
  // Always render wrapper to allow fallback when image fails
  const [errored, setErrored] = React.useState(false);
  const showImage = !!src && !errored;
  return (
    <div
      className={`aspect-video w-full rounded-md overflow-hidden bg-gray-100 flex items-center justify-center ${className || ""}`}
      style={{ minHeight: 120 }}
    >
      {showImage && (
        <img
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt || "Media banner"}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
          decoding="async"
          onError={() => setErrored(true)}
        />
      )}
      {!showImage && (
        <span className="text-muted-foreground/70 text-base sm:text-lg md:text-xl w-full h-full flex items-center justify-center p-4 text-center">
          {fallbackText || alt || "Image unavailable"}
        </span>
      )}
    </div>
  );
}
