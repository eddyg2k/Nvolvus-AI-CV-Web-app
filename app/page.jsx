"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

const NVOLVUS_LOGO =
  "https://images.leadconnectorhq.com/image/f_webp/q_80/r_768/u_https://assets.cdn.filesafe.space/RuTIPgoZKQ63EmsFqUJv/media/679cf4d9aedcfafb37ecce08.png";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Intro tipo Vercel: 2.2s y transiciona al hero
    const t = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-[#120a1d] to-black text-white flex items-center justify-center">
      {/* LOADING INTRO */}
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
              {/* Logo con animación */}
              <div className="relative">
                <img
                  src={NVOLVUS_LOGO}
                  alt="Nvolvus"
                  className="h-14 w-auto select-none drop-shadow-lg animate-logo-pulse"
                />
                {/* spinner sutil como Vercel */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
                  <div className="h-5 w-5 rounded-full border border-white/20 border-t-white/70 animate-spin-slow" />
                </div>
              </div>

              <div className="text-center">
                <p className="text-2xl font-semibold tracking-wide">Welcome Nvolvus&nbsp;AI</p>
                <p className="text-sm text-white/60 mt-2">Authenticating experience…</p>
              </div>
            </div>

            <span className="sr-only">Loading</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO (pantalla principal) */}
      {!loading && (
        <motion.div
          key="hero"
          initial={{ opacity: 0, y: 14, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="w-full px-6"
        >
          <Card className="mx-auto max-w-3xl rounded-2xl border border-purple-500/40 bg-white/5 backdrop-blur-md shadow-[0_0_60px_rgba(168,85,247,0.15)]">
            <CardContent className="p-8 text-center space-y-6">
              <div className="flex items-center justify-center gap-3">
                <img src={NVOLVUS_LOGO} alt="Nvolvus" className="h-8 w-auto opacity-90" />
                <h1 className="text-3xl font-extrabold tracking-tight text-white">
                  Welcome Nvolvus <span className="align-middle">👋</span>
                </h1>
              </div>

              <p className="text-white/80">
                <span className="font-semibold">Custom interactive résumé created by Eddy Guzman for you</span>,  to
                showcase my skills in <span className="text-purple-300">Voice AI</span>,{" "}
                <span className="text-purple-300">GoHighLevel</span>,{" "}
                <span className="text-purple-300">WordPress funnels</span>, and{" "}
                <span className="text-purple-300">CRM automation</span>.
              </p>

              {/* chips */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                {["GoHighLevel", "WordPress/Funnels", "Voice AI", "CRM", "English C2"].map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-full text-sm bg-purple-500/15 text-purple-200 border border-purple-500/30"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex items-center justify-center gap-3 pt-2">
                <Button onClick={() => setStep(1)} className="bg-purple-400 text-black hover:bg-purple-300">
                  Start Experience
                </Button>
                <a href="https://reservo.live" target="_blank" rel="noreferrer">
                  <Button className="bg-transparent text-white border border-white/30 hover:border-white/60">
                    Voice AI Demo
                  </Button>
                </a>
              </div>

              {/* hint pequeño */}
              <p className="text-xs text-white/50">
                5+ years building GoHighLevel systems (US & Canada): Ai Voice Agents, automation, funnels, pipelines, subaccounts.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </main>
  );
}
