import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

interface SectionProps extends HTMLMotionProps<"section"> {
  children: ReactNode;
  className?: string;
}

export default function Section({ children, className = "", ...props }: SectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={className}
      {...props}
    >
      {children}
    </motion.section>
  );
}
