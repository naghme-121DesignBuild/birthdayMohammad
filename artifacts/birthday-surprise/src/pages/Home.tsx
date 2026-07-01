import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import velvetBg from "@/assets/images/velvet-bg.png";
import petalsBg from "@/assets/images/petals-bg.png";
import photo1 from "@assets/IMG_7533_1782879356200.PNG";
import photo2 from "@assets/IMG_7536_1782879356203.PNG";
import photo3 from "@assets/IMG_7541_1782879356204.PNG";
import photo4 from "@assets/IMG_7543_1782879356204.PNG";
import photo5 from "@assets/IMG_7544_1782879356205.PNG";

const reasons = [
  { num: "I", text: "The way your eyes carry the whole universe in them — calm, deep, endlessly kind." },
  { num: "II", text: "How you turn ordinary moments into something I want to remember forever." },
  { num: "III", text: "The sound of your voice — it has always felt like coming home." },
  { num: "IV", text: "Your strength. You carry so much quietly, and I see every bit of it." },
  { num: "V", text: "The way distance never once made me love you less — only more." },
  { num: "VI", text: "How you make me laugh even when I didn't know I needed to." },
  { num: "VII", text: "Your mind — curious, passionate, brilliant. I could listen to you forever." },
  { num: "VIII", text: "Because there is simply no one else in the world who is you, Mohammad." },
];

const memories = [
  {
    src: photo1,
    title: "Where it began",
    caption: "Different cities. Different countries. One match that changed everything.",
    tag: "Toronto & Los Angeles",
  },
  {
    src: photo2,
    title: "Santa Monica Pier",
    caption: "Route 66 — end of the trail, beginning of us. California Memories.",
    tag: "California",
  },
  {
    src: photo3,
    title: "Malibu Beach",
    caption: "Beach + sun + backgammon + you. The perfect day.",
    tag: "Malibu",
  },
  {
    src: photo4,
    title: "Petersen Automotive Museum",
    caption: "Batmobile, Fast & Furious, and your smile beside mine. A day to remember.",
    tag: "Los Angeles",
  },
  {
    src: photo5,
    title: "Stars & Hollywood",
    caption: "Griffith Observatory, Hollywood Sign, Space Shuttle — exploring the universe together.",
    tag: "California",
  },
];

const PETALS = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${5 + (i * 5.5) % 90}%`,
  size: 8 + (i % 5) * 4,
  dur: `${12 + (i % 7) * 2.5}s`,
  delay: `${(i * 1.3) % 14}s`,
  drift: `${-40 + (i % 9) * 10}px`,
  hue: i % 3 === 0 ? "hsl(43 85% 62% / 0.55)" : i % 3 === 1 ? "hsl(340 60% 60% / 0.45)" : "hsl(38 60% 96% / 0.25)",
}));

function FloatingPetals() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {PETALS.map((p) => (
        <div
          key={p.id}
          className="petal"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            backgroundColor: p.hue,
            ["--dur" as string]: p.dur,
            ["--delay" as string]: p.delay,
            ["--drift" as string]: p.drift,
          }}
        />
      ))}
    </div>
  );
}

function Divider() {
  return (
    <div className="flex items-center justify-center gap-3 my-2">
      <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/50" />
      <span className="text-primary/70 text-lg heartbeat">♡</span>
      <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/50" />
    </div>
  );
}

export default function Home() {
  const [activeReason, setActiveReason] = useState<number | null>(null);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const closeLightbox = useCallback(() => setLightboxIdx(null), []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight" && lightboxIdx !== null) setLightboxIdx((i) => (i! + 1) % memories.length);
      if (e.key === "ArrowLeft" && lightboxIdx !== null) setLightboxIdx((i) => ((i! - 1) + memories.length) % memories.length);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIdx, closeLightbox]);

  if (!mounted) return null;

  return (
    <div className="min-h-[100dvh] w-full bg-background text-foreground overflow-x-hidden font-sans">

      {/* ── HERO ── */}
      <section className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden px-4 py-20">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${velvetBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,hsl(340_55%_20%/0.5),transparent)]" />

        <FloatingPetals />

        <div className="relative z-20 text-center flex flex-col items-center gap-6 max-w-2xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.6, delay: 0.4, ease: "easeOut" }}
            className="font-script text-3xl sm:text-4xl md:text-5xl text-primary"
          >
            Happy Birthday, my love
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, scale: 0.88, filter: "blur(14px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 2.2, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif font-light text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-primary tracking-tight glow-name"
          >
            Mohammad
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 2.8 }}
            className="flex flex-col items-center gap-4"
          >
            <Divider />
            <p className="font-serif italic text-foreground/60 text-base sm:text-lg md:text-xl tracking-wide">
              From Canada to California — and every mile in between
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 4 }}
            className="mt-6"
          >
            <div className="w-px h-20 bg-gradient-to-b from-primary/60 to-transparent mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* ── LOVE LETTER ── */}
      <section className="relative w-full py-20 px-5 sm:px-8 md:px-16 lg:px-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,hsl(340_50%_12%/0.8),transparent)]" />
        <motion.div
          className="relative z-10 max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        >
          <h2 className="font-serif italic text-3xl sm:text-4xl md:text-5xl text-primary mb-3">
            To my everything,
          </h2>
          <Divider />
          <div className="mt-8 space-y-6 font-serif font-light text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-foreground/85">
            <p>
              I have been sitting here, trying to find the right words for you — and I keep
              realizing that there are none big enough. You are the kind of person who makes
              the whole world feel quieter and warmer just by existing in it.
            </p>
            <p>
              Across every mile between Toronto and Los Angeles, you have never once felt far.
              Because the truth is, you live somewhere that distance cannot reach.
              You live right here.
            </p>
            <p>
              On your birthday, I want you to know: being loved by you is the greatest gift
              of my life. And loving you back — that is my favorite thing I have ever done.
            </p>
            <p className="font-script text-2xl sm:text-3xl text-primary pt-2">
              Happy Birthday, Mohammad.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ── OUR STORY — PHOTO GALLERY ── */}
      <section className="relative w-full py-20 px-4 sm:px-6 md:px-12">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${petalsBg})` }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center mb-12"
        >
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-primary mb-2">Our Story</h2>
          <p className="font-script text-2xl sm:text-3xl text-foreground/55">the moments I keep closest</p>
          <Divider />
        </motion.div>

        {/* Mobile: vertical stack | md+: 2-col then 3-col grid */}
        <div className="relative z-10 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {memories.map((m, idx) => (
            <motion.button
              key={idx}
              onClick={() => setLightboxIdx(idx)}
              className="group w-full text-left focus:outline-none"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: "easeOut" }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              data-testid={`btn-memory-${idx}`}
              aria-label={`View photo: ${m.title}`}
            >
              <div className="bg-[#f5ede0] p-2 pb-8 shadow-2xl rounded-sm transition-shadow duration-300 group-hover:shadow-[0_20px_60px_hsl(43_85%_62%/0.25)]">
                <div className="overflow-hidden rounded-[2px] aspect-[4/3] bg-foreground/10">
                  <motion.img
                    src={m.src}
                    alt={m.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    loading="lazy"
                  />
                </div>
                <div className="px-2 pt-3">
                  <p className="font-script text-xl text-[#3a2010] leading-tight">{m.title}</p>
                  <p className="font-sans text-[11px] text-[#7a6045] mt-1 leading-snug">{m.caption}</p>
                  <p className="font-sans text-[10px] text-[#a08060] mt-2 tracking-widest uppercase">{m.tag}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative z-10 text-center font-script text-xl sm:text-2xl text-foreground/40 mt-12"
        >
          Every mile between us was worth every single moment together.
        </motion.p>
      </section>

      {/* ── REASONS I LOVE YOU ── */}
      <section className="relative w-full py-20 px-4 sm:px-6 md:px-12 bg-card/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,hsl(340_50%_14%/0.7),transparent)]" />

        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-primary mb-2">
              Eight reasons
            </h2>
            <p className="font-script text-2xl sm:text-3xl text-foreground/55">
              why I love you
            </p>
            <Divider />
            <p className="font-sans text-xs text-foreground/35 tracking-widest uppercase mt-4">
              Tap each one to reveal
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {reasons.map((r, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className="relative"
              >
                <button
                  onClick={() => setActiveReason(activeReason === idx ? null : idx)}
                  className="w-full h-40 sm:h-48 rounded-xl border border-primary/20 bg-background/40 backdrop-blur-sm flex items-center justify-center text-center cursor-pointer overflow-hidden transition-colors duration-300 hover:border-primary/50 active:border-primary/70 focus:outline-none group"
                  data-testid={`btn-reason-${idx}`}
                  aria-pressed={activeReason === idx}
                  aria-label={`Reason ${r.num}`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br from-primary/8 to-primary/3 transition-opacity duration-400 ${activeReason === idx ? "opacity-100" : "opacity-0 group-hover:opacity-60"}`} />
                  <AnimatePresence mode="wait">
                    {activeReason === idx ? (
                      <motion.p
                        key="text"
                        initial={{ opacity: 0, scale: 0.88 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.88 }}
                        transition={{ duration: 0.28 }}
                        className="relative z-10 px-3 font-serif text-sm sm:text-base text-foreground/90 font-light leading-snug"
                      >
                        {r.text}
                      </motion.p>
                    ) : (
                      <motion.span
                        key="num"
                        initial={{ opacity: 0, scale: 0.88 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.88 }}
                        transition={{ duration: 0.28 }}
                        className="relative z-10 font-serif text-4xl sm:text-5xl italic text-primary/40 group-hover:text-primary/70 transition-colors duration-300"
                      >
                        {r.num}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BIRTHDAY WISH ── */}
      <section className="relative w-full py-20 px-4 sm:px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_50%,hsl(43_85%_62%/0.06),transparent)]" />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="relative z-10 max-w-xl mx-auto text-center border border-primary/20 rounded-2xl p-8 sm:p-12 bg-card/25 backdrop-blur-md"
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />
          <p className="font-script text-3xl sm:text-4xl text-primary mb-5 block relative z-10">
            A beautiful year ahead
          </p>
          <h3 className="font-serif font-light text-2xl sm:text-3xl md:text-4xl text-foreground relative z-10 leading-snug mb-6">
            Counting down the days until I get to hold you again and celebrate you properly.
          </h3>
          <div className="relative z-10 inline-block px-5 py-2 border border-primary/30 rounded-full">
            <span className="font-sans text-xs tracking-widest text-primary/70 uppercase">
              Your birthday is next week
            </span>
          </div>
        </motion.div>
      </section>

      {/* ── CLOSING ── */}
      <section className="relative w-full min-h-[55vh] flex flex-col items-center justify-center overflow-hidden px-4 py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,hsl(340_50%_15%/0.6),transparent)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background to-transparent" />

        <FloatingPetals />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8 }}
          className="relative z-20 text-center"
        >
          <h2 className="font-serif font-light text-5xl sm:text-6xl md:text-7xl text-primary mb-5 glow-name">
            Happy Birthday
          </h2>
          <p className="font-script text-3xl sm:text-4xl text-foreground/70 mb-8">
            Forever yours
          </p>
          <span className="text-4xl heartbeat inline-block text-primary/80 select-none">♡</span>
        </motion.div>
      </section>

      {/* ── LIGHTBOX ── */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex flex-col items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            data-testid="lightbox-overlay"
          >
            <motion.div
              className="relative w-full max-w-3xl mx-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.35 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={memories[lightboxIdx].src}
                alt={memories[lightboxIdx].title}
                className="w-full rounded-lg shadow-2xl object-contain max-h-[75vh]"
              />
              <div className="mt-4 text-center">
                <p className="font-script text-2xl text-primary">{memories[lightboxIdx].title}</p>
                <p className="font-serif text-sm text-foreground/60 mt-1">{memories[lightboxIdx].caption}</p>
              </div>

              {/* Prev / Next */}
              <button
                onClick={() => setLightboxIdx(((lightboxIdx - 1) + memories.length) % memories.length)}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-10 sm:-translate-x-14 text-primary/60 hover:text-primary text-3xl transition-colors focus:outline-none"
                data-testid="lightbox-prev"
                aria-label="Previous photo"
              >
                ‹
              </button>
              <button
                onClick={() => setLightboxIdx((lightboxIdx + 1) % memories.length)}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-10 sm:translate-x-14 text-primary/60 hover:text-primary text-3xl transition-colors focus:outline-none"
                data-testid="lightbox-next"
                aria-label="Next photo"
              >
                ›
              </button>
            </motion.div>

            {/* Dot indicators */}
            <div className="flex gap-2 mt-6">
              {memories.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setLightboxIdx(i); }}
                  className={`w-2 h-2 rounded-full transition-colors focus:outline-none ${i === lightboxIdx ? "bg-primary" : "bg-primary/25"}`}
                  data-testid={`lightbox-dot-${i}`}
                  aria-label={`Go to photo ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-foreground/50 hover:text-foreground text-2xl focus:outline-none"
              data-testid="lightbox-close"
              aria-label="Close"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
