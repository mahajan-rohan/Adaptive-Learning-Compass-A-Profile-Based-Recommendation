"use client";

import { useState } from "react";
import { Skeleton } from "./skeleton";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
}

export function Image({ src, alt, fallback = "/placeholder.jpg", ...props }: ImageProps) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Skeleton className={props.className} />}
      <img
        src={error ? fallback : src}
        alt={alt}
        onError={() => setError(true)}
        onLoad={() => setLoading(false)}
        style={{ display: loading ? 'none' : 'block' }}
        {...props}
      />
    </>
  );
} 