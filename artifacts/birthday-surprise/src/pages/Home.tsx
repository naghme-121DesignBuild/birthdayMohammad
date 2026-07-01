import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import velvetBg from "@/assets/images/velvet-bg.png";
import petalsBg from "@/assets/images/petals-bg.png";

// Photos
import photo1 from "@assets/IMG_7533_1782879356200.PNG";
import photo2 from "@assets/IMG_7536_1782879356203.PNG";
import photo3 from "@assets/IMG_7541_1782879356204.PNG";
import photo4 from "@assets/IMG_7543_1782879356204.PNG";
import photo5 from "@assets/IMG_7544_1782879356205.PNG";

// Components
import ScrollProgress from "@/components/ScrollProgress";
import MusicToggle from "@/components/MusicToggle";
import Section from "@/components/Section";
import VideoCard from "@/components/VideoCard";
import ReasonCard from "@/components/ReasonCard";
import AudioNote from "@/components/AudioNote";
import TimelineCard from "@/components/TimelineCard";
import Countdown from "@/components/Countdown";
import SecretReveal from "@/components/SecretReveal";

// Data
import { reasons, timeline, voiceNotes, BIRTHDAY_DATE, PARTNER_NAME, SENDER_NAME } from "@/data/loveContent";

const memories = [
  { src: photo1, title: "Where it began", caption: "Toronto & LA" },
  { src: photo2, title: "Santa Monica Pier", caption: "California Memories" },
  { src: photo3, title: "Malibu Beach", caption: "The perfect day" },
  { src: photo4, title: "Petersen Automotive Museum", caption: "A day to remember" },
  { src: photo5, title: "Griffith Observatory & Hollywood", caption: "Stars & Hollywood" },
];

const PETALS = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${5 + (i * 5.5) % 90}%`,
  size: 8 + (i % 5) * 4,
  dur: `${12 + (i % 7) * 2.5}s`,
  delay: `${(i * 1.3) % 14}s`,
  drift: `${-40 + (i % 9) * 10}px`,
  hue: i % 3 === 0 ? "hsl(45 68% 47% / 0.55)" : i % 3 === 1 ? "hsl(340 60% 60% / 0.45)" : "hsl(38 60% 96% / 0.25)",
}));

const ORBS = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  left: `${10 + (i * 7) % 80}%`,
  dur: `${15 + (i % 5) * 4}s`,
  delay: `${(i * 2) % 10}s`,
  drift: `${-20 + (i % 5) * 10}px`,
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

function GoldOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {ORBS.map((o) => (
        <div
          key={o.id}
          className="gold-orb w-4 h-4 sm:w-6 sm:h-6"
          style={{
            left: o.left,
            ["--dur" as string]: o.dur,
            ["--delay" as string]: o.delay,
            ["--drift" as string]: o.drift,
          }}
        />
      ))}
    </div>
  );
}

function Divider() {
  return (
    <div className="flex items-center justify-center gap-4 my-6">
      <div className="h-px w-24 bg-gradient-to-r from-transparent to-primary/50" />
      <span className="text-primary/70 text-sm">✦</span>
      <div className="h-px w-24 bg-gradient-to-l from-transparent to-primary/50" />
    </div>
  );
}

export default function Home() {
  const [isOpened, setIsOpened] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [heroVideoError, setHeroVideoError] = useState(false);

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

  const handleOpen = () => {
    setIsOpening(true);
    setTimeout(() => {
      setIsOpened(true);
      window.scrollTo(0, 0);
    }, 1500); // Wait for seal animation
  };

  const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

  return (
    <div className="min-h-[100dvh] w-full bg-background text-foreground overflow-x-hidden font-body relative">
      <ScrollProgress />
      {isOpened && <MusicToggle />}

      {/* ── SECTION 1: OPENING / LOCKED LETTER ── */}
      <AnimatePresence>
        {!isOpened && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background px-4"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(45_68%_47%/0.15)_0%,transparent_70%)]" />
            
            {!isOpening ? (
              <motion.div 
                className="relative z-10 flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-foreground mb-4 leading-tight">
                  Open when you're alone.
                </h1>
                <p className="font-body italic text-lg sm:text-xl text-foreground/80 mb-12 max-w-md">
                  "I made you a place, not just a birthday message."
                </p>
                <button
                  onClick={handleOpen}
                  className="px-8 py-3 rounded-full border border-primary text-primary hover:bg-primary hover:text-background transition-all duration-300 font-serif text-lg tracking-wide focus:outline-none focus:ring-2 focus:ring-primary/50"
                  data-testid="btn-open-letter"
                >
                  Open the letter ✦
                </button>
              </motion.div>
            ) : (
              <motion.div 
                className="relative z-10 w-full max-w-md h-px bg-primary"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, ease: "circOut" }}
              >
                <motion.div 
                  className="absolute inset-0 bg-primary shadow-[0_0_20px_hsl(var(--primary))]" 
                  animate={{ y: [-1, -50], opacity: [1, 0] }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                />
                <motion.div 
                  className="absolute inset-0 bg-primary shadow-[0_0_20px_hsl(var(--primary))]" 
                  animate={{ y: [1, 50], opacity: [1, 0] }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                />
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {isOpened && (
        <main>
          {/* ── SECTION 2: HERO ── */}
          <section className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden px-4">
            {!heroVideoError ? (
              <video
                src="/assets/videos/hero-bg.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-30"
                onError={() => setHeroVideoError(true)}
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-b from-[#4a0d1c] to-[#2b0310] opacity-80" />
            )}
            
            <div className="absolute inset-0 bg-background/40" />
            <GoldOrbs />

            <div className="relative z-20 text-center flex flex-col items-center gap-6 max-w-3xl mx-auto pt-20">
              <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.2 }}
                className="font-script text-4xl sm:text-5xl md:text-6xl text-primary"
              >
                Happy Birthday, my love
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, delay: 0.8 }}
                className="font-serif font-bold text-[72px] sm:text-[90px] md:text-[120px] text-foreground tracking-tight glow-name leading-none"
              >
                {PARTNER_NAME}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 1.5 }}
                className="font-body italic text-foreground/70 text-xl sm:text-2xl tracking-wide max-w-lg mt-4"
              >
                Before the candles, before the noise — this is for you.
              </motion.p>

              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 80 }}
                transition={{ duration: 1.5, delay: 2.2, ease: "easeInOut" }}
                className="w-px bg-gradient-to-b from-primary to-transparent mt-8"
              />
            </div>
            
            <motion.div 
              className="absolute bottom-8 text-primary/50 animate-bounce"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3 }}
            >
              ↓
            </motion.div>
          </section>

          {/* ── SECTION 3: VIDEO MESSAGE ── */}
          <Section className="py-24 px-4 sm:px-8 bg-black/20">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-serif text-4xl md:text-5xl text-primary mb-4">A little piece of my heart</h2>
              <p className="font-body italic text-xl text-foreground/80 mb-12 max-w-2xl mx-auto">
                I tried to write this like a normal message, but it kept becoming too small for what I feel.
              </p>
              <div className="p-2 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl">
                <VideoCard 
                  title="A message for you" 
                  src="/assets/videos/message-1.mp4" 
                  poster="/assets/images/video-poster-1.jpg" 
                />
              </div>
            </div>
          </Section>

          {/* ── SECTION 4: LOVE LETTER ── */}
          <Section className="py-32 px-4 sm:px-8">
            <div className="max-w-2xl mx-auto text-center relative">
              <div className="absolute -inset-10 bg-[radial-gradient(circle,hsl(45_68%_47%/0.05)_0%,transparent_70%)] pointer-events-none" />
              
              <h2 className="font-script text-5xl md:text-6xl text-primary mb-2">To my everything,</h2>
              <Divider />
              
              <div className="space-y-6 font-body text-lg sm:text-xl md:text-2xl text-foreground/90 leading-relaxed text-justify sm:text-center mt-8">
                <p>
                  I wanted to give you something that feels like you — something thoughtful, quiet, and deeply beautiful.
                </p>
                <p>
                  Your birthday made me stop and think about all the little moments that brought us here.
                </p>
                <p>
                  You have this way of making the world feel softer, warmer, and safer just by being in it.
                </p>
                <p>
                  I hope this year gives back to you all the light, patience, and love you give to the people around you.
                </p>
              </div>
              
              <Divider />
            </div>
          </Section>

          {/* ── SECTION 5: PHOTO GALLERY ── */}
          <Section className="py-24 px-4 sm:px-8 bg-card/20 relative">
            <div className="absolute inset-0 bg-cover bg-center opacity-5 pointer-events-none" style={{ backgroundImage: `url(${petalsBg})` }} />
            
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16 relative z-10">
                <h2 className="font-serif text-4xl md:text-5xl text-primary mb-4">How you became my favorite place</h2>
                <p className="font-script text-2xl text-foreground/60">the moments we share</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-6 relative z-10">
                {memories.map((m, idx) => (
                  <button
                    key={idx}
                    onClick={() => setLightboxIdx(idx)}
                    className="group focus:outline-none flex flex-col items-center"
                    data-testid={`gallery-photo-${idx}`}
                  >
                    <div className="bg-[#fdfbf7] p-3 pb-12 shadow-xl rounded-sm transform transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:rotate-1 rotate-0 w-full max-w-sm">
                      <div className="w-full aspect-[4/3] overflow-hidden rounded bg-black/5">
                        <img src={m.src} alt={m.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                      </div>
                      <div className="absolute bottom-4 left-0 w-full text-center">
                        <p className="font-script text-2xl text-[#3a2010]">{m.title}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </Section>

          {/* ── SECTION 6: TIMELINE ── */}
          <Section className="py-32 px-4 sm:px-8 max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl text-primary mb-4">The moments that shaped us</h2>
              <p className="font-body text-xl text-foreground/70">from then to now</p>
            </div>
            
            <div className="pl-4 sm:pl-8">
              {timeline.map((item, idx) => (
                <TimelineCard key={idx} title={item.title} text={item.text} photo={item.photo} />
              ))}
            </div>
          </Section>

          {/* ── SECTION 7: REASONS ── */}
          <Section className="py-24 px-4 sm:px-8 bg-black/20">
            <div className="max-w-6xl mx-auto text-center">
              <h2 className="font-serif text-5xl md:text-6xl text-primary mb-2">Eight reasons</h2>
              <p className="font-script text-3xl md:text-4xl text-foreground/80 mb-12">why I love you</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {reasons.map((r, idx) => (
                  <ReasonCard key={idx} num={romanNumerals[idx]} title={r.title} message={r.message} />
                ))}
              </div>
            </div>
          </Section>

          {/* ── SECTION 8: VOICE NOTES ── */}
          <Section className="py-24 px-4 sm:px-8 max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl md:text-5xl text-primary mb-4">If you miss me, press play</h2>
              <p className="font-body text-xl text-foreground/70">little pieces of my voice for you</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {voiceNotes.map((note, idx) => (
                <AudioNote key={idx} label={note.label} src={note.file} />
              ))}
            </div>
          </Section>

          {/* ── SECTION 9: COUNTDOWN ── */}
          <Section className="py-32 px-4 sm:px-8 border-y border-primary/20 bg-[radial-gradient(ellipse_at_center,hsl(45_68%_47%/0.08)_0%,transparent_60%)]">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">Counting the days until we celebrate you.</h2>
              <p className="font-script text-2xl md:text-3xl text-primary mb-12">Every day brings me closer to loving you out loud.</p>
              
              <Countdown targetDate={BIRTHDAY_DATE} />
            </div>
          </Section>

          {/* ── SECTION 10: SECRET REVEAL ── */}
          <Section className="py-24 px-4 sm:px-8">
            <SecretReveal />
          </Section>

          {/* ── SECTION 11: CLOSING ── */}
          <section className="relative w-full min-h-[80dvh] flex flex-col items-center justify-center overflow-hidden px-4 py-20 bg-background">
            <FloatingPetals />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2 }}
              className="relative z-20 text-center flex flex-col items-center"
            >
              <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-primary mb-6 glow-name">
                You are loved.
              </h2>
              <p className="font-body italic text-2xl sm:text-3xl text-foreground/80 mb-16">
                Deeply. Truly. Softly.
              </p>
              
              <h3 className="font-serif text-3xl sm:text-4xl text-foreground mb-6">
                Happy Birthday, {PARTNER_NAME}
              </h3>
              
              <div className="mt-8 flex flex-col items-center">
                <p className="font-script text-3xl text-primary mb-2">Forever yours,</p>
                <p className="font-serif italic text-4xl text-primary">{SENDER_NAME}</p>
              </div>

              <button 
                onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
                className="mt-20 px-6 py-2 border border-primary/30 rounded-full text-primary/60 hover:text-primary hover:border-primary transition-colors font-body focus:outline-none"
              >
                Replay from the beginning
              </button>
            </motion.div>
          </section>
        </main>
      )}

      {/* ── LIGHTBOX ── */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            className="fixed inset-0 z-[100] bg-background/98 flex flex-col items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            data-testid="lightbox"
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-foreground/50 hover:text-foreground text-3xl focus:outline-none z-50"
              aria-label="Close lightbox"
            >
              ✕
            </button>
            
            <div className="relative w-full max-w-5xl mx-auto flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setLightboxIdx(((lightboxIdx - 1) + memories.length) % memories.length)}
                className="absolute left-0 p-4 text-primary/50 hover:text-primary text-5xl md:text-6xl transition-colors focus:outline-none z-10 hidden sm:block"
                aria-label="Previous photo"
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
                <img
                  src={memories[lightboxIdx].src}
                  alt={memories[lightboxIdx].title}
                  className="max-w-full max-h-[75vh] object-contain border-4 border-[#fdfbf7] rounded-sm shadow-2xl"
                />
                <div className="mt-6 text-center">
                  <p className="font-script text-3xl text-primary">{memories[lightboxIdx].title}</p>
                  <p className="font-body text-lg text-foreground/70 mt-2">{memories[lightboxIdx].caption}</p>
                </div>
              </motion.div>

              <button
                onClick={() => setLightboxIdx((lightboxIdx + 1) % memories.length)}
                className="absolute right-0 p-4 text-primary/50 hover:text-primary text-5xl md:text-6xl transition-colors focus:outline-none z-10 hidden sm:block"
                aria-label="Next photo"
              >
                ›
              </button>
            </div>
            
            <div className="absolute bottom-6 flex gap-3 sm:hidden" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setLightboxIdx(((lightboxIdx - 1) + memories.length) % memories.length)}
                className="px-6 py-2 border border-primary/30 rounded-full text-primary"
              >
                Prev
              </button>
              <button
                onClick={() => setLightboxIdx((lightboxIdx + 1) % memories.length)}
                className="px-6 py-2 border border-primary/30 rounded-full text-primary"
              >
                Next
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
