'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function ResumeApp() {
  const [step, setStep] = useState(0);

  const sections = [
    {
      title: "Welcome Nvolvus 👋",
      content: (
        <>
          <p className="text-muted-foreground mb-4">
            Dive into a futuristic interactive resume — voice, automation, design.
          </p>
          <Button onClick={() => setStep(1)}>Start Experience</Button>
        </>
      )
    },
    {
      title: "Who I Am",
      content: (
        <>
          <p className="mb-4">
            I’m <strong>Eddy Guzman</strong>, a bilingual AI architect and funnel strategist.
            I design systems that scale — from GHL onboarding to voice-driven workflows.
          </p>
          <Button onClick={() => setStep(2)}>Next</Button>
        </>
      )
    },
    {
      title: "What I Can Do for Nvolvus",
      content: (
        <ul className="text-left list-disc pl-6 space-y-2">
          <li>🚀 GHL setup, onboarding, workflows, and CRM automations</li>
          <li>🎯 WordPress custom design & funnel integration</li>
          <li>🧠 Voice AI: built real-world, phone-free booking bots</li>
          <li>🌐 Web stacks: Vercel, Render, Git workflows</li>
          <li>🗣️ C2-level English + client-facing communication</li>
          <Button className="mt-4" onClick={() => setStep(3)}>Show Demo</Button>
        </ul>
      )
    },
    {
      title: "Live Demo: Reservo.live",
      content: (
        <>
          <p className="mb-4">
            This AI assistant handles restaurant reservations via voice — no phone needed.
            Fully integrated, fast, and scalable.
          </p>
          <a href="https://reservo.live" target="_blank" className="inline-block">
            <Button variant="default">Visit Reservo.live</Button>
          </a>
          <Button className="mt-4" onClick={() => setStep(4)}>Next</Button>
        </>
      )
    },
    {
      title: "Contact Info",
      content: (
        <>
          <p>Email: <a href="mailto:eduardoguzmanq@gmail.com" className="text-blue-400">eduardoguzmanq@gmail.com</a></p>
          <p>WhatsApp: +52 999 905 3013</p>
          <p className="text-muted-foreground mt-4">Let’s build something world-class together.</p>
        </>
      )
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        key={step}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl w-full"
      >
        <Card className="bg-[#0f172a] text-white border border-sky-500 shadow-xl rounded-2xl p-6">
          <h1 className="text-2xl font-bold mb-4 text-sky-400">{sections[step].title}</h1>
          <CardContent>{sections[step].content}</CardContent>
        </Card>
      </motion.div>
    </div>
  );
}