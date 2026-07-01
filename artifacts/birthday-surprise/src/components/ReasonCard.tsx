import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ReasonCardProps {
  num: string;
  title: string;
  message: string;
}

export default function ReasonCard({ num, title, message }: ReasonCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.button
      onClick={() => setIsOpen(!isOpen)}
      className="w-full min-h-[160px] rounded-xl border border-primary/20 bg-card/30 backdrop-blur-sm flex items-center justify-center text-center cursor-pointer overflow-hidden transition-all duration-300 hover:border-primary/50 focus:outline-none p-4 relative group"
      data-testid={`btn-reason-${num}`}
      aria-expanded={isOpen}
      aria-label={`Reason ${num}: ${title}`}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent transition-opacity duration-500 ${isOpen ? "opacity-100" : "opacity-0 group-hover:opacity-50"}`} />
      
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="message"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 w-full"
          >
            <h4 className="font-serif text-primary/90 text-lg mb-2">{title}</h4>
            <p className="font-body text-foreground/80 text-sm leading-relaxed">{message}</p>
          </motion.div>
        ) : (
          <motion.div
            key="title"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative z-10"
          >
            <span className="font-serif text-3xl italic text-primary/40 block mb-2 transition-colors group-hover:text-primary/60">{num}</span>
            <span className="font-body text-foreground/70 text-lg">{title}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
