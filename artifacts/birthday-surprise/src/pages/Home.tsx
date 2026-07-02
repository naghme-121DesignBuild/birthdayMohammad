import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import ScrollProgress from "@/components/ScrollProgress";
import SceneSection from "@/components/SceneSection";
import VideoFrame from "@/components/VideoFrame";
import FilmStrip from "@/components/FilmStrip";
import EightFrames from "@/components/EightFrames";
import VoiceoverPlayer from "@/components/VoiceoverPlayer";
import Countdown from "@/components/Countdown";
import EndCredits from "@/components/EndCredits";

import { 
  BIRTHDAY_DATE, 
  PARTNER_NAME, 
  SENDER_NAME, 
  FILM_TITLE, 
  scenes, 
  eightFrames, 
  memories as memoriesData, 
  voiceNotes, 
  endCredits 
} from "@/data/filmContent";

// Photos
import photo1 from "@assets/IMG_7533_1782879356200.PNG";
import photo2 from "@assets/IMG_7536_1782879356203.PNG";
import photo3 from "@assets/IMG_7541_1782879356204.PNG";
import photo4 from "@assets/IMG_7543_1782879356204.PNG";
import photo5 from "@assets/IMG_7544_1782879356205.PNG";

const memories = memoriesData.map(m => {
  if (m.photo === "photo1") return { ...m, photo: photo1 };
  if (m.photo === "photo2") return { ...m, photo: photo2 };
  if (m.photo === "photo3") return { ...m, photo: photo3 };
  if (m.photo === "photo4") return { ...m, photo: photo4 };
  if (m.photo === "photo5") return { ...m, photo: photo5 };
  return m;
});

function SceneLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6 opacity-70">
      <div className="w-8 h-[1px] bg-filmGold" />
      <span className="font-ui text-xs tracking-[0.3em] uppercase text-filmGold">{children}</span>
      <div className="w-8 h-[1px] bg-filmGold" />
    </div>
  );
}

function PrologueVideo() {
  const [missing, setMissing] = useState(false);

  if (missing) {
    return (
      <div className="absolute inset-0 bg-filmBlack/60" />
    );
  }

  return (
    <video
      src="/assets/videos/before-we-met-1.mp4"
      playsInline
      preload="metadata"
      controls
      className="absolute inset-0 w-full h-full object-cover"
      onError={() => setMissing(true)}
    />
  );
}

function PersonalMessageVideo() {
  const [missing, setMissing] = useState(false);
  const [playing, setPlaying] = useState(false);
  const vidRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    if (!vidRef.current) return;
    vidRef.current.play().then(() => setPlaying(true)).catch(() => {});
  };

  if (missing) {
    return (
      <div className="w-full aspect-video bg-filmBlack/60 flex items-center justify-center">
        <div className="w-14 h-14 rounded-full border border-filmGold/20 flex items-center justify-center">
          <span className="text-filmGold/25 text-2xl ml-1">▶</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <video
        ref={vidRef}
        src="/assets/videos/personal-message.mp4"
        playsInline
        preload="metadata"
        controls={playing}
        className="w-full object-contain block"
        style={{ maxHeight: "80vh" }}
        onError={() => setMissing(true)}
        onEnded={() => setPlaying(false)}
      />
      <AnimatePresence>
        {!playing && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer"
            style={{
              background: "linear-gradient(to bottom, rgba(8,0,2,0.25) 0%, rgba(8,0,2,0.05) 40%, rgba(8,0,2,0.5) 100%)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={handlePlay}
          >
            <motion.div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{
                background: "rgba(212,175,55,0.1)",
                border: "1px solid rgba(212,175,55,0.55)",
                boxShadow: "0 0 40px rgba(212,175,55,0.2), inset 0 0 20px rgba(212,175,55,0.05)",
              }}
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
            >
              <span className="text-filmGold text-3xl ml-1.5">▶</span>
            </motion.div>
            <p className="mt-5 font-ui text-[9px] tracking-[0.4em] text-filmGold/50 uppercase">پخش</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [secretOpen, setSecretOpen] = useState(false);
  const [introVideoError, setIntroVideoError] = useState(false);
  const [videoMuted, setVideoMuted] = useState(true);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const introVideoRef = useRef<HTMLVideoElement>(null);

  const handleOpen = () => {
    setIsOpening(true);
    setTimeout(() => {
      setShowVideo(true);
    }, 1200);
  };

  useEffect(() => {
    if (!showVideo || !introVideoRef.current) return;
    const vid = introVideoRef.current;
    vid.muted = true;
    vid.play().then(() => setVideoPlaying(true)).catch(() => {
      // autoplay blocked — show play button overlay, user will tap
    });
  }, [showVideo]);

  const handlePlayVideo = () => {
    if (!introVideoRef.current) return;
    const vid = introVideoRef.current;
    vid.muted = false;
    setVideoMuted(false);
    vid.play().then(() => setVideoPlaying(true)).catch(() => {});
  };

  const handleUnmute = () => {
    if (!introVideoRef.current) return;
    introVideoRef.current.muted = false;
    setVideoMuted(false);
  };

  const triggerTransition = useCallback(() => {
    setTransitioning(true);
    setTimeout(() => {
      setIsOpen(true);
      setShowVideo(false);
      window.scrollTo(0, 0);
    }, 900);
    setTimeout(() => {
      setTransitioning(false);
    }, 2000);
  }, []);

  return (
    <div className="min-h-[100dvh] bg-filmBg text-filmIvory font-body overflow-x-hidden relative film-grain">
      <ScrollProgress />

      {/* GOLD SPARK TRANSITION OVERLAY */}
      <AnimatePresence>
        {transitioning && (
          <motion.div
            className="fixed inset-0 z-[200] pointer-events-none flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
          >
            {/* Dark base */}
            <div className="absolute inset-0 bg-filmBlack" />
            {/* Gold radial bloom */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(212,175,55,0.55) 0%, rgba(212,175,55,0.12) 50%, transparent 80%)",
              }}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: [0, 1, 0.6, 0] }}
              transition={{ duration: 1.8, times: [0, 0.25, 0.6, 1], ease: "easeInOut" }}
            />
            {/* Spark particles */}
            {Array.from({ length: 14 }).map((_, i) => {
              const angle = (i / 14) * 360;
              const dist = 80 + (i % 3) * 60;
              const size = 2 + (i % 4);
              return (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-filmSoftGold"
                  style={{ width: size, height: size }}
                  initial={{ x: 0, y: 0, opacity: 0 }}
                  animate={{
                    x: Math.cos((angle * Math.PI) / 180) * dist,
                    y: Math.sin((angle * Math.PI) / 180) * dist,
                    opacity: [0, 1, 0],
                    scale: [0.5, 1.5, 0],
                  }}
                  transition={{ duration: 1.1, delay: 0.1 + i * 0.03, ease: "easeOut" }}
                />
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* SECTION 0: Opening Title */}
      <AnimatePresence>
        {!isOpen && !showVideo && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-filmBlack px-4"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* vignette as its own non-interactive layer */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle, transparent 50%, rgba(10,0,4,0.8) 100%)" }} />
            <div className="relative z-10 flex flex-col items-center text-center">
              <span className="font-ui text-xs tracking-[0.4em] text-filmGold/60 mb-6 uppercase">
                A private film by {SENDER_NAME}
              </span>
              
              <motion.h1 
                className="font-display text-4xl sm:text-5xl md:text-7xl text-filmIvory tracking-tight mb-8 max-w-4xl"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.2 }}
              >
                {FILM_TITLE}
              </motion.h1>

              <motion.div 
                className="h-[1px] bg-filmGold shadow-[0_0_15px_rgba(212,175,55,0.5)] mb-8"
                initial={{ width: 0 }}
                animate={isOpening ? { width: "100%", opacity: 0 } : { width: "16rem" }}
                transition={isOpening ? { duration: 0.8 } : { duration: 1, delay: 1 }}
              />

              {!isOpening && (
                <>
                  <motion.p 
                    className="font-body italic text-filmGold/80 text-xl md:text-2xl max-w-xl mb-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.5 }}
                  >
                    for your birthday, and for all the moments that brought us here
                  </motion.p>
                  
                  <motion.button
                    onClick={handleOpen}
                    className="px-8 py-3 border border-filmGold text-filmGold font-ui tracking-[0.2em] text-sm uppercase hover:bg-filmGold hover:text-filmBlack transition-colors duration-500 rounded-sm focus:outline-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 2 }}
                    aria-label="Start the film"
                    data-testid="btn-start-film"
                  >
                    Start the film ▶
                  </motion.button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FULLSCREEN INTRO VIDEO (between title card and main film) */}
      <AnimatePresence>
        {showVideo && !isOpen && (
          <motion.div
            className="fixed inset-0 z-[60] bg-filmBlack flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            {introVideoError ? (
              /* Missing file — elegant placeholder + auto-proceed */
              <motion.div
                className="flex flex-col items-center gap-6 px-8 text-center"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="w-full max-w-lg aspect-video border border-filmGold/30 rounded flex items-center justify-center bg-filmBg2 text-filmGold/40 font-ui tracking-widest text-sm uppercase">
                  Opening film coming soon
                </div>
                <button
                  onClick={triggerTransition}
                  className="px-8 py-3 border border-filmGold text-filmGold font-ui tracking-[0.2em] text-sm uppercase hover:bg-filmGold hover:text-filmBlack transition-colors duration-500 rounded-sm focus:outline-none"
                  aria-label="Continue to film"
                  data-testid="btn-skip-video"
                >
                  Continue ▶
                </button>
              </motion.div>
            ) : (
              <div className="relative w-full h-full">
                <video
                  ref={introVideoRef}
                  src="/assets/videos/opening.mp4"
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                  onPlay={() => setVideoPlaying(true)}
                  onEnded={triggerTransition}
                  onError={() => setIntroVideoError(true)}
                  data-testid="video-intro"
                />
                {/* Vignette overlay */}
                <div className="absolute inset-0 pointer-events-none film-vignette" />

                {/* PLAY BUTTON OVERLAY — shown if autoplay was blocked */}
                <AnimatePresence>
                  {!videoPlaying && (
                    <motion.div
                      className="absolute inset-0 flex flex-col items-center justify-center bg-filmBlack/70 backdrop-blur-sm cursor-pointer"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, delay: 0 }}
                      onClick={handlePlayVideo}
                    >
                      <motion.div
                        className="w-24 h-24 rounded-full border-2 border-filmGold flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(212,175,55,0.3)]"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      >
                        <span className="text-filmGold text-4xl ml-1">▶</span>
                      </motion.div>
                      <p className="font-ui text-xs tracking-[0.3em] text-filmGold/70 uppercase">
                        Tap to play
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Unmute button — appears while playing but muted */}
                <AnimatePresence>
                  {videoPlaying && videoMuted && (
                    <motion.button
                      onClick={handleUnmute}
                      className="absolute bottom-6 left-6 flex items-center gap-2 px-4 py-2 border border-filmGold/50 text-filmGold/80 hover:text-filmGold hover:border-filmGold bg-filmBlack/60 backdrop-blur-sm font-ui text-xs tracking-widest uppercase transition-all duration-300 rounded-sm focus:outline-none"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ delay: 0.5, duration: 0.4 }}
                      aria-label="Enable sound"
                      data-testid="btn-unmute"
                    >
                      <span>🔇</span>
                      <span>Tap for sound</span>
                    </motion.button>
                  )}
                </AnimatePresence>

                {/* Skip button — bottom right */}
                <button
                  onClick={triggerTransition}
                  className="absolute bottom-6 right-6 px-4 py-2 border border-filmIvory/20 text-filmIvory/40 hover:text-filmIvory hover:border-filmIvory/60 font-ui text-xs tracking-widest uppercase transition-all duration-300 rounded-sm focus:outline-none"
                  aria-label="Skip intro video"
                  data-testid="btn-skip-intro"
                >
                  Skip ›
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && (
        <main className="w-full">
          {/* SECTION 1: Hero */}
          <section className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden px-4 film-vignette bg-gradient-to-b from-[#4a0d1c] to-filmBg">
            
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
              {Array.from({ length: 7 }).map((_, i) => (
                <div 
                  key={i}
                  className="absolute w-32 h-32 rounded-full bg-filmGold/5 blur-3xl"
                  style={{
                    left: `${10 + Math.random() * 80}%`,
                    top: `${20 + Math.random() * 60}%`,
                    animation: `floatOrb ${10 + Math.random() * 10}s infinite ease-in-out ${Math.random() * 5}s`
                  }}
                />
              ))}
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 0.5 }}
              >
                <p className="font-script text-4xl sm:text-5xl md:text-6xl text-filmGold mb-6">
                  Happy Birthday, my love
                </p>
                <h2 className="font-display text-6xl sm:text-8xl md:text-9xl text-filmIvory drop-shadow-[0_0_30px_rgba(255,247,236,0.3)] tracking-tighter">
                  {PARTNER_NAME}
                </h2>
              </motion.div>

              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 80 }}
                transition={{ duration: 1.5, delay: 1.5, ease: "easeInOut" }}
                className="w-[1px] bg-gradient-to-b from-filmGold to-transparent my-10"
              />

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 2.5 }}
                className="font-body italic text-filmIvory/70 text-xl sm:text-2xl max-w-lg"
              >
                Before the candles, before the noise — this is for you.
              </motion.p>
            </div>

            <motion.div 
              className="absolute bottom-10 flex flex-col items-center text-filmGold/50 animate-bounce"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.5, duration: 1 }}
            >
              <span className="text-xs font-ui tracking-widest uppercase mb-2">Scroll</span>
              <span>↓</span>
            </motion.div>
          </section>

          {/* SECTION 2: Prologue */}
          <section
            className="relative w-full overflow-hidden"
            style={{ background: "linear-gradient(160deg, #180410 0%, #240815 40%, #1a0510 100%)" }}
          >
            {/* Film grain texture layer */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
              style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "180px" }} />
            {/* Warm center glow */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 55% at 50% 50%, rgba(100,10,35,0.18) 0%, transparent 70%)" }} />

            <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pb-24 md:pb-32 flex flex-col md:flex-row items-center gap-10 md:gap-14" style={{ paddingTop: "0.2rem" }}>

              {/* ── TEXT SIDE (58%) ── */}
              <motion.div
                className="w-full md:w-[58%] flex flex-col items-center md:items-start text-center md:text-left order-2 md:order-1 shrink-0"
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              >
                {/* Label */}
                <div className="flex items-center gap-3 mb-7 opacity-60 mx-auto md:mx-0">
                  <div className="w-8 h-[1px] bg-filmGold" />
                  <span className="font-ui text-[9px] tracking-[0.45em] text-filmGold uppercase">Prologue</span>
                  <div className="w-8 h-[1px] bg-filmGold" />
                </div>

                {/* Main heading */}
                <h2 className="font-display text-3xl sm:text-4xl md:text-[2.6rem] text-filmIvory leading-[1.25] mb-8 max-w-md">
                  Before we met, we were already becoming us.
                </h2>

                {/* Gold divider */}
                <div className="flex items-center gap-4 mb-8 mx-auto md:mx-0">
                  <div className="w-12 h-[1px] bg-filmGold/50" />
                  <div className="w-1.5 h-1.5 rounded-full bg-filmGold/40" />
                  <div className="w-12 h-[1px] bg-filmGold/50" />
                </div>

                {/* Poem — refined quote block */}
                <div className="relative mx-auto md:mx-0 max-w-sm w-full">
                  {/* Left gold bar */}
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] rounded-full md:block hidden"
                    style={{ background: "linear-gradient(to bottom, transparent, rgba(212,175,55,0.5), transparent)" }} />
                  <blockquote
                    dir="rtl"
                    lang="fa"
                    className="md:pl-6 text-right"
                    style={{
                      fontFamily: "'Noto Nastaliq Urdu', serif",
                      fontSize: "clamp(1rem, 2.2vw, 1.3rem)",
                      lineHeight: "2.6",
                      color: "rgba(212,175,55,0.85)",
                      textShadow: "0 0 40px rgba(212,175,55,0.2)",
                    }}
                  >
                    <p>چنانت دوست می‌دارم، که گر روزی فراق افتد</p>
                    <p>تو صبر از من توانی کرد و من صبر از تو نتوانم</p>
                  </blockquote>
                </div>
              </motion.div>

              {/* ── FRAME SIDE (42%) ── */}
              <motion.div
                className="w-full md:w-[42%] flex flex-col items-center order-1 md:order-2 shrink-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, delay: 0.18, ease: "easeOut" }}
              >
                {/* Ambient glow behind frame */}
                <div className="absolute pointer-events-none" style={{
                  width: "380px", height: "560px",
                  background: "radial-gradient(ellipse 65% 75% at 50% 48%, rgba(139,0,50,0.3) 0%, rgba(212,175,55,0.07) 50%, transparent 72%)",
                  filter: "blur(32px)",
                }} />

                {/* Archive label */}
                <div className="flex items-center gap-2.5 mb-4 opacity-40">
                  <div className="w-5 h-[1px] bg-filmGold" />
                  <span className="font-ui text-[8px] tracking-[0.5em] text-filmGold uppercase">Archive — 01</span>
                  <div className="w-5 h-[1px] bg-filmGold" />
                </div>

                {/* Frame wrapper */}
                <div className="relative" style={{ width: "min(290px, 74vw)" }}>

                  {/* Ground shadow */}
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 pointer-events-none" style={{
                    width: "75%", height: "50px",
                    background: "rgba(0,0,0,0.6)",
                    filter: "blur(22px)",
                    borderRadius: "50%",
                  }} />

                  {/* The cinematic frame */}
                  <div className="relative rounded-2xl overflow-hidden" style={{
                    aspectRatio: "9/16",
                    border: "1px solid rgba(212,175,55,0.28)",
                    background: "#0a0003",
                    boxShadow: [
                      "0 0 0 1px rgba(255,247,236,0.03)",
                      "inset 0 0 50px rgba(0,0,0,0.75)",
                      "inset 0 1px 0 rgba(212,175,55,0.12)",
                      "0 40px 100px rgba(0,0,0,0.65)",
                      "0 12px 30px rgba(100,10,35,0.25)",
                    ].join(", "),
                  }}>
                    <PrologueVideo />

                    {/* Glass sheen */}
                    <div className="absolute inset-0 pointer-events-none" style={{
                      background: "linear-gradient(145deg, rgba(255,247,236,0.06) 0%, rgba(255,247,236,0.01) 25%, transparent 50%)",
                    }} />

                    {/* Timestamp */}
                    <span className="absolute bottom-2.5 right-3 font-ui text-[8px] tracking-[0.3em] text-filmGold/25 pointer-events-none select-none">
                      00:18
                    </span>
                  </div>

                  {/* Corner registration marks */}
                  {[
                    "top-0 left-0 border-t border-l rounded-tl-sm",
                    "top-0 right-0 border-t border-r rounded-tr-sm",
                    "bottom-0 left-0 border-b border-l rounded-bl-sm",
                    "bottom-0 right-0 border-b border-r rounded-br-sm",
                  ].map((cls, i) => (
                    <div key={i} className={`absolute w-3 h-3 pointer-events-none ${cls}`}
                      style={{ borderColor: "rgba(212,175,55,0.45)" }} />
                  ))}
                </div>

                {/* Caption */}
                <div className="mt-7 flex flex-col items-center">
                  <div className="w-10 h-[1px] bg-filmGold/25 mb-3" />
                  <p
                    dir="rtl"
                    lang="fa"
                    className="text-center"
                    style={{
                      fontFamily: "'Noto Nastaliq Urdu', serif",
                      fontSize: "0.82rem",
                      lineHeight: "2.0",
                      color: "rgba(255,247,236,0.45)",
                      maxWidth: "240px",
                    }}
                  >
                    پیش از اولین دیدار،<br />چیزی میان ما آغاز شده بود.
                  </p>
                </div>
              </motion.div>

            </div>
          </section>

          {/* SECTION 3: Scene 1 — Personal Message */}
          <section
            className="relative w-full overflow-hidden"
            style={{ background: "linear-gradient(160deg, #120008 0%, #1c0610 50%, #120008 100%)" }}
          >
            <div className="absolute inset-0 pointer-events-none opacity-[0.035]"
              style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "180px" }} />
            <div className="absolute inset-0 pointer-events-none" style={{
              background: "radial-gradient(ellipse 70% 55% at 50% 30%, rgba(139,0,50,0.12) 0%, transparent 65%)",
            }} />

            <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 py-20 md:py-28 flex flex-col items-center">

              {/* Scene label */}
              <motion.div
                className="flex items-center gap-3 mb-10 opacity-50"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.5 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              >
                <div className="w-10 h-[1px] bg-filmGold" />
                <span className="font-ui text-[9px] tracking-[0.5em] text-filmGold uppercase">Scene 1</span>
                <div className="w-10 h-[1px] bg-filmGold" />
              </motion.div>

              {/* Heading */}
              <motion.h2
                dir="rtl"
                lang="fa"
                className="text-center mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.1 }}
                style={{
                  fontFamily: "'Noto Nastaliq Urdu', serif",
                  fontSize: "clamp(1.4rem, 4vw, 2.2rem)",
                  color: "rgba(255,247,236,0.95)",
                  lineHeight: 2.0,
                  textShadow: "0 0 40px rgba(255,247,236,0.08)",
                }}
              >
                این قسمت را خودم باید می‌گفتم
              </motion.h2>

              {/* Gold divider */}
              <motion.div
                className="flex items-center gap-4 mb-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <div className="w-16 h-[1px] bg-filmGold/40" />
                <div className="w-1.5 h-1.5 rounded-full bg-filmGold/35" />
                <div className="w-16 h-[1px] bg-filmGold/40" />
              </motion.div>

              {/* Body text */}
              <motion.div
                dir="rtl"
                lang="fa"
                className="text-center mb-14 max-w-2xl"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.2 }}
                style={{
                  fontFamily: "'Noto Nastaliq Urdu', serif",
                  fontSize: "clamp(0.95rem, 2.2vw, 1.2rem)",
                  color: "rgba(255,247,236,0.6)",
                  lineHeight: 2.8,
                }}
              >
                <p>بعضی حرف‌ها را نمی‌شود لای متن‌ها پنهان کرد.</p>
                <p>بعضی حس‌ها باید با صدا گفته شوند،</p>
                <p>با مکث،</p>
                <p>با نگاه،</p>
                <p>با همان لرز کوچکی که آدم وقتی از دلش حرف می‌زند، دارد.</p>
              </motion.div>

              {/* Personal video frame */}
              <motion.div
                className="w-full flex flex-col items-center"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, delay: 0.3, ease: "easeOut" }}
              >
                {/* Ambient glow */}
                <div className="absolute pointer-events-none" style={{
                  width: "600px", height: "400px",
                  background: "radial-gradient(ellipse, rgba(139,0,50,0.2) 0%, rgba(212,175,55,0.05) 50%, transparent 70%)",
                  filter: "blur(40px)",
                }} />

                {/* Frame container — flexible for any aspect ratio */}
                <div className="relative w-full max-w-2xl">

                  {/* Ground shadow */}
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 pointer-events-none" style={{
                    width: "70%", height: "60px",
                    background: "rgba(0,0,0,0.55)",
                    filter: "blur(24px)",
                    borderRadius: "50%",
                  }} />

                  {/* The cinematic frame */}
                  <div
                    className="relative rounded-xl overflow-hidden"
                    style={{
                      border: "1px solid rgba(212,175,55,0.25)",
                      background: "#080002",
                      boxShadow: [
                        "0 0 0 1px rgba(255,247,236,0.025)",
                        "inset 0 0 60px rgba(0,0,0,0.8)",
                        "inset 0 1px 0 rgba(212,175,55,0.1)",
                        "0 40px 100px rgba(0,0,0,0.7)",
                        "0 12px 40px rgba(100,10,35,0.3)",
                      ].join(", "),
                    }}
                  >
                    <PersonalMessageVideo />

                    {/* Glass sheen */}
                    <div className="absolute inset-0 pointer-events-none" style={{
                      background: "linear-gradient(145deg, rgba(255,247,236,0.05) 0%, rgba(255,247,236,0.01) 20%, transparent 45%)",
                    }} />
                  </div>

                  {/* Corner marks */}
                  {[
                    "top-0 left-0 border-t border-l rounded-tl",
                    "top-0 right-0 border-t border-r rounded-tr",
                    "bottom-0 left-0 border-b border-l rounded-bl",
                    "bottom-0 right-0 border-b border-r rounded-br",
                  ].map((cls, i) => (
                    <div key={i} className={`absolute w-4 h-4 pointer-events-none ${cls}`}
                      style={{ borderColor: "rgba(212,175,55,0.4)" }} />
                  ))}
                </div>

                {/* Caption */}
                <div className="mt-8 flex flex-col items-center">
                  <div className="w-12 h-[1px] bg-filmGold/25 mb-4" />
                  <p
                    dir="rtl"
                    lang="fa"
                    className="text-center"
                    style={{
                      fontFamily: "'Noto Nastaliq Urdu', serif",
                      fontSize: "0.85rem",
                      lineHeight: 2.2,
                      color: "rgba(255,247,236,0.4)",
                    }}
                  >
                    برای تو، بی‌واسطه‌تر از هر نوشته‌ای.
                  </p>
                </div>
              </motion.div>

            </div>
          </section>

          {/* SECTION 4: Scene 2 */}
          <SceneSection className="bg-filmBg">
            <SceneLabel>{scenes.scene2.title}</SceneLabel>
            <h2 className="font-display text-4xl md:text-5xl text-filmIvory mb-8 max-w-3xl">{scenes.scene2.heading}</h2>
            <p className="font-body text-xl md:text-2xl text-filmIvory/80 leading-relaxed max-w-2xl text-justify mb-12">
              {scenes.scene2.text}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              {scenes.scene2.videos.map((vid, i) => (
                <VideoFrame key={i} src={vid.src} caption={vid.caption} title={`Movement ${i+1}`} />
              ))}
            </div>
          </SceneSection>

          {/* SECTION 5: Voiceover Interlude */}
          <SceneSection className="bg-filmBlack border-y border-filmGold/10">
            <SceneLabel>Voiceover</SceneLabel>
            <h2 className="font-display italic text-3xl md:text-5xl text-filmGold mb-8">The things I say better when the world is quiet</h2>
            <p className="font-body text-xl md:text-2xl text-filmIvory/80 max-w-2xl text-center mb-16 italic">
              "I wanted this part to feel like my voice sitting beside you."
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
              {voiceNotes.map((note, i) => (
                <VoiceoverPlayer key={i} label={note.label} src={note.src} />
              ))}
            </div>
          </SceneSection>

          {/* SECTION 6: Memory Montage */}
          <SceneSection className="bg-filmBg2">
            <SceneLabel>Montage</SceneLabel>
            <h2 className="font-display text-4xl md:text-5xl text-filmIvory mb-4">Little pieces of us</h2>
            <p className="font-script text-2xl md:text-3xl text-filmGold/80 mb-4">the moments we share</p>
            <FilmStrip memories={memories} />
          </SceneSection>

          {/* SECTION 7: Eight Frames */}
          <SceneSection className="bg-filmBg relative overflow-visible">
            <div className="absolute inset-0 bg-filmVignette pointer-events-none" />
            <SceneLabel>Eight Frames</SceneLabel>
            <h2 className="font-script text-5xl md:text-7xl text-filmGold mb-6">eight reasons I keep choosing you</h2>
            <EightFrames frames={eightFrames} />
          </SceneSection>

          {/* SECTION 8: Secret Scene */}
          <SceneSection className="bg-filmBlack flex flex-col items-center">
            {!secretOpen ? (
              <button 
                onClick={() => setSecretOpen(true)}
                className="px-8 py-4 border border-filmIvory/20 text-filmIvory/40 hover:text-filmIvory hover:border-filmIvory transition-all duration-500 font-ui tracking-widest text-sm uppercase rounded-sm"
              >
                Unlock the scene I almost kept to myself
              </button>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="w-full flex flex-col items-center"
              >
                <SceneLabel>Secret Scene</SceneLabel>
                <h2 className="font-display text-4xl md:text-5xl text-filmIvory mb-8">The part I almost whispered</h2>
                <p className="font-body text-xl md:text-2xl text-filmIvory/80 leading-relaxed max-w-2xl text-center mb-12">
                  Some things belong only to us.
                </p>
                <VideoFrame src="/assets/videos/secret-scene.mp4" title="Secret" caption="For your eyes only." />
              </motion.div>
            )}
          </SceneSection>

          {/* SECTION 9: Countdown */}
          <SceneSection className="bg-filmBg2 border-t border-filmGold/20">
            <SceneLabel>Premiere Night</SceneLabel>
            <h2 className="font-display text-4xl md:text-5xl text-filmIvory mb-4">Counting down to your birthday</h2>
            <p className="font-body italic text-2xl text-filmGold/80 mb-8">Every second brings me closer to celebrating you.</p>
            <Countdown targetDate={BIRTHDAY_DATE} />
          </SceneSection>

          {/* SECTION 10: Final Scene */}
          <section className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center bg-filmBlack px-4 py-32 overflow-hidden text-center film-vignette">
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <VideoFrame src="/assets/videos/final-message.mp4" title="" />
            </div>
            
            <div className="relative z-10 flex flex-col items-center max-w-3xl">
              <SceneLabel>Final Scene</SceneLabel>
              
              <h2 className="font-display text-5xl sm:text-6xl md:text-8xl text-filmGold drop-shadow-[0_0_20px_rgba(212,175,55,0.3)] mb-12">
                Happy Birthday,<br />{PARTNER_NAME}
              </h2>
              
              <p className="font-display italic text-3xl sm:text-4xl text-filmIvory mb-6">
                You are loved.
              </p>
              
              <p className="font-body italic text-2xl sm:text-3xl text-filmMuted mb-20">
                Deeply. Truly. Softly.
              </p>
              
              <div className="flex flex-col items-center mt-12">
                <p className="font-script text-3xl sm:text-4xl text-filmGold mb-2">Forever yours,</p>
                <p className="font-display italic text-4xl sm:text-5xl text-filmGold">{SENDER_NAME}</p>
              </div>

              <button 
                onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
                className="mt-32 px-8 py-3 border border-filmGold/40 text-filmGold/60 hover:text-filmGold hover:border-filmGold hover:shadow-[0_0_15px_rgba(212,175,55,0.2)] transition-all duration-500 font-ui tracking-widest text-sm uppercase rounded-sm"
              >
                Replay the film
              </button>
            </div>
          </section>

          {/* SECTION 11: End Credits */}
          <EndCredits credits={endCredits} />
        </main>
      )}
    </div>
  );
}