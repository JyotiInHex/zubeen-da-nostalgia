import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import useDeviceDetect from "@/hooks/useDeviceDetect";
import { DesktopDownload, Download2, LaptopDownload } from "reicon-react";

const PWAInstall = () => {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  const { isDesktop, isTablet, isMobile } = useDeviceDetect();

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setInstallPrompt(event);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  useEffect(() => {
    if (!installPrompt) return;

    let showTimer;
    let hideTimer;

    const show = () => {
      setShowBanner(true);

      hideTimer = window.setTimeout(() => {
        setShowBanner(false);

        showTimer = window.setTimeout(() => {
          show();
        }, 12000);
      }, 8000);
    };

    showTimer = window.setTimeout(() => {
      show();
    }, 3000);

    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, [installPrompt]);

  useEffect(() => {
    if (!showBanner) return;
    const hideTimer = window.setTimeout(() => setShowBanner(false), 12000);
    return () => window.clearTimeout(hideTimer);
  }, [showBanner]);

  useEffect(() => {
    const handleAppInstalled = () => {
      setShowBanner(false);
      setInstallPrompt(null);
      setIsInstalling(false);
    };

    window.addEventListener("appinstalled", handleAppInstalled);

    return () => window.removeEventListener("appinstalled", handleAppInstalled);
  }, []);

  const handleInstall = async () => {
    if (!installPrompt || isInstalling) return;

    setIsInstalling(true);

    try {
      await installPrompt.prompt();

      const result = await installPrompt.userChoice;

      if (result.outcome === "accepted") {
        setInstallPrompt(null);
        setShowBanner(false);
      }

      if (result?.outcome === "dismissed") {
        setShowBanner(false);
      }
    } catch (error) {
      console.error("PWA installation failed:", error);
    } finally {
      setIsInstalling(false);
    }
  };

  if (!installPrompt || !showBanner) return null;

  return (
    <AnimatePresence mode="wait">
      {installPrompt && showBanner && (
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
            scale: 0.94,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: 25,
            scale: 0.96,
          }}
          transition={{
            type: "spring",
            stiffness: 380,
            damping: 30,
            mass: 0.8,
          }}
          className="fixed bottom-2 md:bottom-4 lg:bottom-6 left-1/2 z-999 w-[calc(100%-2rem)] max-w-105 -translate-x-1/2"
        >
          <div className="relative flex items-center gap-4 overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/75 p-3 text-white shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
            <div className="pointer-events-none absolute -left-10 -top-10 size-32 rounded-full bg-amber-400/65 blur-2xl" />

            <motion.div
              initial={{
                rotate: -10,
                scale: 0.8,
              }}
              animate={{
                rotate: 0,
                scale: 1,
              }}
              transition={{
                delay: 0.15,
                type: "spring",
                stiffness: 400,
                damping: 18,
              }}
              className="relative flex size-12 shrink-0 items-center justify-center rounded-xl bg-amber-400 text-white"
            >
              {isDesktop && (
                <DesktopDownload
                  size={23}
                  weight="Filled"
                  className="drop-shadow-black/30 drop-shadow-md"
                />
              )}

              {isTablet && (
                <LaptopDownload
                  size={23}
                  weight="Filled"
                  className="drop-shadow-black/30 drop-shadow-md"
                />
              )}

              {isMobile && (
                <Download2
                  size={23}
                  weight="Filled"
                  className="drop-shadow-black/30 drop-shadow-md"
                />
              )}
            </motion.div>

            <div className="min-w-0 flex-1 pr-5">
              <h3 className="font-bilingual text-sm md:text-base font-semibold">
                Zubeen Da এপটো ইনষ্টল কৰক
              </h3>
            </div>

            <Button
              variant="ghost"
              type="button"
              onClick={handleInstall}
              disabled={isInstalling}
              className="shrink-0 rounded-xl bg-amber-400 px-4 py-4.5 text-sm font-poppins font-semibold text-black transition hover:bg-amber-300 active:scale-95  disabled:cursor-not-allowed disabled:opacity-60
          "
            >
              {isInstalling ? "Installing..." : "Install"}
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PWAInstall;
