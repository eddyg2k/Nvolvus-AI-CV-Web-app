"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NVOLVUS_LOGO =
  "https://images.leadconnectorhq.com/image/f_webp/q_80/r_768/u_https://assets.cdn.filesafe.space/RuTIPgoZKQ63EmsFqUJv/media/679cf4d9aedcfafb37ecce08.png";

export default function Page() {
  // Intro principal (5s)
  const [loadingIntro, setLoadingIntro] = useState(true);
  // Splash intermedio (2s) entre pantallas
  const [midTransition, setMidTransition] = useState(false);
  // 0 = hero, 1 = about/experience, 2 = AI examples, 3 = thank you
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setLoadingIntro(false), 5000); // 5s como pediste
    return () => clearTimeout(t);
  }, []);

  // Animaciones para las pantallas de contenido
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.18, delayChildren: 0.1 } }
  };
  const item = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } }
  };

  // Utilidad para cambiar de pantalla con splash 2s
  const goWithSplash = (nextStep) => {
    setMidTransition(true);
    setTimeout(() => {
      setMidTransition(false);
      setStep(nextStep);
      // scroll al inicio por si hay desplazamiento
      try { window.scrollTo({ top: 0, behavior: "instant" }); } catch {}
    }, 2000);
  };

  const goToAbout = () => goWithSplash(1);
  const goToExamples = () => goWithSplash(2);
  const goToFinish = () => goWithSplash(3);
  const restart = () => goWithSplash(0);

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
                <button className="btn-continue" onClick={goToExamples}>
                  Continue <span className="sparkle" aria-hidden="true">✨</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        </motion.section>
      )}

      {/* ===== Pantalla 3 — AI Examples ===== */}
      {!loadingIntro && step === 2 && !midTransition && (
        <motion.section
          key="examples"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="relative z-10 w-full"
        >
          {/* Discord widget flotante (abajo-derecha) */}
          <div className="fixed bottom-4 right-4 z-20 hidden md:block">
            <div className="rounded-xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(168,85,247,0.18)] bg-black/50 backdrop-blur">
              <iframe
                src="https://discord.com/widget?id=1419830884202315788&theme=dark"
                width="350"
                height="500"
                allowTransparency={true}
                frameBorder="0"
                sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                title="Discord Widget"
              />
            </div>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="mx-auto max-w-4xl px-6 pt-20 pb-28"
          >
            <motion.h2 variants={item} className="text-center text-3xl sm:text-4xl font-extrabold tracking-tight mb-10">
              AI examples & live demos
            </motion.h2>

            {/* Reservo.live */}
            <motion.div variants={item} className="space-y-3 mb-10">
              <h3 className="text-lg font-semibold text-purple-200">Phoneless Voice AI – Reservo.live</h3>
              <p className="text-white/85">
                A simple demo created for restaurants to showcase the core idea: a{" "}
                <b>phoneless AI voice agent</b> that can capture intent and route to booking without a traditional phone line.
              </p>
              <a href="https://www.reservo.live/" target="_blank" rel="noreferrer">
                <button className="btn-continue">Try it out</button>
              </a>
            </motion.div>

            {/* Custom GPT */}
            <motion.div variants={item} className="space-y-3 mb-10">
              <h3 className="text-lg font-semibold text-purple-200">Elementary English Assistant (Custom GPT)</h3>
              <p className="text-white/85">
                Work in progress. A bilingual assistant that powers the learning experience for the platform.
              </p>
              <a
                href="https://chatgpt.com/g/g-68369b7ab0848191a1c34fdb0586819b-elemental-english-assistant"
                target="_blank"
                rel="noreferrer"
              >
                <button className="btn-continue">Try it out</button>
              </a>
            </motion.div>

            {/* Clusters (GoDaddy) */}
            <motion.div variants={item} className="space-y-3 mb-10">
              <h3 className="text-lg font-semibold text-purple-200">Interactive clusters (platform demo)</h3>
              <p className="text-white/85">
                Early prototype for an interactive English-learning platform with AI-driven activities and cluster navigation.
              </p>
              <a
                href="https://elementalenglishmethod.godaddysites.com/activities-testing"
                target="_blank"
                rel="noreferrer"
              >
                <button className="btn-continue">Try it out</button>
              </a>
            </motion.div>

            {/* Loom video */}
            <motion.div variants={item} className="space-y-3 mb-12">
              <h3 className="text-lg font-semibold text-purple-200">After-hours / overflow AI agent (GHL)</h3>
              <p className="text-white/85">
                Quick walk-through of an upgraded voice agent built for A Fine Shine (GoHighLevel). Ideal for after-hours or overflow calls.
              </p>
              <a
                href="https://www.loom.com/share/8a043524e6a940c7b64c06e32ac6329a?sid=47ab2b3d-6a96-4a44-87a9-5263b0f496d8"
                target="_blank"
                rel="noreferrer"
              >
                <button className="btn-continue">Watch video</button>
              </a>
            </motion.div>

            {/* Contacto */}
            <motion.div variants={item} className="text-center text-white/80 mb-10">
              <p className="mb-1">Contact</p>
              <p className="text-white">
                <a className="underline underline-offset-4 hover:text-purple-300" href="tel:+529999053013">
                  +52 999 905 3013
                </a>{" "}
                •{" "}
                <a
                  className="underline underline-offset-4 hover:text-purple-300"
                  href="mailto:eduardoguzmanq@gmail.com"
                >
                  eduardoguzmanq@gmail.com
                </a>
              </p>
            </motion.div>

            <motion.div variants={item} className="flex justify-center">
              <button className="btn-continue" onClick={goToFinish}>
                Finish
              </button>
            </motion.div>
          </motion.div>
        </motion.section>
      )}

      {/* ===== Pantalla 4 — Thank you ===== */}
      {!loadingIntro && step === 3 && !midTransition && (
        <motion.section
          key="thankyou"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="relative z-10 w-full"
        >
          <div className="mx-auto max-w-4xl px-6 pt-28 pb-28 text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <img src={NVOLVUS_LOGO} alt="Nvolvus" className="h-10 w-auto opacity-95" />
              <h2 className="text-4xl font-extrabold tracking-tight">Thank you</h2>
            </div>
            <p className="text-white/80">
              If you’d like, we can jump on a quick call to discuss your stack and where AI can add leverage.
            </p>
            <div className="mt-10 flex justify-center">
              <button className="btn-continue" onClick={restart}>
                Restart
              </button>
            </div>
          </div>
        </motion.section>
      )}
    </main>
  );
}
