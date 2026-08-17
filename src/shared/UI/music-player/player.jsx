import React, { useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";
import { formatTime } from "@/lib/formater";
import { useDispatch, useSelector } from "react-redux";

import SlideInText from "@/shared/motion/SlideInText";
import SongTitle from "@/shared/motion/BlurInText";

import MusicControllers from "./controller";
import AudioProgressBar from "./progressBar";

import {
  setCurrentIndex,
  setIsPlaying,
  setCurrentTime,
  setDuration,
} from "../../../store/slices/playListSlice";

const MusicPlayer = () => {
  const dispatch = useDispatch();
  const playerRef = useRef(null);
  const progressTimerRef = useRef(null);

  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const { playList, currentIndex, isPlaying, currentTime, duration } =
    useSelector((state) => state.player);

  const currentSong = playList[currentIndex];

  const remainTime = Math.max(0, (duration || 0) - (currentTime || 0));

  const { m: currentMinute, s: currentSecond } = formatTime(currentTime);
  const { m: remainMinute, s: remainSecond } = formatTime(remainTime);

  const youtubeOptions = {
    width: "200",
    height: "200",

    playerVars: {
      fs: 0,
      rel: 0,
      controls: 0,
      autoplay: 0,
      disablekb: 1,
      playsinline: 1,
    },
  };

  const startProgressTimer = () => {
    stopProgressTimer();

    progressTimerRef.current = setInterval(() => {
      if (!playerRef.current) return;

      const time = playerRef.current.getCurrentTime();
      const total = playerRef.current.getDuration();

      dispatch(setCurrentTime(time || 0));
      dispatch(setDuration(total || 0));
    }, 250);
  };

  const stopProgressTimer = () => {
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
      progressTimerRef.current = null;
    }
  };

  useEffect(() => {
    return () => stopProgressTimer();
  }, []);

  const handleReady = (event) => {
    playerRef.current = event.target;

    const total = event.target.getDuration();

    dispatch(setDuration(total || 0));

    if (isPlaying) {
      event.target.playVideo();
    }
  };

  const handleStateChange = (event) => {
    if (event.data === 1) {
      dispatch(setIsPlaying(true));
      startProgressTimer();
    }

    if (event.data === 2) {
      dispatch(setIsPlaying(false));
      stopProgressTimer();
    }

    if (event.data === 0) {
      stopProgressTimer();
      handleNext();
    }
  };

  const togglePlay = () => {
    if (!playerRef.current) return;

    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  const handlePrevious = () => {
    if (!playList.length) return;

    if (currentTime > 5 && playerRef.current) {
      playerRef.current.seekTo(0, true);
      return;
    }

    let previousIndex = (currentIndex - 1 + playList.length) % playList.length;

    dispatch(setCurrentIndex(previousIndex));
    dispatch(setIsPlaying(true));
    setIsLiked(false);
  };

  const handleNext = () => {
    if (!playList.length) return;

    let nextIndex;

    if (isRepeat) {
      nextIndex = currentIndex;
    } else if (isShuffle && playList.length > 1) {
      do {
        nextIndex = Math.floor(Math.random() * playList.length);
      } while (nextIndex === currentIndex);
    } else {
      nextIndex = (currentIndex + 1) % playList.length;
    }

    dispatch(setCurrentIndex(nextIndex));
    dispatch(setIsPlaying(true));
    setIsLiked(false);
  };

  useEffect(() => {
    if (!currentSong?.musicId) return;

    dispatch(setCurrentTime(0));
    dispatch(setDuration(0));
    setIsLiked(false);
  }, [currentSong?.musicId]);

  const handleSeek = (event) => {
    const value = Number(event.target.value);

    dispatch(setCurrentTime(value));

    if (playerRef.current) {
      playerRef.current.seekTo(value, true);
    }
  };

  const progress =
    duration > 0 ? Math.min((currentTime / duration) * 100, 100) : 0;

  if (!currentSong) {
    return (
      <section className="relative w-full h-full flex flex-col justify-end text-white select-none">
        <div className="flex flex-col items-start gap-3 pl-4 pb-14">
          <h4 className="text-2xl text-right font-normal text-white/55 font-Noto-Serif">
            কোনো গীত পোৱা নগল
          </h4>

          <h1 className="text-right text-6xl lg:text-7xl font-normal font-Byomgraphy tracking-wide text-white/60">
            গীত বাছনি কৰক <br />
          </h1>
          <p className="text-2xl font-Noto-Serif font-normal text-white/40">
            গীত বজাবলৈ এটা প্লেলিষ্ট নিৰ্ব্বাচন কৰক
          </p>
        </div>
      </section>
    );
  }
  
  return (
    <section className="relative flex flex-col justify-end w-full h-fit overflow-hidden text-white">
      <div className="pointer-events-none absolute -left-2499.75 top-0 h-50 w-50 overflow-hidden opacity-0">
        <YouTube
          key={currentSong?.musicId}
          videoId={currentSong?.musicId}
          opts={youtubeOptions}
          onReady={handleReady}
          onStateChange={handleStateChange}
        />
      </div>

      <div className="grid grid-cols-[1fr_40%] mt-auto h-full pb-20">
        <div className="relative z-10 flex min-h-130 flex-col p-6 sm:p-8 lg:p-10">
          <div className="mt-auto pb-16">
            <SlideInText
              text={`এতিয়া শুনি আছে • ${currentSong.album.as} • ${currentSong.year.as}`}
            />

            <SongTitle currentSong={currentSong} />
          </div>

          <MusicControllers
            isShuffle={isShuffle}
            setIsShuffle={setIsShuffle}
            isPlaying={isPlaying}
            togglePlay={togglePlay}
            handlePrevious={handlePrevious}
            handleNext={handleNext}
            isRepeat={isRepeat}
            setIsRepeat={setIsRepeat}
            isLiked={isLiked}
            setIsLiked={setIsLiked}
          />

          <div className="flex items-center gap-3">
            <h5 className="w-fit shrink-0 text-3xl font-Doto font-black tabular-nums text-white/85">
              {currentMinute}
              <span className="animate-pulse-fast inline-block mx-px">:</span>
              {currentSecond}
            </h5>

            <AudioProgressBar
              progress={progress}
              currentTime={currentTime}
              duration={duration}
              isPlaying={isPlaying}
              handleSeek={handleSeek}
              formatTime={formatTime}
            />

            <h5 className="w-fit shrink-0 text-3xl font-Doto font-black tabular-nums text-white/85">
              {remainMinute}
              <span className="animate-pulse-fast inline-block mx-px">:</span>
              {remainSecond}
            </h5>
          </div>
        </div>

        <div>HI</div>
      </div>
    </section>
  );
};

export default MusicPlayer;
