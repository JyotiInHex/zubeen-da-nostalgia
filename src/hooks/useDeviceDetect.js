import { useEffect, useState } from "react";

const getDeviceState = () => {
  if (typeof window === "undefined") {
    return {
      width: 0,
      height: 0,

      isMobile: false,
      isTablet: false,
      isDesktop: false,

      isTouch: false,
      hasHover: false,
      hasFinePointer: false,
      hasCoarsePointer: false,

      isPortrait: false,
      isLandscape: false,

      deviceType: "desktop",
    };
  }

  const width = window.innerWidth;
  const height = window.innerHeight;

  const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

  const hasHover = window.matchMedia("(hover: hover)").matches;

  const hasFinePointer = window.matchMedia("(pointer: fine)").matches;

  const hasCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

  const isMobile = width < 768;

  const isTablet = width >= 768 && width < 1024;

  const isDesktop = width >= 1024;

  const isPortrait = height >= width;

  const isLandscape = width > height;

  let deviceType = "desktop";

  if (isMobile) {
    deviceType = "mobile";
  } else if (isTablet) {
    deviceType = "tablet";
  }

  return {
    width,
    height,

    isTouch,
    isMobile,
    isTablet,
    isDesktop,

    hasHover,
    hasFinePointer,
    hasCoarsePointer,

    isPortrait,
    isLandscape,

    deviceType,
  };
};

const useDeviceDetect = () => {
  const [device, setDevice] = useState(getDeviceState);

  useEffect(() => {
    const updateDevice = () => {
      setDevice(getDeviceState());
    };

    updateDevice();

    window.addEventListener("resize", updateDevice);

    window.addEventListener("orientationchange", updateDevice);

    const hoverQuery = window.matchMedia("(hover: hover)");

    hoverQuery.addEventListener("change", updateDevice);

    const pointerQuery = window.matchMedia("(pointer: coarse)");

    pointerQuery.addEventListener("change", updateDevice);

    return () => {
      window.removeEventListener("resize", updateDevice);

      window.removeEventListener("orientationchange", updateDevice);

      hoverQuery.removeEventListener("change", updateDevice);

      pointerQuery.removeEventListener("change", updateDevice);
    };
  }, []);

  return device;
};

export default useDeviceDetect;
