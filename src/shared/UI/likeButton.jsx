import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart } from "reicon-react";

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

const LikeButton = () => {
  const [isLiked, setIsLiked] = useState(false);

  const baseLikes = 0;
  const displayLikes = (isLiked ? baseLikes + 1 : baseLikes);

  return (
    <motion.button
      type="button"
      title={isLiked ? "Unlike" : "Like"}
      onClick={() => setIsLiked((value) => !value)}
      className={`relative w-auto h-auto p-1 px-2 bg-black/50 border border-black z-10 rounded-full flex items-center justify-center gap-2 outline-0`}
    >
      <AnimatePresence>
        {isLiked && (
          <span className="pointer-events-none absolute left-5 flex items-center justify-center text-rose-500 drop-shadow-black/75 drop-shadow-md">
            {PARTICLES.map((p) => {
              const distance = Math.hypot(p.x, p.y);
              const peakScale = 0.8 + Math.min(distance / 90, 1) * 0.5;

              return (
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
                    x: [0, p.x],
                    y: [0, p.y],
                    scale: [0, peakScale, 0.2],
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
              );
            })}
          </span>
        )}
      </AnimatePresence>

      <motion.div
        animate={
          isLiked
            ? {
                scale: [1, 0.7, 1.35, 0.95, 1],
                rotate: [0, -12, 12, -4, 0],
              }
            : { scale: 1, rotate: 0 }
        }
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
      >
        <Heart
          className={`size-6! fill-rose-500 transition-colors `}
          weight={isLiked ? "Filled" : undefined}
          color={isLiked && "oklch(64.5% 0.246 16.439)"}
        />
      </motion.div>

      <span className="font-semibold text-white text-sm xl:text-base font-bilingual">
        {displayLikes}
      </span>
    </motion.button>
  );
};

export default LikeButton;
