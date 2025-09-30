"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

const NVOLVUS_LOGO =
  "https://images.leadconnectorhq.com/image/f_webp/q_80/r_768/u_https://assets.cdn.filesafe.space/RuTIPgoZKQ63EmsFqUJv/media/679cf4d9aedcfafb37ecce08.png";

// ---------- Voice narration helpers ----------
function useNarrator(enabled) {
  const synthRef = useRef(null);
  const speakingRef = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis || null;
    }
  }, []);

  const speakQueue = async (items) => {
    if (!enabled || !synthRef.current) return;
    // stop any current
    try { synthRef.current.cancel(); } catch {}
    speakingRef.current = true;

    for (const text of items) {
      if (!speakingRef.current) break;
      await new Promise((resolve) => {
        const u = new SpeechSynthesisUtterance(text);
        u.lang = "en-US";
        u.rate = 0.98;
        u.pitch = 1.0;
        // choose a nicer voice if available
        const voices = synthRef.current.getVoices?.() || [];
        const preferred =
          voices.find((v) => /en[-_](US|GB)/i.test(v.lang) && /female|zira|sara|ariel/i.test(v.name)) ||
          voices.find((v) => /en[-_](US|GB)/i.test(v.lang)) ||
          voices[0];
        if (preferred) u.voice = preferred;
        u.onend = resolve;
        try { synthRef.current.speak(u); } catch { resolve(); }
      });
    }
  };

  const stop = () => {
    speakingRef.current = false;
    try { synthRef.current?.cancel(); } catch {}
  };

  return { speakQueue, stop };
}

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(0); // 0 = hero, 1 = about/experience
  const [voiceOn, setVoiceOn] = useState(true);
  const { speakQueue, stop } = useNarrator(voiceOn);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2200); // intro estilo Vercel
    return () => clearTimeout(t);
  }, []);

  // Narration content (kept short & clear)
  const narration = useMemo(
    () => [
      "About me. I’m Eddy Guzman, a bilingual AI architect and funnel strategist. I design voice agents, automate Go High Level, and ship modern web stacks.",
      "Work experience. Five plus years building G H L for A Fine Shine in Texas and Oklahoma. Casa Window Cleaning and Evolution Paving in Canada. The Reservo dot live voice demo with no phone number. Legal workflow automation for Bill Gordon and Associates. Customer service at Southern Voices and Y A S C. Ten plus years remote, recruiting and training teams in Mexico. Sales background with Close CRM and door to door.",
    ],
    []
  );

  // When step switches to 1, start the narration after a tiny delay
  useEffect(() => {
    if (step === 1 && voiceOn) {
      const t = setTimeout(() => speakQueue(narration), 400);
      return () => {
        clearTimeout(t);
        stop();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, voiceOn]);

  // ----- Animation variants for second screen -----
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.18, delayChildren: 0.1 },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  };

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* sutil halo morado */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_50%_at_50%_0%,rgba(168,85,247,0.18),transparent_60%),radial-gradient(60%_40%_at_50%_100%,rgba(168,85,247,0.12),transparent_60%)]" />

      {/* INTRO LOADER */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black grid place-items-center z-50"
          >
            <div className="flex flex-col items-center gap-6">
              <div className="relative">
                <img
                  src={NVOLVUS_LOGO}
                  alt="Nvolvus"
                  className="h-14 w-auto select-none drop-shadow-lg animate-logo-pulse"
                />
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
                  <div className="h-5 w-5 rounded-full border border-white/20 border-t-white/70 animate-spin-slow" />
                </div>
              </div>

              <div className="text-center">
                <p className="text-2xl font-semibold tracking-wide">Welcome Nvolvus AI</p>
                <p className="text-sm text-white/60 mt-2">Authenticating experience…</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SCREEN 0 – HERO (NO CAMBIÉ NADA DE TU DISEÑO) */}
      {!loading && step === 0 && (
        <motion.section
          key="hero"
          initial={{ opacity: 0, y: 14, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="relative z-10 w-full"
        >
          <div className="mx-auto max-w-4xl px-6 pt-24 pb-28 text-center">
            <div className="flex items-center justify-center gap-4">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Welcome</h1>
              <img src={NVOLVUS_LOGO} alt="Nvolvus" className="h-8 sm:h-9 w-auto opacity-90" />
            </div>

            <p className="mt-5 text-white/80 text-lg sm:text-xl">
              <span className="font-semibold">Custom interactive résumé for you</span>, created to
              showcase my skills.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {["GoHighLevel", "WordPress/Funnels", "Voice AI", "CRM", "English C2"].map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full text-sm bg-white/5 text-white/90 border border-purple-500/30"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-10">
              <button onClick={() => setStep(1)} className="btn-continue" aria-label="Continue">
                Continue <span className="sparkle" aria-hidden="true">✨</span>
              </button>
            </div>
          </div>
        </motion.section>
      )}

      {/* SCREEN 1 – ABOUT + EXPERIENCE (con narración y transiciones) */}
      {!loading && step === 1 && (
        <motion.section
          key="about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="relative z-10 w-full"
        >
          {/* voice controls */}
          <div className="fixed right-4 top-4 z-20">
            <div className="flex gap-2">
              <button
                className="px-3 py-1.5 rounded-md text-sm bg-white/10 border border-white/20 hover:bg-white/15"
                onClick={() => setVoiceOn((v) => !v)}
                title={voiceOn ? "Mute voice" : "Unmute voice"}
              >
                {voiceOn ? "🔊 Voice On" : "🔇 Voice Off"}
              </button>
              <button
                className="px-3 py-1.5 rounded-md text-sm bg-white/10 border border-white/20 hover:bg-white/15"
                onClick={() => {
                  stop();
                  setTimeout(() => speakQueue(narration), 50);
                }}
                title="Replay narration"
              >
                ⟳ Replay
              </button>
            </div>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="mx-auto max-w-4xl px-6 pt-18 pb-24"
          >
            <motion.h2
              variants={item}
              className="text-center text-3xl sm:text-4xl font-extrabold tracking-tight mb-8"
            >
              About me & work experience
            </motion.h2>

            {/* ABOUT */}
            <motion.div variants={item} className="mb-8">
              <Card className="rounded-2xl border border-purple-500/30 bg-white/5 backdrop-blur-md">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-purple-200">About me</h3>
                  <p className="text-white/85">
                    I’m <b>Eddy Guzman</b>, a bilingual AI architect and funnel strategist.
                    I build voice agents, automate GoHighLevel, and ship modern web stacks with Git and Vercel.
                    Clear communication (English C2) and fast iteration are my style.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* EXPERIENCE */}
            <motion.div variants={item}>
              <Card className="rounded-2xl border border-purple-500/30 bg-white/5 backdrop-blur-md">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-purple-200">Work experience (highlights)</h3>
                  <ul className="list-disc pl-6 space-y-2 text-white/90">
                    <li>
                      <b>A Fine Shine</b> (TX & OK): 5+ years in GHL — workflows, SMS blasts, overflow AI agent,
                      Angi voice agent, subaccounts.
                    </li>
                    <li>
                      <b>Casa Window Cleaning</b> & <b>Evolution Paving</b> (Canada): full GHL setup, AI agent, funnels.
                    </li>
                    <li>
                      <b>Reservo.live</b>: voice AI booking demo with no phone number.
                    </li>
                    <li>
                      <b>Bill Gordon & Associates</b> (law): paralegal task automation in GHL.
                    </li>
                    <li>
                      <b>Southern Voices</b> & <b>YASC</b>: customer service & onboarding.
                    </li>
                    <li>
                      <b>10+ years remote</b>: recruiting, training, and legal/payroll setup for MX teams.
                    </li>
                    <li>
                      <b>Sales</b>: Close CRM, funnels, and door-to-door experience.
                    </li>
                  </ul>

                  <div className="mt-6 flex justify-center">
                    <button
                      className="btn-continue"
                      onClick={() => {
                        stop();
                        // aquí podríamos ir al siguiente paso (step 2) cuando lo diseñemos
                        alert("Next step: we’ll design the third screen next.");
                      }}
                    >
                      Continue
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </main>
  );
}
