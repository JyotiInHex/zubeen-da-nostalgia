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
  setCurrentPlaylist,
} from "../../../store/slices/playListSlice";
import { playLists } from "@/data/music-data";

import vinyl from "../../../assets/img/vinyl-disc.png";
import NextSong from "./next-song";

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
  const nextSong =
    playList.length > 1 ? playList[(currentIndex + 1) % playList.length] : null;

  const upcomingSongs = playList.length
    ? Array.from(
        { length: Math.min(playList.length - 1, 3) },
        (_, i) => playList[(currentIndex + i + 1) % playList.length],
      )
    : [];

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const songId = params.get("song");
    const playlistId = params.get("playlist");

    if (playlistId) {
      // handle playlist later
    }

    if (songId) {
      for (const playlist of playLists) {
        const index = playlist.tracks.findIndex(
          (track) => track.musicId === songId,
        );

        if (index !== -1) {
          dispatch(setCurrentPlaylist(playlist.id));

          dispatch(setCurrentIndex(index));

          // Shared links must start paused.
          dispatch(setIsPlaying(false));

          return;
        }
      }
    }
  }, [dispatch]);

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
    const player = playerRef.current;

    if (!player) return;

    const playerState = player.getPlayerState();

    if (playerState === 1) {
      player.pauseVideo();
      return;
    }

    if (playerState === 0) {
      player.seekTo(0, true);
      player.playVideo();
      return;
    }

    player.playVideo();
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
    if (!playList.length) {
      dispatch(setIsPlaying(false));
      return;
    }

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

  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;

    const rpm = 33.333;
    const degreesPerSecond = (rpm * 360) / 60;

    let animationFrame;
    let lastTime = performance.now();

    const animate = (now) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      setRotation((prev) => (prev + degreesPerSecond * delta) % 360);

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isPlaying]);

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

      <div className="relative  grid grid-cols-[1fr_40%] mt-auto h-full pb-20">
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

        <div className="relative flex items-center justify-end p-6 overflow-hidden ">
          {/* <figure className="absolute w-64 h-64 sm:w-80 sm:h-80 xl:w-175 xl:h-175 shrink-0 drop-shadow-2xl translate-x-75">
            <img
              src={vinyl}
              alt="vinyl"
              className="w-full h-full object-contain rounded-full "
              style={{
                transform: `rotate(${rotation}deg)`,
                willChange: "transform",
              }}
            />
          </figure> */}

          <NextSong
            songs={upcomingSongs}
            remainTime={`${remainMinute}:${remainSecond}`}
            onPlay={handleNext}
          />
        </div>
      </div>
    </section>
  );
};

export default MusicPlayer;
