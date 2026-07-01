import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import velvetBg from "@/assets/images/velvet-bg.png";
import petalsBg from "@/assets/images/petals-bg.png";
import photo1 from "@assets/IMG_7533_1782879356200.PNG";
import photo2 from "@assets/IMG_7536_1782879356203.PNG";
import photo3 from "@assets/IMG_7541_1782879356204.PNG";
import photo4 from "@assets/IMG_7543_1782879356204.PNG";
import photo5 from "@assets/IMG_7544_1782879356205.PNG";

const reasons = [
  "The way your eyes light up when you talk about what you love.",
  "Your quiet strength that makes me feel safe every single day.",
  "How you always know exactly what to say to make me smile.",
  "The beautiful, gentle way you treat everyone around you.",
  "Your laugh — it is my absolute favorite sound in the world.",
  "The fact that even in silence, I feel completely understood by you.",
  "Your ambition and the passionate way you chase your dreams.",
  "Simply because you are you. There is no one else like you, Mohammad."
];

const memories = [
  {
    src: photo1,
    label: "Where it all began",
    caption: "Different places. One match. A new story.",
    rotate: "-2deg",
  },
  {
    src: photo2,
    label: "Santa Monica Pier",
    caption: "California Memories — Route 66 to the end of the trail.",
    rotate: "1.5deg",
  },
  {
    src: photo3,
    label: "Malibu Beach",
    caption: "Love was in the air that day. Perfect day.",
    rotate: "-1deg",
  },
  {
    src: photo4,
    label: "Petersen Automotive Museum",
    caption: "A day to remember — legends never die.",
    rotate: "2deg",
  },
  {
    src: photo5,
    label: "Griffith Observatory & Hollywood",
    caption: "Exploring the universe together — to the moon and back.",
    rotate: "-1.5deg",
  },
];

function MemoryCard({ memory, index }: { memory: typeof memories[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative flex-shrink-0 w-72 md:w-80 cursor-pointer"
      initial={{ opacity: 0, y: 40, rotate: memory.rotate }}
      whileInView={{ opacity: 1, y: 0, rotate: memory.rotate }}
      whileHover={{ scale: 1.04, rotate: "0deg", zIndex: 10 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: "easeOut" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      data-testid={`card-memory-${index}`}
      style={{ rotate: memory.rotate }}
    >
      <div className="bg-[#f9f3e8] p-3 pb-10 shadow-2xl rounded-sm border border-[#e8dcc8]/60">
        <div className="overflow-hidden rounded-sm aspect-[4/3] bg-foreground/5">
          <motion.img
            src={memory.src}
            alt={memory.label}
            className="w-full h-full object-cover"
            animate={{ scale: hovered ? 1.06 : 1 }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className="mt-4 px-1">
          <p className="font-script text-lg text-[#3d2b1a] leading-snug">{memory.label}</p>
          <p className="font-sans text-xs text-[#7a6250] mt-1 leading-relaxed">{memory.caption}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [activeReasonIndex, setActiveReasonIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: galleryRef, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-[100dvh] w-full bg-background text-foreground overflow-x-hidden font-sans selection:bg-primary selection:text-background">

      {/* SECTION 1: Enchanting Hero Reveal */}
      <section className="relative w-full h-[100dvh] flex flex-col items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-overlay"
          style={{ backgroundImage: `url(${velvetBg})` }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />

        <div className="z-10 text-center px-4 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
            className="mb-6"
          >
            <span className="font-script text-3xl md:text-5xl text-primary/80">Happy Birthday, my love</span>
          </motion.div>

          <motion.h1
            className="font-serif text-6xl md:text-8xl lg:text-9xl text-primary tracking-tight"
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 2, ease: "easeOut", delay: 1 }}
          >
            Mohammad
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 3 }}
            className="mt-12"
          >
            <div className="w-[1px] h-24 bg-gradient-to-b from-primary/50 to-transparent mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: Heartfelt Message */}
      <section className="relative w-full min-h-[70vh] flex items-center justify-center py-24 px-6 sm:px-12 md:px-24">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <h2 className="font-serif text-3xl md:text-5xl text-primary mb-10 italic">To my everything,</h2>
          <div className="space-y-6 text-lg md:text-xl lg:text-2xl font-light leading-relaxed text-foreground/90 font-serif">
            <p>
              I wanted to give you something that feels like you — something thoughtful, quiet, and deeply beautiful.
              As your birthday approaches, I find myself thinking about all the moments that have led us here.
            </p>
            <p>
              You have this incredible way of making the world feel softer, warmer, and endlessly better just by being in it.
              Across every mile between Toronto and Los Angeles, you have never felt far — because you live in my heart.
            </p>
            <p>
              May this year bring you as much joy, peace, and love as you give to everyone around you.
              I love you more than words could ever truly capture.
            </p>
          </div>
          <div className="mt-12 flex justify-center">
            <div className="w-16 h-[1px] bg-primary/40" />
          </div>
        </motion.div>
      </section>

      {/* SECTION 3: Our Story — Photo Gallery */}
      <section className="relative w-full py-24 overflow-hidden" ref={galleryRef}>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-16 px-6 relative z-10"
        >
          <h2 className="font-serif text-4xl md:text-6xl text-primary mb-3">Our Story</h2>
          <p className="font-script text-2xl md:text-3xl text-foreground/60">Different places. One love.</p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-[1px] w-20 bg-primary/30" />
            <span className="font-sans text-xs tracking-widest text-foreground/40 uppercase">Canada &amp; United States</span>
            <div className="h-[1px] w-20 bg-primary/30" />
          </div>
        </motion.div>

        <motion.div
          className="flex gap-8 px-12 pb-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          style={{ x }}
        >
          {memories.map((memory, idx) => (
            <div key={idx} className="snap-center">
              <MemoryCard memory={memory} index={idx} />
            </div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center font-script text-xl text-foreground/40 mt-10 px-6"
        >
          Every mile between us was worth every single moment together.
        </motion.p>
      </section>

      {/* SECTION 4: Reasons I Love You */}
      <section className="relative w-full py-32 px-6 sm:px-12 md:px-24 bg-card/30">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-20 mix-blend-overlay"
          style={{ backgroundImage: `url(${petalsBg})` }}
        />
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl md:text-6xl text-primary mb-4">Eight reasons</h2>
            <p className="font-script text-2xl md:text-3xl text-foreground/70">why I love you</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reasons.map((reason, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                onHoverStart={() => setActiveReasonIndex(idx)}
                onHoverEnd={() => setActiveReasonIndex(null)}
                className="group relative h-48 rounded-xl border border-primary/20 bg-background/50 backdrop-blur-sm p-6 flex items-center justify-center text-center cursor-pointer overflow-hidden transition-all duration-500 hover:border-primary/60 hover:bg-card/80 shadow-lg"
                data-testid={`card-reason-${idx}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <AnimatePresence mode="wait">
                  {activeReasonIndex === idx ? (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="relative z-10"
                    >
                      <p className="font-sans text-sm md:text-base text-foreground/90 font-light leading-relaxed">
                        {reason}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="number"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="relative z-10"
                    >
                      <span className="font-serif text-4xl text-primary/30 group-hover:text-primary transition-colors duration-500 italic">
                        {idx + 1}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: Countdown/Wish Moment */}
      <section className="relative w-full min-h-[60vh] flex items-center justify-center py-24 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="max-w-2xl mx-auto p-12 border border-primary/20 rounded-2xl bg-card/20 backdrop-blur-md relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
          <div className="relative z-10">
            <span className="font-script text-3xl text-primary mb-4 block">A beautiful year ahead</span>
            <h3 className="font-serif text-3xl md:text-5xl text-foreground mb-8">
              Counting the days until we celebrate you.
            </h3>
            <p className="font-light text-foreground/80 font-sans tracking-wide uppercase text-sm">
              Next week is your birthday
            </p>
          </div>
        </motion.div>
      </section>

      {/* SECTION 6: Closing */}
      <section className="relative w-full h-[50vh] flex items-center justify-center overflow-hidden bg-background">
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <div className="w-[800px] h-[800px] bg-primary rounded-full blur-[120px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="z-10 text-center"
        >
          <h2 className="font-serif text-5xl md:text-7xl text-primary mb-6">Happy Birthday</h2>
          <p className="font-script text-3xl text-foreground/80">Forever yours</p>
        </motion.div>
      </section>
    </div>
  );
}
