"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";


export default function ResumeApp() {
  const [step, setStep] = useState(0);

  const Section = ({ title, children }) => (
    <motion.div
      key={title}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="max-w-2xl w-full"
    >
      <Card className="border border-sky-500/60 bg-[#0b1324]/90 shadow-2xl rounded-2xl p-6">
        <h1 className="text-2xl font-bold mb-4 text-sky-400">{title}</h1>
        <CardContent>{children}</CardContent>
      </Card>
    </motion.div>
  );

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white">
      {step === 0 && (
        <Section title="Welcome Nvolvus 👋">
          <div className="flex flex-col items-center text-center space-y-4">
            <img
              src="https://nvolvus.ai/wp-content/uploads/2023/07/logo-white.svg"
              alt="Nvolvus"
              className="h-10 opacity-80"
            />
            <p className="text-slate-300">
              Futuristic interactive résumé: voice AI, GHL automation, funnels, and WordPress.
            </p>
            <Button onClick={() => setStep(1)}>Start Experience</Button>
          </div>
        </Section>
      )}

      {step === 1 && (
        <Section title="Who I Am">
          <p className="mb-4">
            I’m <strong>Eddy Guzman</strong>, a bilingual (EN/ES) AI architect and funnel strategist.
            I build voice agents, automate CRMs, and ship modern web stacks that move revenue.
          </p>
          <Button onClick={() => setStep(2)}>Next</Button>
        </Section>
      )}

      {step === 2 && (
        <Section title="Experience Snapshot">
          <ul className="list-disc pl-6 space-y-2 text-left">
            <li><b>A Fine Shine</b> (TX & OK): 5+ yrs on GHL CRM; workflows, SMS blasts, after-hours overflow AI voice agent, Angi agent w/ transfers, subaccount architecture.</li>
            <li><b>CASA Window Cleaning</b> (Canada): Full GHL setup + custom AI agent.</li>
            <li><b>Evolution Paving</b>: CRM pipelines, funnel logic, ops automation.</li>
            <li><b>Reservo.live</b>: Voice AI booking demo — no phone number needed.</li>
            <li><b>Elementary English</b>: Platform + AI teaching assistants in progress.</li>
            <li><b>Bill Gordon & Associates</b> (law): Automation for paralegal task flows.</li>
            <li><b>Southern Voices & YASC</b>: Customer service, team onboarding, remote ops.</li>
            <li><b>Flames Sales</b>: High-velocity sales using Close CRM.</li>
            <li>10+ yrs remote work; recruiting, training, legal/payroll setup for MX teams.</li>
          </ul>
          <div className="mt-4">
            <Button onClick={() => setStep(3)}>What I Can Do for Nvolvus →</Button>
          </div>
        </Section>
      )}

      {step === 3 && (
        <Section title="What I Can Do for Nvolvus">
          <ul className="list-disc pl-6 space-y-2 text-left">
            <li>🚀 <b>Go High Level</b>: onboarding, automations, multi-agent flows, CRM management.</li>
            <li>🎯 <b>WordPress</b>: custom design/dev, funnels, CRM integration.</li>
            <li>🧠 <b>Voice AI</b>: phone-free agents, smart routing, NLP, transfers, custom actions.</li>
            <li>🌐 <b>Web Stacks</b>: Git, Vercel/Render, CI/CD, scalable frontends.</li>
            <li>🧩 <b>Ops</b>: recruiting/training nearshore teams; compliant payroll; clear comms.</li>
            <li>🗣️ <b>English C2</b> — professional, client-facing communication.</li>
          </ul>
          <div className="mt-4 flex gap-3">
            <a href="https://reservo.live" target="_blank" rel="noreferrer">
              <Button>Visit Reservo.live</Button>
            </a>
            <Button onClick={() => setStep(4)}>Next</Button>
          </div>
        </Section>
      )}

      {step === 4 && (
        <Section title="Contact & Quick Pitch">
          <p className="mb-3">
            Let’s scale voice automation and funnels with a modern stack. 
            I can ship in Git/Vercel, or work within WordPress when it serves speed.
          </p>
          <p>
            <b>Email:</b> <a className="text-sky-300" href="mailto:eduardoguzmanq@gmail.com">eduardoguzmanq@gmail.com</a><br/>
            <b>WhatsApp:</b> +52 999 905 3013
          </p>
          <div className="mt-4">
            <Button onClick={() => setStep(0)}>Restart</Button>
          </div>
        </Section>
      )}
    </main>
  );
}
