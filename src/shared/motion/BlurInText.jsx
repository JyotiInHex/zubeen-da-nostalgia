import { motion } from "framer-motion";
import SlideInText from "./SlideInText";
import useDeviceDetect from "@/hooks/useDeviceDetect";
import LikeButton from "../UI/likeButton";

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
      className="max-w-4xl font-Byomgraphy font-normal text-6xl sm:text-7xl lg:text-8xl xl:text-9xl tracking-wide drop-shadow-lg drop-shadow-black"
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
  const { isDesktop, isTablet } = useDeviceDetect();

  return (
    <div>
      <BlurInText text={currentSong.title.as} />

      <div className="pb-5 md:pb-6 lg:pb-9 flex flex-wrap items-center gap-x-6">
        <SlideInText
          text={currentSong.title.eg}
          className={`${isDesktop ? "text-3xl" : isTablet ? "text-2xl" : "text-lg"} `}
        />

        {/* <LikeButton /> */}
      </div>
    </div>
  );
};

export default SongTitle;
