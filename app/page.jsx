"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// === Constantes ===
const NVOLVUS_LOGO =
  "https://images.leadconnectorhq.com/image/f_webp/q_80/r_768/u_https://assets.cdn.filesafe.space/RuTIPgoZKQ63EmsFqUJv/media/679cf4d9aedcfafb37ecce08.png";

// ======= Narrador (Web Speech) con preferencia de voz masculina =======
function useNarrator(enabled) {
  const synthRef = useRef(null);
  const speakingRef = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis || null;
      // precargar voces en algunos navegadores
      window.speechSynthesis?.getVoices();
    }
  }, []);

  const pickMaleVoice = () => {
    if (!synthRef.current) return null;
    const voices = synthRef.current.getVoices?.() || [];

    // preferimos voces masculinas en inglés (Microsoft/Google/Common)
    const maleHints = /david|daniel|matthew|john|guy|brian|mike|george|alex|matt|male/i;
    let v =
      voices.find((vv) => /en[-_](US|GB)/i.test(vv.lang) && maleHints.test(vv.name)) ||
      voices.find((vv) => /en[-_](US|GB)/i.test(vv.lang)) ||
      voices[0] ||
      null;
    return v;
  };

  const speakQueue = async (parts) => {
    if (!enabled || !synthRef.current) return;
    try { synthRef.current.cancel(); } catch {}
    speakingRef.current = true;

    const voice = pickMaleVoice();
    for (const text of parts) {
      if (!speakingRef.current) break;
      await new Promise((resolve) => {
        const u = new SpeechSynthesisUtterance(text);
        u.lang = (voice && voice.lang) || "en-US";
        u.voice = voice || null;
        u.rate = 1.0;   // natural
        u.pitch = 0.95; // más grave
        u.volume = 1.0;
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
  // loadingIntro: splash de 5s al entrar
  const [loadingIntro, setLoadingIntro] = useState(true);
  // midTransition: splash de 2s entre pantallas
  const [midTransition, setMidTransition] = useState(false);
  // step: 0 = hero, 1 = about/experience
  const [step, setStep] = useState(0);

  // voz
  const [voiceOn, setVoiceOn] = useState(true);
  const { speakQueue, stop } = useNarrator(voiceOn);

  // ===== Intro inicial 5s =====
  useEffect(() => {
    const t = setTimeout(() => setLoadingIntro(false), 5000);
    return () => clearTimeout(t);
  }, []);

  // Texto a narrar en la segunda pantalla
  const narration = useMemo(
    () => [
      "About me. I’m Eddy Guzman, a bilingual AI architect and funnel strategist. I design voice agents, automate Go High Level, and ship modern web stacks.",
      "Work experience. Five plus years building G H L for A Fine Shine in Texas and Oklahoma. Casa Window Cleaning and Evolution Paving in Canada. The Reservo dot live voice demo with no phone number. Legal workflow automation for Bill Gordon and Associates. Ten plus years remote leading teams in Mexico. Sales background with Close CRM and door to door."
    ],
    []
  );

  // Cuando paso a step 1, narra después de 400ms (si voiceOn)
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

  // Variantes para animaciones sutiles
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.18, delayChildren: 0.1 } }
  };
  const item = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } }
  };

  // Manejar click en Continue de la primera pantalla
  const goToAbout = () => {
    // splash intermedio 2s con logo grande
    setMidTransition(true);
    setTimeout(() => {
      setMidTransition(false);
      setStep(1);
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* halo morado sutil */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_50%_at_50%_0%,rgba(168,85,247,0.18),transparent_60%),radial-gradient(60%_40%_at_50%_100%,rgba(168,85,247,0.12),transparent_60%)]" />

      {/* ====== Splash inicial 5s ====== */}
      <AnimatePresence>
        {loadingIntro && (
          <motion.div
            key="intro-5s"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black grid place-items-center z-50"
          >
            <div className="flex flex-col items-center gap-6">
              <img
                src={NVOLVUS_LOGO}
                alt="Nvolvus"
                className="h-20 w-auto select-none drop-shadow-lg animate-logo-pulse"
              />
              <div className="h-5 w-5 rounded-full border border-white/20 border-t-white/70 animate-spin-slow" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ====== Splash intermedio 2s ====== */}
      <AnimatePresence>
        {midTransition && (
          <motion.div
            key="intro-2s"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black grid place-items-center z-40"
          >
            <img
              src={NVOLVUS_LOGO}
              alt="Nvolvus"
              className="h-20 w-auto select-none drop-shadow-lg animate-logo-pulse"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ====== HERO (Pantalla 1) — NO LA TOCO, solo pegada aquí ====== */}
      {!loadingIntro && step === 0 && (
        <motion.section
          key="hero"
          initial={{ opacity: 0, y: 14, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="relative z-10 w-full"
        >
          <div className="mx-auto max-w-4xl px-6 pt-24 pb-28 text-center">
            {/* Title + logo */}
            <div className="flex items-center justify-center gap-4">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Welcome</h1>
              <img src={NVOLVUS_LOGO} alt="Nvolvus" className="h-8 sm:h-9 w-auto opacity-90" />
            </div>

            {/* Subcopy */}
            <p className="mt-5 text-white/80 text-lg sm:text-xl">
              <span className="font-semibold">Custom interactive résumé for you</span>, created to showcase my skills.
            </p>

            {/* Skill chips */}
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

            {/* Continue */}
            <div className="mt-10">
              <button onClick={goToAbout} className="btn-continue" aria-label="Continue">
                Continue <span className="sparkle" aria-hidden="true">✨</span>
              </button>
            </div>
          </div>
        </motion.section>
      )}

      {/* ====== Pantalla 2 — ABOUT + EXPERIENCE, sin cajas ====== */}
      {!loadingIntro && step === 1 && !midTransition && (
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
                onClick={() => { stop(); setTimeout(() => speakQueue(narration), 50); }}
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
            className="mx-auto max-w-4xl px-6 pt-20 pb-24"
          >
            {/* Title */}
            <motion.h2
              variants={item}
              className="text-center text-3xl sm:text-4xl font-extrabold tracking-tight mb-10"
            >
              About me & work experience
            </motion.h2>

            {/* About text (sin caja) */}
            <motion.div variants={item} className="mb-8">
              <h3 className="text-lg font-semibold text-purple-200 mb-2">About me</h3>
              <p className="text-white/85 leading-relaxed">
                I’m <b>Eddy Guzman</b>, a bilingual AI architect and funnel strategist.
                I build voice agents, automate GoHighLevel, and ship modern web stacks with Git and Vercel.
                Clear communication (English C2) and fast iteration are my style.
              </p>
            </motion.div>

            {/* Chips de fortalezas */}
            <motion.div variants={item} className="mb-8">
              <div className="flex flex-wrap gap-2">
                {[
                  "Voice AI Architect",
                  "GoHighLevel Automation",
                  "WordPress Funnels",
                  "CRM Management",
                  "English C2",
                ].map((c) => (
                  <span
                    key={c}
                    className="px-3 py-1 rounded-full text-sm bg-white/5 text-white/90 border border-purple-500/30"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Work experience (sin caja) */}
            <motion.div variants={item}>
              <h3 className="text-lg font-semibold text-purple-200 mb-2">Work experience — highlights</h3>
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
                  <b>10+ years remote</b>: recruiting, training, and legal/payroll setup for MX teams.
                </li>
                <li>
                  <b>Sales</b>: Close CRM, funnels, and door-to-door experience.
                </li>
              </ul>

              <div className="mt-10 flex justify-center">
                <button
                  className="btn-continue"
                  onClick={() => {
                    stop();
                    // aquí conectamos la tercera pantalla cuando la diseñemos
                    alert("Next step: we’ll design screen 3 here.");
                  }}
                >
                  Continue <span className="sparkle" aria-hidden="true">✨</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </main>
  );
}
