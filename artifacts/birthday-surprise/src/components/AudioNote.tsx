import { useState, useRef, useEffect } from "react";
import { Play, Pause } from "lucide-react";

interface AudioNoteProps {
  label: string;
  src: string;
}

export default function AudioNote({ label, src }: AudioNoteProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(src);
    audio.onerror = () => setHasError(true);
    audio.addEventListener('timeupdate', () => {
      setProgress((audio.currentTime / (audio.duration || 1)) * 100);
    });
    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      setProgress(0);
    });
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, [src]);

  const togglePlay = () => {
    if (hasError || !audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => setHasError(true));
    }
    setIsPlaying(!isPlaying);
  };

  if (hasError) {
    return (
      <div className="flex items-center gap-4 p-4 rounded-xl border border-primary/10 bg-card/20 opacity-60" data-testid={`audio-note-${label}-error`}>
        <button disabled className="w-12 h-12 rounded-full bg-background border border-primary/20 flex items-center justify-center text-primary/30">
          <Play size={18} className="ml-1" />
        </button>
        <div className="flex-1">
          <p className="font-serif text-foreground/60">{label}</p>
          <p className="font-body text-xs text-primary/40 italic mt-1">Voice note coming soon</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 p-4 rounded-xl border border-primary/30 bg-card/40 hover:bg-card/60 transition-colors" data-testid={`audio-note-${label}`}>
      <button 
        onClick={togglePlay}
        className="w-12 h-12 rounded-full bg-primary/10 border border-primary/50 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
        aria-label={isPlaying ? `Pause ${label}` : `Play ${label}`}
      >
        {isPlaying ? <Pause size={18} className="fill-current" /> : <Play size={18} className="fill-current ml-1" />}
      </button>
      <div className="flex-1">
        <p className="font-serif text-foreground/90 mb-2">{label}</p>
        <div className="w-full h-1 bg-background rounded-full overflow-hidden">
          <div className="h-full bg-primary transition-all duration-100" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}
