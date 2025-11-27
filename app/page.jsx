"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Float, Html, MeshDistortMaterial, OrbitControls } from "@react-three/drei";
import { easing } from "maath";
import * as THREE from "three";

const BRAND_NAME = "PROSPECTIVITY";
const LOGO_SRC = "/prospectivity-logo.svg";

const sectionVariants = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

function BallPit({ count = 64 }) {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const colors = useMemo(
    () => ["#7dd3fc", "#a855f7", "#38bdf8", "#c4b5fd", "#60a5fa"].map((c) => new THREE.Color(c)),
    []
  );

  useEffect(() => {
    if (!meshRef.current) return;
    for (let i = 0; i < count; i++) {
      meshRef.current.setColorAt(i, colors[i % colors.length]);
    }
    meshRef.current.instanceColor.needsUpdate = true;
  }, [colors, count]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    for (let i = 0; i < count; i++) {
      const radius = 3.2 + Math.sin(i) * 0.4;
      const x = Math.sin(t * 0.6 + i * 0.85) * radius;
      const y = Math.cos(t * 0.5 + i * 1.1) * 1.8 + Math.sin(t * 0.9 + i * 0.3) * 0.9;
      const z = Math.cos(t * 0.7 + i * 0.6) * 2.6;
      const scale = 0.4 + 0.18 * Math.sin(t + i * 0.5);

      dummy.position.set(x, y, z);
      dummy.scale.setScalar(scale + 0.35);
      dummy.rotation.set(Math.sin(t + i) * 0.6, Math.cos(t * 0.8 + i) * 0.6, 0);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.45, 42, 42]} />
      <meshStandardMaterial vertexColors metalness={0.55} roughness={0.25} />
    </instancedMesh>
  );
}

function BallPitCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 52 }} className="rounded-3xl ring-1 ring-white/5">
      <color attach="background" args={["#050d1f"]} />
      <ambientLight intensity={0.9} />
      <pointLight position={[4, 4, 6]} intensity={2.2} color="#93c5fd" />
      <pointLight position={[-4, -2, -4]} intensity={1.2} color="#a855f7" />
      <Float speed={1.6} floatIntensity={1} rotationIntensity={0.8}>
        <BallPit />
      </Float>
      <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.6} />
      <ContactShadows position={[0, -2.8, 0]} opacity={0.32} blur={2.8} far={4.5} />
    </Canvas>
  );
}

function ElasticScene({ demos }) {
  const palette = ["#38bdf8", "#a855f7", "#60a5fa", "#22d3ee", "#c084fc", "#7dd3fc"];
  const orbit = 6.6;
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    easing.dampE(groupRef.current.rotation, [Math.sin(time * 0.08) * 0.08, time * 0.12, 0], 0.2, delta);
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={1.2} floatIntensity={1.5}>
        <mesh>
          <icosahedronGeometry args={[3.2, 24]} />
          <MeshDistortMaterial color="#1e3a8a" speed={2.4} distort={0.44} roughness={0.28} metalness={0.4} />
        </mesh>
      </Float>

      {demos.map((demo, i) => {
        const angle = (i / demos.length) * Math.PI * 2;
        const x = Math.cos(angle) * orbit;
        const y = Math.sin(angle) * (orbit * 0.48);
        const z = Math.sin(angle * 1.4) * 1.8;
        return (
          <Float key={demo.title} speed={1.4} rotationIntensity={0.9} floatIntensity={1.2}>
            <mesh position={[x, y, z]}>
              <sphereGeometry args={[0.55, 36, 36]} />
              <meshStandardMaterial
                color={palette[i % palette.length]}
                emissive={palette[i % palette.length]}
                emissiveIntensity={0.25}
                roughness={0.2}
                metalness={0.55}
              />
              <Html center>
                <div className="demo-chip">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-200/80">{demo.tag}</p>
                  <p className="text-sm font-semibold text-white">{demo.title}</p>
                </div>
              </Html>
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}

function ElasticDemoCanvas({ demos }) {
  return (
    <Canvas camera={{ position: [0, 0, 11], fov: 55 }} className="rounded-3xl ring-1 ring-white/5">
      <color attach="background" args={["#040b1b"]} />
      <ambientLight intensity={0.9} />
      <directionalLight position={[6, 6, 5]} intensity={1.2} color="#93c5fd" />
      <ElasticScene demos={demos} />
      <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.55} />
    </Canvas>
  );
}

function SectionShell({ title, kicker, children, dark = false }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  return (
    <section ref={ref} className={`section-shell ${dark ? "section-shell-dark" : ""}`}>
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-6xl mx-auto px-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <motion.span
            className="kicker"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.45 }}
          >
            {kicker}
          </motion.span>
          <motion.div
            className="flex items-center gap-2 text-sm text-sky-100/80"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.16, duration: 0.45 }}
          >
            <div className="h-px w-10 bg-gradient-to-r from-cyan-400/60 to-purple-400/50" />
            <span>Scroll to explore</span>
          </motion.div>
        </div>
        <div className="flex items-start justify-between flex-col gap-6 sm:flex-row sm:items-center">
          <motion.h2
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-sky-50"
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.12, duration: 0.55 }}
          >
            {title}
          </motion.h2>
          <motion.img
            src={LOGO_SRC}
            alt={`${BRAND_NAME} logo`}
            className="h-10 w-auto drop-shadow-lg logo-spin"
            initial={{ rotate: 0, opacity: 0 }}
            animate={inView ? { rotate: 360, opacity: 1 } : {}}
            transition={{ duration: 1.8, ease: "linear" }}
          />
        </div>
        {children}
      </motion.div>
    </section>
  );
}

export default function Page() {
  const [intro, setIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIntro(false), 3200);
    return () => clearTimeout(timer);
  }, []);

  const competencies = [
    {
      title: "Voice + workflow AI",
      copy: "Ballpit-grade 3D energy paired with conversational design: phoneless voice agents, GHL automation, and realtime routing across CRM + calendars.",
      items: ["Live socket + RTC orchestration", "Guardrails with rapid prompt sprints", "Elastic workflows that mirror ops"],
    },
    {
      title: "Product storytelling",
      copy: "I ship dark, sleek experiences that stay performant—Framer Motion, Tailwind, and custom shaders when we need a memorable moment.",
      items: ["Micro-interactions across scroll", "Composable UI tokens", "Dark-blue premium palette"],
    },
    {
      title: "Systems integration",
      copy: "Reservo-style booking flows, Discord classrooms, and direct API experiments with model overrides that can pivot quickly.",
      items: ["Reservo.ai direct API hooks", "Discord widget + mod tools", "Model swap friendly contracts"],
    },
  ];

  const workflow = [
    {
      title: "Reservo.ai direct API",
      detail:
        "Use the same booking endpoint and payloads you already trust. Swap models when needed; the UX keeps the conversation flowing across this page without clicks.",
      badge: "Booking AI",
    },
    {
      title: "Discord classroom",
      detail:
        "Live widget seats on the page keep community close. Announcements, office hours, and AI coaching all live beside the demos for instant proof.",
      badge: "Community",
    },
    {
      title: "Prospecting layer",
      detail:
        "Workflow cards + 3D canvases show off skills while mapping directly to your CRM. Elastic hero shows the jump from awareness to booked calls.",
      badge: "Pipeline",
    },
  ];

  const demos = [
    { title: "Phoneless AI Agent", tag: "reserv" },
    { title: "Custom GPT Guide", tag: "assistant" },
    { title: "Interactive Clusters", tag: "ux" },
    { title: "Discord Classroom", tag: "community" },
    { title: "Overflow AI Agent", tag: "voice" },
    { title: "Multilingual Onboarding", tag: "global" },
  ];

  return (
    <main className="min-h-screen bg-sapphire text-sky-50 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_10%,rgba(59,130,246,0.14),transparent_60%),radial-gradient(70%_60%_at_80%_70%,rgba(168,85,247,0.18),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-50 mix-blend-screen" aria-hidden>
        <div className="absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
      </div>

      <AnimatePresence>
        {intro && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 grid place-items-center z-50"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="flex flex-col items-center gap-5"
            >
              <motion.img
                src={LOGO_SRC}
                alt={`${BRAND_NAME} logo`}
                className="h-16 w-auto drop-shadow-2xl animate-logo-pulse"
                animate={{ rotate: 360 }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "linear" }}
              />
              <div className="text-center space-y-2">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-200/80">{BRAND_NAME}</p>
                <p className="text-2xl font-semibold text-white">Shaping elastic AI experiences</p>
              </div>
              <div className="h-5 w-5 rounded-full border border-white/20 border-t-cyan-200 animate-spin-slow" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="sticky top-0 z-30 backdrop-blur-xl bg-slate-950/60 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">
          <motion.img
            src={LOGO_SRC}
            alt={`${BRAND_NAME} mark`}
            className="h-10 w-auto drop-shadow-md logo-spin"
            animate={{ rotate: 360 }}
            transition={{ duration: 12, ease: "linear", repeat: Infinity }}
          />
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-sky-200/80">{BRAND_NAME}</p>
            <p className="text-base text-white/80">Phoneless AI | Dark webcraft | Discord-native demos</p>
          </div>
          <div className="ml-auto flex items-center gap-3 text-sm text-white/70">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden />
            Live scroll—no clicks required
          </div>
        </div>
      </header>

      <section className="pt-16 pb-20 relative z-10">
        <div className="max-w-6xl mx-auto px-6 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.25em] text-sky-200/80">Dark blue hero</p>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-sky-50">
              Prospectivity is a scroll-first, cinematic résumé that blends 3D energy with
              <span className="text-cyan-300"> Reservo.ai</span> booking flows and Discord-native support.
            </h1>
            <p className="text-lg text-slate-200/80 max-w-2xl">
              Every section is animated as you scroll—no CTA clicks. The logo spins on each transition and the
              ballpit keeps the hero alive while we showcase the stack: voice AI, workflows, booking demos, and
              community.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Voice AI", "Reservo API", "Discord classroom", "GHL automation", "3D scroll effects"].map((tag) => (
                <span key={tag} className="pill">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 bg-gradient-to-br from-cyan-500/10 via-purple-500/8 to-transparent blur-3xl" aria-hidden />
            <BallPitCanvas />
          </div>
        </div>
      </section>

      <SectionShell title="Capabilities with motion" kicker="Skill stack">
        <div className="grid gap-6 md:grid-cols-3">
          {competencies.map((block) => (
            <div key={block.title} className="glass-card">
              <p className="text-sm uppercase tracking-[0.22em] text-sky-200/80 mb-2">{block.title}</p>
              <p className="text-sm text-slate-200/80 mb-4 leading-relaxed">{block.copy}</p>
              <ul className="space-y-2 text-sm text-sky-50/90">
                {block.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </SectionShell>

      <SectionShell title="Reservo.ai + workflow lane" kicker="Demo runway" dark>
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] items-stretch">
          <div className="glass-card gradient-border h-full">
            <p className="text-base font-semibold text-sky-50 mb-3">Reservo booking API — direct + model-flexible</p>
            <p className="text-sm text-slate-200/80 leading-relaxed mb-4">
              We keep your existing booking endpoint and payload, adding a model-agnostic handshake so we can swap
              providers without touching the UI. Latency budgets and retries are visible, and the conversation keeps
              flowing in-page.
            </p>
            <div className="code-block">
              <p className="text-xs text-cyan-200 mb-2">/api/reservo/booking</p>
              <pre className="text-xs text-slate-100/90 whitespace-pre-wrap leading-relaxed">
{`POST /api/reservo/booking
{
  "guest": "walk-in or voice", 
  "preferred_model": "gpt-4o-mini",
  "intent": "reserve_table",
  "notes": "no phone, browser only"
}`}              </pre>
              <p className="text-[11px] text-slate-300/80 mt-2">
                Swap <span className="text-cyan-200">preferred_model</span> to test responses. Voice agent mirrors this with
                a socket delay guard so the UX feels intentional.
              </p>
            </div>
          </div>
          <div className="space-y-4">
            {workflow.map((step) => (
              <div key={step.title} className="glass-card flex items-start gap-4">
                <div className="pill pill-glow">{step.badge}</div>
                <div>
                  <p className="text-base font-semibold text-sky-50">{step.title}</p>
                  <p className="text-sm text-slate-200/80 leading-relaxed">{step.detail}</p>
                </div>
              </div>
            ))}
            <div className="glass-card">
              <p className="text-sm uppercase tracking-[0.22em] text-sky-200/80 mb-2">Discord widget (live)</p>
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(56,189,248,0.15)]">
                <iframe
                  src="https://discord.com/widget?id=1419830884202315788&theme=dark"
                  width="100%"
                  height="280"
                  allowTransparency
                  frameBorder="0"
                  sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                  title="Discord Widget"
                />
              </div>
            </div>
          </div>
        </div>
      </SectionShell>

      <SectionShell title="Interactive elastic canvas" kicker="Live demos" dark>
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] items-center">
          <div className="glass-card space-y-4 order-2 lg:order-1">
            <p className="text-sm uppercase tracking-[0.22em] text-sky-200/80">Hover, scroll, orbit</p>
            <p className="text-lg text-slate-200/80 leading-relaxed">
              The canvas on the right is elastic: a distorted icosahedron pulses with the scroll while labeled spheres
              represent each demo. It stays dark, sleek, and responsive.
            </p>
            <ul className="space-y-2 text-sm text-sky-50/90">
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-400 mt-1" />
                <span>Orbit controls active—just scroll to see the motion.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 mt-1" />
                <span>Labels: Reservo phoneless agent, GPT guide, clusters, Discord, overflow voice agent, multilingual onboarding.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 mt-1" />
                <span>Ready for additional model tests—just swap the preferred model in the API block above.</span>
              </li>
            </ul>
          </div>
          <div className="order-1 lg:order-2 relative">
            <div className="absolute -inset-8 bg-gradient-to-tr from-cyan-400/10 via-purple-400/10 to-transparent blur-3xl" aria-hidden />
            <ElasticDemoCanvas demos={demos} />
          </div>
        </div>
      </SectionShell>

      <footer className="py-16 relative z-10">
        <div className="max-w-6xl mx-auto px-6 grid gap-6 md:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.22em] text-sky-200/80">Contact</p>
            <p className="text-3xl font-extrabold text-sky-50">Let&apos;s launch the next interactive résumé</p>
            <p className="text-slate-200/80 text-sm leading-relaxed">
              Voice agents, dark-sleek websites, Discord-powered classrooms, and Reservo booking flows—all in one
              scroll. I build fast and keep communication clear.
            </p>
          </div>
          <div className="glass-card">
            <div className="flex items-center gap-3 mb-4">
              <motion.img
                src={LOGO_SRC}
                alt={`${BRAND_NAME} footer mark`}
                className="h-10 w-auto drop-shadow-md logo-spin"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, ease: "linear", repeat: Infinity }}
              />
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-sky-200/80">{BRAND_NAME}</p>
                <p className="text-slate-100/90 text-sm">Dark blue, sleek, professional.</p>
              </div>
            </div>
            <div className="space-y-2 text-sm text-slate-100/90">
              <p>
                <span className="text-slate-300/80">Phone</span> · <a className="link" href="tel:+529999053013">+52 999 905 3013</a>
              </p>
              <p>
                <span className="text-slate-300/80">Email</span> ·
                <a className="link" href="mailto:eduardoguzmanq@gmail.com"> eduardoguzmanq@gmail.com</a>
              </p>
              <p>
                <span className="text-slate-300/80">Discord</span> · <span className="text-white/90">Live widget above</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
