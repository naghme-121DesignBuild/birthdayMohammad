import { useState, useRef, useEffect } from "react";

interface VideoFrameProps {
  src?: string;
  poster?: string;
  caption?: string;
  title?: string;
}

export default function VideoFrame({ src, poster, caption, title }: VideoFrameProps) {
  const [error, setError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!src) setError(true);
  }, [src]);

  return (
    <div className="flex flex-col items-center w-full my-8 group">
      <div className="relative w-full rounded-sm border-[1px] border-filmGold/30 bg-filmBlack overflow-hidden shadow-[0_0_15px_rgba(212,175,55,0.05)] group-hover:shadow-[0_0_25px_rgba(212,175,55,0.15)] group-hover:border-filmGold/50 transition-all duration-500">
        
        {/* Film sprocket top */}
        <div className="absolute top-0 left-0 right-0 h-4 bg-filmBg border-b border-filmGold/10 flex justify-between px-3 items-center z-10 opacity-70">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="w-1.5 h-2 rounded-[1px] bg-filmBlack border border-filmGold/20" />
          ))}
        </div>

        <div className="pt-4 pb-4">
          {error || !src ? (
            <div className="aspect-video w-full flex flex-col items-center justify-center bg-filmBg2/30 text-center px-4">
              <h3 className="font-display text-2xl md:text-3xl text-filmGold/60 mb-2">{title || "Scene coming soon"}</h3>
              <p className="font-body italic text-filmIvory/40">Memories are still rendering...</p>
            </div>
          ) : (
            <video
              ref={videoRef}
              src={src}
              poster={poster}
              controls
              playsInline
              className={`w-full aspect-video object-cover transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoadedData={() => setIsLoaded(true)}
              onError={() => setError(true)}
              data-testid={`video-${title?.replace(/\s+/g, '-').toLowerCase()}`}
            />
          )}
        </div>

        {/* Film sprocket bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-filmBg border-t border-filmGold/10 flex justify-between px-3 items-center z-10 opacity-70">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="w-1.5 h-2 rounded-[1px] bg-filmBlack border border-filmGold/20" />
          ))}
        </div>
      </div>
      
      {caption && (
        <p className="mt-4 font-body italic text-filmIvory/70 text-center text-lg md:text-xl">{caption}</p>
      )}
    </div>
  );
}