"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../components/ui/button"; // (no lo usamos visualmente, pero lo dejamos por si lo ocupas en otras steps)

const NVOLVUS_LOGO =
  "https://images.leadconnectorhq.com/image/f_webp/q_80/r_768/u_https://assets.cdn.filesafe.space/RuTIPgoZKQ63EmsFqUJv/media/679cf4d9aedcfafb37ecce08.png";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 4200); // intro estilo Vercel
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* sutil halo morado en las orillas */}
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

      {/* HERO FULL-PAGE */}
      {!loading && (
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

            {/* Continue button — gradient pill */}
            <div className="mt-10">
              <button
                onClick={() => setStep(1)}
                className="btn-continue"
                aria-label="Continue"
              >
                Continue
                <span className="sparkle" aria-hidden="true">✨</span>
              </button>
            </div>
          </div>
        </motion.section>
      )}
    </main>
  );
}
