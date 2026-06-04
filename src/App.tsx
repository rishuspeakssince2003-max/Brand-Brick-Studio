/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { Loader } from "./components/Loader";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { Proof } from "./components/Proof";
import { Stack } from "./components/Stack";
import { Packages } from "./components/Packages";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { CustomCursor } from "./components/CustomCursor";
import { Chatbot } from "./components/Chatbot";
import { PremiumTechBackground } from "./components/PremiumTechBackground";

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="min-h-screen bg-transparent text-zinc-50 font-sans selection:bg-brand selection:text-white relative">
      <PremiumTechBackground active={!loading} />
      <AnimatePresence>
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Proof />
        <Packages />
        <Stack />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
