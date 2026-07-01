import { useState, useEffect } from "react";

interface VideoCardProps {
  title: string;
  src: string;
  poster?: string;
}

export default function VideoCard({ title, src, poster }: VideoCardProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = document.createElement('video');
    video.src = src;
    video.onerror = () => setHasError(true);
    video.onloadedmetadata = () => setIsLoaded(true);
  }, [src]);

  return (
    <div className="relative w-full aspect-video rounded-xl border border-primary/30 overflow-hidden shadow-xl bg-background/50" data-testid={`video-card-${title.replace(/\s+/g, '-')}`}>
      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-card/40 backdrop-blur-sm p-6 text-center">
          <div className="w-16 h-16 rounded-full border border-primary/20 flex items-center justify-center mb-4 bg-background/50">
            <span className="text-primary/50 text-2xl">▶</span>
          </div>
          <p className="font-serif text-xl text-foreground/80 mb-2">{title}</p>
          <p className="font-body text-primary/60 italic">Video coming soon</p>
        </div>
      ) : (
        <video
          src={src}
          poster={poster}
          controls
          className="w-full h-full object-cover"
          aria-label={title}
        />
      )}
    </div>
  );
}
