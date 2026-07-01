import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import ScrollProgress from "@/components/ScrollProgress";
import MusicToggle from "@/components/MusicToggle";
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

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [secretOpen, setSecretOpen] = useState(false);
  const [heroVideoError, setHeroVideoError] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    setTimeout(() => {
      setIsOpen(true);
      window.scrollTo(0, 0);
    }, 1500);
  };

  return (
    <div className="min-h-[100dvh] bg-filmBg text-filmIvory font-body overflow-x-hidden relative film-grain">
      <ScrollProgress />
      {isOpen && <MusicToggle />}

      {/* SECTION 0: Opening Title */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-filmBlack px-4 film-vignette"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
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

      {isOpen && (
        <main className="w-full">
          {/* SECTION 1: Hero */}
          <section className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden px-4 film-vignette bg-gradient-to-b from-[#4a0d1c] to-filmBg">
            {!heroVideoError && (
              <video
                src="/assets/videos/opening.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
                onError={() => setHeroVideoError(true)}
              />
            )}
            
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
          <SceneSection className="bg-filmBlack">
            <SceneLabel>{scenes.prologue.title}</SceneLabel>
            <h2 className="font-display text-4xl md:text-5xl text-filmIvory mb-8">{scenes.prologue.subtitle}</h2>
            <p className="font-body text-xl md:text-2xl text-filmIvory/80 leading-relaxed max-w-2xl text-justify mb-16">
              {scenes.prologue.text}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              {scenes.prologue.videos.map((vid, i) => (
                <VideoFrame key={i} src={vid.src} caption={vid.caption} title="Early Days" />
              ))}
            </div>
          </SceneSection>

          {/* SECTION 3: Scene 1 */}
          <SceneSection className="bg-filmBg2">
            <SceneLabel>{scenes.scene1.title}</SceneLabel>
            <h2 className="font-display text-4xl md:text-6xl text-filmIvory mb-8 max-w-3xl">{scenes.scene1.heading}</h2>
            <p className="font-body text-xl md:text-2xl text-filmIvory/80 leading-relaxed max-w-2xl text-justify mb-12">
              {scenes.scene1.text}
            </p>
            <VideoFrame src={scenes.scene1.video.src} caption={scenes.scene1.video.caption} title="The Beginning" />
          </SceneSection>

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