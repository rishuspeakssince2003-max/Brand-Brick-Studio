/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
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
import { useDeviceProfile } from "./lib/useDeviceProfile";

export default function App() {
  const [loading, setLoading] = useState(true);
  const { lowPerformanceMode } = useDeviceProfile();

  useEffect(() => {
    if (lowPerformanceMode) {
      setLoading(false);
    }
  }, [lowPerformanceMode]);

  return (
    <div className="min-h-screen bg-transparent text-zinc-50 font-sans selection:bg-brand selection:text-white relative">
      <PremiumTechBackground active={!loading} reducedMotion={lowPerformanceMode} />
      <AnimatePresence>
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      {!lowPerformanceMode && <CustomCursor />}
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
