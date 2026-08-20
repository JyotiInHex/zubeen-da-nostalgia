import React from "react";
import Header from "./shared/header";
import MusicPlayer from "./shared/UI/music-player/player";
import defaultBg from "./assets/bg/scene-wide-13.webp";
import { useSelector } from "react-redux";
import useDeviceDetect from "./hooks/useDeviceDetect";
import { AnimatePresence, motion } from "framer-motion";
import PWAInstall from "./shared/PWAInstall";

const App = () => {
  const { playList, currentIndex } = useSelector((state) => state.player);
  const currentSong = playList[currentIndex];

  const bgImage = currentSong?.artwork;

  const { isMobile } = useDeviceDetect();

  return (
    <main
      className={`relative select-none w-full h-screen overflow-hidden bg-cover! bg-center! bg-no-repeat! bg-fixed! flex flex-col ${isMobile ? "px-0 pt-0" : "px-10"} py-7`}
      style={{
        backgroundImage: `url(${defaultBg})`,
      }}
    >
      <AnimatePresence mode="popLayout">
        <motion.div
          key={bgImage}
          initial={{
            clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
            scale: 1.2,
          }}
          animate={{
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            scale: 1,
          }}
          exit={{
            clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
            transition: { duration: 0.7, ease: [0.32, 0, 0.67, 0] },
          }}
          transition={{
            duration: 1.0,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="absolute inset-0 z-10 bg-cover bg-center bg-no-repeat pointer-events-none will-change-[clip-path,transform]"
          style={{
            backgroundImage: `url(${bgImage})`,
          }}
        />
      </AnimatePresence>

      <Header />

      <section className="w-full h-max flex-1 flex flex-col justify-end min-h-0 mt-auto">
        <MusicPlayer />
      </section>

      <PWAInstall/>
    </main>
  );
};

export default App;
