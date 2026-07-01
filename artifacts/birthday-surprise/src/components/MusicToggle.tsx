import { useState, useRef } from "react";
import { Play, Pause } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleMusic = () => {
    if (!audioRef.current) {
      const audio = new Audio("/assets/audio/background-music.mp3");
      audio.loop = true;
      audio.onerror = () => setError(true);
      audioRef.current = audio;
    }

    if (error) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setError(true);
      });
    }
  };

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={toggleMusic}
            className="fixed bottom-6 right-6 w-12 h-12 bg-card border border-primary/40 rounded-full flex items-center justify-center text-primary shadow-lg hover:bg-card/80 transition-all z-50 focus:outline-none focus:ring-2 focus:ring-primary/50"
            aria-label={isPlaying ? "Pause music" : "Play music"}
            data-testid="btn-music-toggle"
          >
            {isPlaying ? <Pause size={20} className="fill-current" /> : <Play size={20} className="fill-current ml-1" />}
          </button>
        </TooltipTrigger>
        <TooltipContent side="left" align="center" className="bg-card text-foreground border-primary/20">
          <p className="font-body text-sm">{error ? "Music coming soon" : isPlaying ? "Pause music" : "Play music"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
