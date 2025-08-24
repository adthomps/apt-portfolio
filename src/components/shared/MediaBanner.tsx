import React from "react";

interface MediaBannerProps {
  src?: string;
  srcSet?: string;
  sizes?: string;
  alt: string;
  className?: string;
}

export function MediaBanner({ src, srcSet, sizes, alt, className }: MediaBannerProps) {
  if (!src) return null;
  return (
    <div
      className={`aspect-video w-full rounded-md overflow-hidden bg-gray-100 flex items-center justify-center ${className || ""}`}
      style={{ minHeight: 120 }}
    >
      {src ? (
        <img
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt || "Media banner"}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
          decoding="async"
          onError={e => {
            // Hide image and show fallback on error
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
            if (target.nextSibling) {
              (target.nextSibling as HTMLElement).style.display = "flex";
            }
          }}
        />
      ) : null}
      {!src && (
        <span className="text-3xl text-gray-400 w-full h-full flex items-center justify-center">
          {"Blog Promo"}
        </span>
      )}
    </div>
  );
}
