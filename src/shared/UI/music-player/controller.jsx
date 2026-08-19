import React from "react";
import { Button } from "@/components/ui/button";

import {
  Shuffle,
  SkipPrev,
  SkipNext,
  Play,
  Pause,
  Repeat,
  Heart,
} from "reicon-react";

const MusicControllers = ({
  isShuffle,
  setIsShuffle,

  isPlaying,
  togglePlay,

  handlePrevious,
  handleNext,

  isRepeat,
  setIsRepeat,
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
    </div>
  );
};

export default MusicControllers;
