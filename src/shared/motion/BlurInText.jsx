import { motion } from "framer-motion";
import SlideInText from "./SlideInText";

export const BlurInText = ({ text = "" }) => {
  const segmenter = new Intl.Segmenter("as", {
    granularity: "grapheme",
  });

  const characters = Array.from(
    segmenter.segment(text),
    (item) => item.segment,
  );

  return (
    <motion.h1
      className="max-w-4xl font-Byomgraphy font-normal text-5xl tracking-wide sm:text-6xl lg:text-8xl"
      key={text}
    >
      {characters.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          initial={{
            opacity: 0,
            filter: "blur(10px)",
            y: 15,
          }}
          animate={{
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
          }}
          transition={{
            delay: i * 0.05,
            duration: 0.6,
            ease: "easeOut",
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.h1>
  );
};

const SongTitle = ({ currentSong }) => {
  return (
    <div>
      <div className="overflow-hidden py-8 px-3">
        <BlurInText text={currentSong.title.as} />
      </div>

      <div className="overflow-hidden px-3">
        <SlideInText text={currentSong.title.eg} />
      </div>
    </div>
  );
};

export default SongTitle;
