"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NVOLVUS_LOGO =
  "https://images.leadconnectorhq.com/image/f_webp/q_80/r_768/u_https://assets.cdn.filesafe.space/RuTIPgoZKQ63EmsFqUJv/media/679cf4d9aedcfafb37ecce08.png";

export default function Page() {
  // Intro principal (5s)
  const [loadingIntro, setLoadingIntro] = useState(true);
  // Splash intermedio (2s) al pasar a la segunda pantalla
  const [midTransition, setMidTransition] = useState(false);
  // 0 = hero, 1 = about/experience
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setLoadingIntro(false), 5000); // 5s como pediste
    return () => clearTimeout(t);
  }, []);

  // Animaciones para la 2ª pantalla
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.18, delayChildren: 0.1 } }
  };
  const item = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } }
  };

  const goToAbout = () => {
    setMidTransition(true); // splash 2s con logo
    setTimeout(() => {
      setMidTransition(false);
      setStep(1);
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* halo morado sutil */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_50%_at_50%_0%,rgba(168,85,247,0.18),transparent_60%),radial-gradient(60%_40%_at_50%_100%,rgba(168,85,247,0.12),transparent_60%)]" />

      {/* ===== Intro principal (5s) — restaurado tal cual lo tenías ===== */}
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

      {/* ===== Splash intermedio (2s) con solo el logo ===== */}
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

      {/* ===== Pantalla 1 (HERO) — SIN CAMBIOS ===== */}
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

      {/* ===== Pantalla 2 — About + Experience (sin cajas) ===== */}
      {!loadingIntro && step === 1 && !midTransition && (
        <motion.section
          key="about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="relative z-10 w-full"
        >
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

            {/* About */}
            <motion.div variants={item} className="mb-8">
              <h3 className="text-lg font-semibold text-purple-200 mb-2">About me</h3>
              <p className="text-white/85 leading-relaxed">
                I’m <b>Eddy Guzman</b>, a bilingual AI architect and funnel strategist.
                I build voice agents, automate GoHighLevel, and ship modern web stacks with Git render and Vercel; Wordpress is no problem.
                Clear communication (English C2) and fast iteration are my style.
              </p>
            </motion.div>

            {/* Chips */}
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

            {/* Experience */}
            <motion.div variants={item}>
              <h3 className="text-lg font-semibold text-purple-200 mb-2">Work experience — highlights</h3>
              <ul className="list-disc pl-6 space-y-2 text-white/90">
                <li>
                  <b>A Fine Shine</b> (TX & OK): 5+ years in GHL — workflows, SMS blasts, overflow AI agent,
                  Angi voice agent, subaccounts.
                </li>
                <li>
                  <b>Casa Window Cleaning</b> & <b>Evolution Paving</b> (Canada): full GHL setup, AI agent, marketing and door to door sales.
                </li>
                <li>
                  <b>Reservo.live</b>: voice AI booking demo with no phone number, original code.
                </li>
                <li>
                  <b>Bill Gordon & Associates</b> (law): paralegal task automation with VB back in the days.
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
                    // aquí conectamos la pantalla 3 cuando la diseñemos
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
