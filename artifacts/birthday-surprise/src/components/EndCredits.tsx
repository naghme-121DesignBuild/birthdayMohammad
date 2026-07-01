import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface EndCreditsProps {
  credits: string[];
}

export default function EndCredits({ credits }: EndCreditsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <div ref={containerRef} className="relative w-full h-[100dvh] overflow-hidden bg-filmBlack flex justify-center py-20">
      {/* Decorative top/bottom gradients to fade out text */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-filmBlack to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-filmBlack to-transparent z-10 pointer-events-none" />

      {isInView && (
        <motion.div
          className="absolute flex flex-col items-center w-full max-w-2xl px-4 text-center pb-[100dvh]"
          initial={{ y: "100vh" }}
          animate={{ y: "-100%" }}
          transition={{ duration: 35, ease: "linear" }}
        >
          {credits.map((line, i) => {
            if (!line) return <div key={i} className="h-16 w-full" />;
            const isTitle = i === 0;
            return (
              <p 
                key={i} 
                className={`${isTitle ? 'font-display text-3xl sm:text-5xl text-filmGold mb-12' : 'font-body text-xl sm:text-2xl text-filmIvory/70 mb-6'} tracking-wide`}
              >
                {line}
              </p>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}