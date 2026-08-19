import { motion } from "framer-motion";

const SlideInText = ({ text = "", className }) => {
  const segmenter = new Intl.Segmenter("as", {
    granularity: "grapheme",
  });

  const characters = Array.from(
    segmenter.segment(text),
    (item) => item.segment,
  );

  return (
    <motion.h5
      className="text-3xl"
      key={text}
      initial="hidden"
      animate="visible"
    >
      {characters.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          initial={{
            x: -30,
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
          }}
          transition={{
            delay: i * 0.035,
            duration: 0.3,
            ease: "easeOut",
          }}
          className={`inline-block font-bilingual-Byomgraphy drop-shadow-md drop-shadow-black/75 ${className}`}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.h5>
  );
};

export default SlideInText;
