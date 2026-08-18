import { Button } from "@/components/ui/button";
import React from "react";
import { useSelector } from "react-redux";
import { MusicNoteSparkle, Play } from "reicon-react";
import { AnimatePresence, motion } from "framer-motion";

const getSongData = (song) => ({
  title: song?.title?.as || song?.title || "Unknown Song",
  album: song?.album?.as || "Unknown album",
  year: song?.year?.as || "",
  artwork: song?.artwork,
});

const NextSong = ({ songs = [], onPlay, remainTime }) => {
  const isPlaying = useSelector((state) => state.player.isPlaying);

  if (!songs.length) return null;

  const stack = songs.slice(0, 4);

  return (
    <div className="absolute right-6 bottom-6 z-30 h-32 w-98">
      <AnimatePresence initial={false}>
        {stack.map((song, index) => {
          const { title, album, year, artwork } = getSongData(song);
          const isFront = index === 0;

          return (
            <motion.div
              key={song.musicId}
              className="absolute inset-x-0 top-0"
              initial={{ y: 60, opacity: 0, scale: 0.85, rotate: 0 }}
              animate={{
                x: 0,
                y: index * -18,
                scale: 1 - index * 0.045,
                opacity: 1,
                rotate: 0,
              }}
              exit={{
                x: -260,
                y: -30,
                rotate: 12,
                opacity: 0,
                scale: 0.65,
                transition: {
                  duration: 0.67,
                  ease: [0.32, 0, 0.67, 0],
                },
              }}
              transition={{
                type: "spring",
                stiffness: 320,
                damping: 26,
                mass: 0.8,
                delay: isFront ? 0 : index * 0.03,
              }}
              style={{
                zIndex: 30 - index,
                transformOrigin: "top center",
              }}
            >
              <div
                className={`overflow-hidden rounded-2xl border border-white/10 bg-black/55 p-3 text-white shadow-2xl backdrop-blur-xl ${!isFront ? "pointer-events-none" : ""}`}
              >
                {isFront && (
                  <div className="mb-4 flex items-center justify-between px-1">
                    <div className="flex items-center gap-2">
                      <p className="font-Noto-Serif text-lg font-medium leading-3 tracking-wide text-white/70">
                        আগন্তুক পৰৱৰ্তী
                      </p>

                      <p className="font-poppins text-sm font-bold tracking-wider text-white/45">
                        {remainTime}
                      </p>
                    </div>

                    <div className="flex h-7 items-center gap-0.5">
                      {[3, 7, 12, 6, 10, 15, 8, 4, 9, 5].map((height, i) => (
                        <span
                          key={i}
                          className="w-1 rounded-full bg-white/45"
                          style={{
                            height: `${height}px`,
                          }}
                        />
                      ))}

                      <span className="ml-1 h-2 w-2 rounded-full bg-red-400 animate-pulse" />
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-white/10">
                    {artwork ? (
                      <img
                        src={artwork}
                        alt={title}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-white/40">
                        <MusicNoteSparkle size={30} weight="Filled" />
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-Noto-Serif text-xl font-medium text-white">
                      {title}
                    </h3>

                    <p className="mt-1 truncate font-Noto-Serif text-base font-medium tracking-wide text-white/50">
                      {album} • {year}
                    </p>
                  </div>

                  {isFront && (
                    <Button
                      title="Play"
                      variant="default"
                      type="button"
                      onClick={onPlay}
                      className="group relative flex size-16 shrink-0 items-center justify-center rounded-full border-0 p-0 bg-amber-400 text-black shadow-lg shadow-amber-500/25 transition-transform duration-200 hover:scale-110 hover:bg-amber-300 active:scale-90"
                    >
                      <span
                        className={`absolute inset-0 rounded-full bg-amber-300/40 blur-md transition-all duration-500 ${isPlaying ? "scale-110 opacity-70" : "scale-100 opacity-0"}`}
                      />

                      <Play
                        className="relative size-7! translate-x-0.5"
                        color="currentColor"
                        weight="Filled"
                      />
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default NextSong;
