import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Frame {
  num: string;
  title: string;
  message: string;
}

interface EightFramesProps {
  frames: Frame[];
}

export default function EightFrames({ frames }: EightFramesProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full mt-12">
      {frames.map((frame, i) => (
        <FrameCard key={i} frame={frame} />
      ))}
    </div>
  );
}

function FrameCard({ frame }: { frame: Frame }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="relative aspect-[3/4] flex flex-col justify-center items-center w-full bg-filmBg2 border border-filmGold/20 rounded-sm hover:border-filmGold/40 hover:shadow-[0_0_25px_rgba(212,175,55,0.15)] transition-all duration-500 overflow-hidden group focus:outline-none"
      data-testid={`frame-${frame.num}`}
    >
      {/* Film sprocket top */}
      <div className="absolute top-0 left-0 right-0 h-4 border-b border-filmGold/10 flex justify-around px-2 items-center bg-filmBg/50">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-[1px] bg-filmBlack" />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="front"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center w-full h-full p-4"
          >
            <span className="font-display text-5xl sm:text-6xl lg:text-7xl text-filmGold/60 mb-6 tracking-tighter group-hover:text-filmGold transition-colors duration-500 drop-shadow-md">{frame.num}</span>
            <span className="font-display italic text-lg sm:text-xl text-filmIvory/60 text-center">{frame.title}</span>
          </motion.div>
        ) : (
          <motion.div
            key="back"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center w-full h-full p-6 bg-filmWine text-center"
          >
            <p className="font-body text-lg sm:text-xl text-filmIvory leading-relaxed text-balance">
              "{frame.message}"
            </p>
          </motion.div>
        )}
      </AnimatePresence>

       {/* Film sprocket bottom */}
       <div className="absolute bottom-0 left-0 right-0 h-4 border-t border-filmGold/10 flex justify-around px-2 items-center bg-filmBg/50">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-[1px] bg-filmBlack" />
        ))}
      </div>
    </button>
  );
}