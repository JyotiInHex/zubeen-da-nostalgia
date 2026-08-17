import React from "react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";

import {
  Shuffle,
  SkipPrev,
  SkipNext,
  Play,
  Pause,
  Repeat,
  Heart,
} from "reicon-react";

const PARTICLES = [
  { id: 1, x: -44, y: -52, size: 18, rotate: -35, delay: 0 },

  { id: 2, x: 42, y: -50, size: 24, rotate: 30, delay: 0.02 },

  { id: 3, x: -62, y: -6, size: 15, rotate: -55, delay: 0.04 },

  { id: 4, x: 62, y: 0, size: 20, rotate: 50, delay: 0.01 },

  { id: 5, x: -38, y: 48, size: 16, rotate: -40, delay: 0.05 },

  { id: 6, x: 38, y: 52, size: 22, rotate: 45, delay: 0.03 },

  { id: 7, x: -60, y: 30, size: 14, rotate: -65, delay: 0.06 },

  { id: 8, x: 56, y: -30, size: 17, rotate: 60, delay: 0.03 },

  { id: 9, x: 0, y: -64, size: 20, rotate: 0, delay: 0.01 },

  { id: 10, x: 0, y: 58, size: 16, rotate: 15, delay: 0.04 },
];

const MusicControllers = ({
  isShuffle,
  setIsShuffle,

  isPlaying,
  togglePlay,

  handlePrevious,
  handleNext,

  isRepeat,
  setIsRepeat,

  isLiked,
  setIsLiked,
}) => {
  const smallButton =
    "group relative flex size-11 items-center justify-center rounded-full p-0 " +
    "border border-white/30 bg-white/40 text-black/70 backdrop-blur-sm " +
    "shadow-sm transition-all duration-200 ease-out " +
    "hover:scale-105 hover:bg-white/60 hover:shadow-md " +
    "active:scale-90";

  return (
    <div className="mb-7 flex items-center justify-center gap-2 sm:gap-3">
      <Button
        title={isShuffle ? "Disable shuffle" : "Enable shuffle"}
        variant="ghost"
        type="button"
        onClick={() => setIsShuffle((value) => !value)}
        className={`${smallButton} ${
          isShuffle
            ? "bg-amber-400 text-white shadow-md shadow-amber-400/30 hover:bg-amber-300"
            : ""
        }`}
      >
        <Shuffle
          className={`size-5! transition-transform duration-300 ${
            isShuffle ? "rotate-180" : "group-hover:rotate-12"
          }`}
          color="currentColor"
        />

        {isShuffle && (
          <span className="absolute bottom-1 size-1 rounded-full bg-white animate-pulse" />
        )}
      </Button>

      <Button
        title="Previous"
        variant="ghost"
        type="button"
        onClick={handlePrevious}
        className={smallButton}
      >
        <SkipPrev
          className="size-6! transition-transform duration-200 group-hover:-translate-x-0.5"
          color="currentColor"
          weight="Filled"
        />
      </Button>

      <Button
        title={isPlaying ? "Pause" : "Play"}
        variant="default"
        type="button"
        onClick={togglePlay}
        className="
          group relative flex size-16 items-center justify-center
          rounded-full border-0 p-0
          bg-amber-400 text-black
          shadow-lg shadow-amber-500/25
          transition-all duration-200 ease-out
          hover:scale-110 hover:bg-amber-300
          hover:shadow-xl hover:shadow-amber-500/30
          active:scale-90
        "
      >
        <span
          className={`absolute inset-0 rounded-full bg-amber-300/40 blur-md transition-all duration-500 ${
            isPlaying ? "scale-110 opacity-70" : "scale-100 opacity-0"
          }`}
        />

        <span
          className={`relative flex items-center justify-center transition-all duration-200 ${
            isPlaying ? "scale-100" : "scale-105"
          }`}
        >
          {isPlaying ? (
            <Pause className="size-7!" color="currentColor" weight="Filled" />
          ) : (
            <Play
              className="size-7! translate-x-0.5"
              color="currentColor"
              weight="Filled"
            />
          )}
        </span>

        {isPlaying && (
          <span className="absolute inset-0 rounded-full border-2 border-white/20 animate-pulse" />
        )}
      </Button>

      <Button
        title="Next"
        variant="ghost"
        type="button"
        onClick={handleNext}
        className={smallButton}
      >
        <SkipNext
          className="size-6! transition-transform duration-200 group-hover:translate-x-0.5"
          color="currentColor"
          weight="Filled"
        />
      </Button>

      <Button
        title={isRepeat ? "Disable repeat" : "Enable repeat"}
        variant="ghost"
        type="button"
        onClick={() => setIsRepeat((value) => !value)}
        className={`${smallButton} ${
          isRepeat
            ? "bg-amber-400 text-white shadow-md shadow-amber-400/30 hover:bg-amber-300"
            : ""
        }`}
      >
        <Repeat
          className={`size-5! transition-transform duration-500 ${
            isRepeat ? "rotate-180" : "group-hover:rotate-45"
          }`}
          color="currentColor"
        />

        {isRepeat && (
          <span className="absolute bottom-1 size-1 rounded-full bg-white animate-pulse" />
        )}
      </Button>

      <motion.button
        type="button"
        title={isLiked ? "Unlike" : "Like"}
        onClick={() => setIsLiked((value) => !value)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.85 }}
        className={`${smallButton} ${
          isLiked ? "text-rose-500 bg-white!" : "text-black hover:text-white"
        }`}
      >
        <AnimatePresence>
          {isLiked && (
            <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
              {PARTICLES.map((p) => (
                <motion.span
                  key={p.id}
                  initial={{
                    x: 0,
                    y: 0,
                    scale: 0,
                    opacity: 0,
                    rotate: 0,
                  }}
                  animate={{
                    x: [0, p.x * 0.7, p.x],
                    y: [0, p.y * 0.7, p.y],
                    scale: [0, 1.2, 0.2],
                    opacity: [0, 1, 0],
                    rotate: [0, p.rotate * 0.6, p.rotate],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                    delay: p.delay,
                  }}
                  className="absolute flex items-center justify-center text-current"
                  style={{ width: p.size, height: p.size }}
                >
                  <Heart
                    className="w-full h-full fill-current"
                    weight="Filled"
                  />
                </motion.span>
              ))}
            </span>
          )}
        </AnimatePresence>

        <motion.div
          animate={
            isLiked
              ? { scale: [1, 0.7, 1.35, 0.95, 1], rotate: [0, -12, 12, -4, 0] }
              : { scale: 1, rotate: 0 }
          }
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
          className="flex items-center justify-center "
        >
          <Heart
            className={`size-5! fill-current transition-colors `}
            weight={isLiked ? "Filled" : undefined}
          />
        </motion.div>
      </motion.button>
    </div>
  );
};

export default MusicControllers;
