import { useEffect, useState } from "react";

type DeviceProfile = {
  isMobile: boolean;
  isTouch: boolean;
  prefersReducedMotion: boolean;
  lowPerformanceMode: boolean;
};

function getDeviceProfile(): DeviceProfile {
  if (typeof window === "undefined") {
    return {
      isMobile: false,
      isTouch: false,
      prefersReducedMotion: false,
      lowPerformanceMode: false,
    };
  }

  const isMobile = window.innerWidth < 768;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch =
    window.matchMedia("(pointer: coarse)").matches ||
    navigator.maxTouchPoints > 0 ||
    "ontouchstart" in window;

  return {
    isMobile,
    isTouch,
    prefersReducedMotion,
    lowPerformanceMode: isMobile || isTouch || prefersReducedMotion,
  };
}

export function useDeviceProfile() {
  const [profile, setProfile] = useState<DeviceProfile>(() => getDeviceProfile());

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerQuery = window.matchMedia("(pointer: coarse)");
    const updateProfile = () => setProfile(getDeviceProfile());

    updateProfile();
    window.addEventListener("resize", updateProfile);
    reducedMotionQuery.addEventListener("change", updateProfile);
    pointerQuery.addEventListener("change", updateProfile);

    return () => {
      window.removeEventListener("resize", updateProfile);
      reducedMotionQuery.removeEventListener("change", updateProfile);
      pointerQuery.removeEventListener("change", updateProfile);
    };
  }, []);

  return profile;
}
