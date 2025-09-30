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

    {/* NOTA: md:pr-[380px] evita que el contenido quede debajo del widget */}
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="mx-auto max-w-4xl px-6 pt-20 pb-28 md:pr-[380px]"
    >
      <motion.h2
        variants={item}
        className="text-center text-3xl sm:text-4xl font-extrabold tracking-tight mb-10"
      >
        AI examples & live demos
      </motion.h2>

      {/* Reservo.live */}
      <motion.div variants={item} className="space-y-3 mb-10">
        <h3 className="text-lg font-semibold text-purple-200">
          Phoneless Voice AI — Reservo.live
        </h3>
        <p className="text-white/85 leading-relaxed">
          This is a simple demo originally created for restaurants to showcase the core idea:
          a <b>phoneless AI voice agent</b> that talks through the browser without triggering a phone call.
          <br />
          <br />
          <b>How to test:</b> click the button to start the agent, grant microphone access, and be aware the socket is
          deliberately delayed to prevent random usage. You might need to <b>refresh the page a couple of times</b> until
          you reach the AI. Once connected, talk to it and try a booking-type interaction.
        </p>
        <a href="https://www.reservo.live/" target="_blank" rel="noreferrer">
          <button className="btn-continue">Try it out</button>
        </a>
      </motion.div>

      {/* Custom GPT */}
      <motion.div variants={item} className="space-y-3 mb-10">
        <h3 className="text-lg font-semibold text-purple-200">
          Elementary English Assistant (Custom GPT)
        </h3>
        <p className="text-white/85 leading-relaxed">
          <b>Work in progress.</b> A bilingual assistant meant to guide learners across the platform:
          organizing tasks, answering questions, and tracking progress. The same approach can be adapted
          to <b>any industry</b> and paired with <b>phoneless AI voice agent interactions</b> for hands-free flows.
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
        <h3 className="text-lg font-semibold text-purple-200">
          Interactive clusters (platform demo)
        </h3>
        <p className="text-white/85 leading-relaxed">
          This demo is an <b>embedded HTML</b> inside a GoDaddy Site Builder page (similar to WordPress).
          Template builders are great for speed, but they’re <b>template-constrained</b>, so original,
          fully interactive designs can be harder. These are just <b>demo activity modules</b> to preview the idea;
          the production stack can move to a more flexible setup (Git + Vercel/Render) for a truly custom experience.
        </p>
        <a
          href="https://elementalenglishmethod.godaddysites.com/activities-testing"
          target="_blank"
          rel="noreferrer"
        >
          <button className="btn-continue">Try it out</button>
        </a>
      </motion.div>

      {/* Discord classroom */}
      <motion.div variants={item} className="space-y-3 mb-10">
        <h3 className="text-lg font-semibold text-purple-200">Discord classroom (live community)</h3>
        <p className="text-white/85 leading-relaxed">
          The widget on the right connects directly to my <b>online teaching classroom</b> for students.
          It’s a custom server for my private English courses, and the plan is to onboard more teachers to
          become an <b>online school</b>. This is an <b>8-year project</b> in constant growth — events, voice channels,
          and real-time support are part of the experience.
        </p>
        <a href="https://discord.com/widget?id=1419830884202315788&theme=dark" target="_blank" rel="noreferrer">
          <button className="btn-continue">Open classroom</button>
        </a>
      </motion.div>

      {/* Loom video */}
      <motion.div variants={item} className="space-y-3 mb-12">
        <h3 className="text-lg font-semibold text-purple-200">
          After-hours / overflow AI agent (GHL) — Loom walkthrough
        </h3>
        <p className="text-white/85 leading-relaxed">
          A video tour of a <b>custom AI voice agent</b> built for GoHighLevel and used by A Fine Shine.
          It’s been upgraded over time and, more importantly, it has <b>field experience</b> — the prompts,
          guardrails, and settings have been refined continuously. As of now, it’s one of the <b>strongest,
          production-tested setups</b> in the space, designed and iterated by me since the feature launched in GHL.
        </p>
        <a
          href="https://www.loom.com/share/8a043524e6a940c7b64c06e32ac6329a?sid=47ab2b3d-6a96-4a44-87a9-5263b0f496d8"
          target="_blank"
          rel="noreferrer"
        >
          <button className="btn-continue">Watch video</button>
        </a>
      </motion.div>

      {/* Contacto + Finish */}
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
