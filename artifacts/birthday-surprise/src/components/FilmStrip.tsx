import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MemoryCard from "./MemoryCard";

interface Memory {
  photo: string | null;
  video?: string | null;
  title: string;
  caption: string;
}

interface FilmStripProps {
  memories: Memory[];
}

export default function FilmStrip({ memories }: FilmStripProps) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightboxIdx(null), []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight" && lightboxIdx !== null) setLightboxIdx((i) => (i! + 1) % memories.length);
      if (e.key === "ArrowLeft" && lightboxIdx !== null) setLightboxIdx((i) => ((i! - 1) + memories.length) % memories.length);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIdx, closeLightbox, memories.length]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-12">
        {memories.map((m, i) => (
          <MemoryCard 
            key={i}
            num={String(i + 1).padStart(2, '0')}
            photo={m.photo}
            video={m.video || null}
            title={m.title}
            caption={m.caption}
            onClick={() => setLightboxIdx(i)}
          />
        ))}
      </div>

      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            className="fixed inset-0 z-[100] bg-filmBlack/98 flex flex-col items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-filmIvory/50 hover:text-filmGold text-4xl focus:outline-none z-50 transition-colors"
              aria-label="Close lightbox"
            >
              ✕
            </button>
            
            <div className="relative w-full max-w-6xl mx-auto flex items-center justify-center h-full" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setLightboxIdx(((lightboxIdx - 1) + memories.length) % memories.length)}
                className="absolute left-0 p-4 text-filmGold/30 hover:text-filmGold text-6xl md:text-7xl transition-colors focus:outline-none z-10 hidden sm:block"
                aria-label="Previous memory"
              >
                ‹
              </button>
              
              <motion.div
                key={lightboxIdx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative max-h-[85vh] flex flex-col items-center"
              >
                {memories[lightboxIdx].video ? (
                   <video 
                     src={memories[lightboxIdx].video} 
                     controls 
                     autoPlay
                     className="max-w-full max-h-[65vh] border border-filmGold/20 shadow-[0_0_40px_rgba(212,175,55,0.1)] rounded-sm"
                   />
                ) : (
                  <img
                    src={memories[lightboxIdx].photo || ""}
                    alt={memories[lightboxIdx].title}
                    className="max-w-full max-h-[65vh] object-contain border border-filmGold/20 shadow-[0_0_40px_rgba(212,175,55,0.1)] rounded-sm"
                  />
                )}
                
                <div className="mt-8 text-center max-w-2xl px-4">
                  <p className="font-display text-3xl md:text-4xl text-filmIvory mb-3">{memories[lightboxIdx].title}</p>
                  <p className="font-body italic text-xl md:text-2xl text-filmSoftGold/70">{memories[lightboxIdx].caption}</p>
                </div>
              </motion.div>

              <button
                onClick={() => setLightboxIdx((lightboxIdx + 1) % memories.length)}
                className="absolute right-0 p-4 text-filmGold/30 hover:text-filmGold text-6xl md:text-7xl transition-colors focus:outline-none z-10 hidden sm:block"
                aria-label="Next memory"
              >
                ›
              </button>
            </div>
            
            <div className="absolute bottom-8 flex gap-4 sm:hidden" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setLightboxIdx(((lightboxIdx - 1) + memories.length) % memories.length)}
                className="px-6 py-2 border border-filmGold/30 rounded-full text-filmGold font-ui tracking-wider text-sm hover:bg-filmGold/10"
              >
                PREV
              </button>
              <button
                onClick={() => setLightboxIdx((lightboxIdx + 1) % memories.length)}
                className="px-6 py-2 border border-filmGold/30 rounded-full text-filmGold font-ui tracking-wider text-sm hover:bg-filmGold/10"
              >
                NEXT
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}