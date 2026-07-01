import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface SceneSectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
}

export default function SceneSection({ id, className = "", children }: SceneSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <section id={id} className={`py-20 md:py-32 w-full overflow-hidden ${className}`}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      id={id}
      className={`py-20 md:py-32 w-full overflow-hidden flex flex-col items-center justify-center min-h-[50vh] ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.9, ease: "easeOut" }}
    >
      <div className="w-full max-w-4xl mx-auto px-4 md:px-8">
        {children}
      </div>
    </motion.section>
  );
}