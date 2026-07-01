import { useState, useRef } from "react";

interface VoiceoverPlayerProps {
  label: string;
  src: string;
}

export default function VoiceoverPlayer({ label, src }: VoiceoverPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (error) return;
    if (!audioRef.current) {
      audioRef.current = new Audio(src);
      audioRef.current.onended = () => setIsPlaying(false);
      audioRef.current.onerror = () => setError(true);
    }
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setError(true));
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 bg-filmBg2/40 border border-filmGold/20 rounded-sm p-8 hover:border-filmGold/40 hover:bg-filmBg2/60 transition-all duration-500 w-full">
      <p className="font-body italic text-filmIvory/90 text-xl text-center h-14 flex items-center justify-center">
        "{label}"
      </p>
      
      <button 
        onClick={togglePlay}
        disabled={error}
        className={`w-20 h-20 rounded-full border-[1.5px] border-filmGold/70 flex items-center justify-center transition-all duration-500 outline-none ${error ? 'opacity-30 cursor-not-allowed' : 'hover:bg-filmGold/10 hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:scale-105'}`}
        data-testid={`voiceover-${label.replace(/\s+/g, '-').toLowerCase()}`}
      >
        {isPlaying ? (
          <div className="w-5 h-5 border-l-2 border-r-2 border-filmGold flex gap-2" />
        ) : (
          <div className="w-0 h-0 border-t-[10px] border-b-[10px] border-l-[16px] border-transparent border-l-filmGold ml-1.5" />
        )}
      </button>

      {/* Fake waveform */}
      <div className="flex items-end justify-center gap-[3px] h-10 mt-2 opacity-60 w-full px-4 overflow-hidden">
        {Array.from({ length: 24 }).map((_, i) => {
          const height = isPlaying ? 20 + Math.random() * 80 : 15 + (i % 4) * 15;
          return (
            <div 
              key={i} 
              className="w-1.5 bg-filmGold/50 rounded-full transition-all duration-[300ms]"
              style={{ height: `${height}%` }}
            />
          );
        })}
      </div>

      {error && <span className="font-ui text-sm tracking-wide text-filmMuted/40 uppercase mt-2">Voice note coming soon</span>}
    </div>
  );
}