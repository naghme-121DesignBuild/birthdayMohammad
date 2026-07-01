import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import VideoCard from "./VideoCard";

export default function SecretReveal() {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <div className="w-full flex flex-col items-center" data-testid="secret-reveal-container">
      <AnimatePresence mode="wait">
        {!isRevealed ? (
          <motion.button
            key="button"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            onClick={() => setIsRevealed(true)}
            className="text-foreground/40 hover:text-primary transition-colors font-body italic text-lg px-6 py-3"
            data-testid="btn-reveal-secret"
          >
            One more thing…
          </motion.button>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-3xl overflow-hidden"
          >
            <div className="py-8 text-center border-t border-primary/20">
              <h3 className="font-serif text-3xl md:text-4xl text-primary mb-4">The part I almost kept to myself</h3>
              <p className="font-body text-lg text-foreground/80 mb-8 max-w-xl mx-auto">
                There are things I say badly in real time, so I built them here — slowly, carefully, for you.
              </p>
              <VideoCard 
                title="Play my secret message" 
                src="/assets/videos/secret-message.mp4" 
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
