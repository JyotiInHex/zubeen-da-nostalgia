import React, { useEffect, useMemo, useRef, useState } from "react";
import YouTube from "react-youtube";
import { playLists } from "@/data/music-data";
import { formatTime } from "@/lib/formater";
import { useDispatch, useSelector } from "react-redux";
import { createShuffledQueue } from "@/lib/helper/shuffle";

import SlideInText from "@/shared/motion/SlideInText";
import SongTitle from "@/shared/motion/BlurInText";
import NextSong from "./next-song";
import MusicControllers from "./controller";
import AudioProgressBar from "./progressBar";
import useDeviceDetect from "@/hooks/useDeviceDetect";
import usePlayerProgress from "@/hooks/usePlayerProgress";

import {
  setCurrentIndex,
  setIsPlaying,
  setCurrentTime,
  setDuration,
  setCurrentPlaylist,
} from "../../../store/slices/playListSlice";

import {
  ClearMediaActions,
  SetMediaAction,
  SetMediaMetaData,
  SetMediaPlaybackState,
} from "@/lib/helper/mediaSession";

const MusicPlayer = () => {
  const dispatch = useDispatch();
  const { isDesktop, isMobile, isTablet } = useDeviceDetect();

  const playerRef = useRef(null);

  const { start, stop } = usePlayerProgress({
    playerRef,

    onTimeUpdate: ({ time, duration }) => {
      dispatch(setCurrentTime(time));
      dispatch(setDuration(duration));
    },
  });

  const [isLiked, setIsLiked] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [shuffledQueue, setShuffledQueue] = useState([]);

  const { playList, currentIndex, isPlaying, currentTime, duration } =
    useSelector((state) => state.player);

  const youtubeOptions = {
    width: "200",
    height: "200",

    playerVars: {
      fs: 0,
      rel: 0,
      controls: 0,
      autoplay:  1,
      disablekb: 1,
      playsinline: 1,
    },
  };

  const currentSong = playList[currentIndex];

  const upcomingSongs = useMemo(() => {
    if (!playList || playList.length <= 1) return [];

    if (isShuffle) {
      return shuffledQueue
        .slice(0, Math.min(shuffledQueue.length, 5))
        .map((idx) => playList[idx]);
    }

    return Array.from(
      { length: Math.min(playList.length - 1, 5) },
      (_, i) => playList[(currentIndex + i + 1) % playList.length],
    );
  }, [playList, currentIndex, isShuffle, shuffledQueue]);

  const remainTime = Math.max(0, (duration || 0) - (currentTime || 0));
  const { m: currentMinute, s: currentSecond } = formatTime(currentTime);
  const { m: remainMinute, s: remainSecond } = formatTime(remainTime);

  const progress =
    duration > 0 ? Math.min((currentTime / duration) * 100, 100) : 0;

  useEffect(() => {
    return () => stop();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const songId = params.get("song");
    const playlistId = params.get("playlist");

    if (playlistId) {
      const targetPlaylist = playLists.find(
        (playlist) => playlist.id === playlistId,
      );

      if (targetPlaylist && targetPlaylist.tracks.length > 0) {
        dispatch(setCurrentPlaylist(targetPlaylist.id));

        let trackIndex = 0;

        if (songId) {
          console.log(songId);

          const foundIndex = targetPlaylist.tracks.findIndex(
            (track) => track.musicId === songId,
          );

          if (foundIndex !== -1) {
            trackIndex = foundIndex;
          }
        }

        dispatch(setCurrentIndex(trackIndex));
        dispatch(setIsPlaying(false));

        return;
      }
    }

    if (songId) {
      for (const playlist of playLists) {
        const index = playlist.tracks.findIndex(
          (track) => track.musicId === songId,
        );

        if (index !== -1) {
          dispatch(setCurrentPlaylist(playlist.id));

          dispatch(setCurrentIndex(index));

          dispatch(setIsPlaying(false));

          return;
        }
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (!currentSong?.musicId) return;

    dispatch(setCurrentTime(0));
    dispatch(setDuration(0));
    setIsLiked(false);
  }, [currentSong?.musicId]);

  useEffect(() => {
    if (isShuffle && playList?.length > 1) {
      setShuffledQueue((prevQueue) => {
        const filtered = prevQueue.filter(
          (idx) => idx !== currentIndex && idx < playList.length,
        );

        if (filtered.length === 0) {
          return createShuffledQueue(playList.length, currentIndex);
        }

        return filtered;
      });
    } else {
      setShuffledQueue([]);
    }
  }, [isShuffle, playList?.length, currentIndex]);

  useEffect(() => {
    if (!currentSong) return;
    SetMediaMetaData(currentSong);
  }, [currentSong]);

  useEffect(() => {
    SetMediaPlaybackState(isPlaying);
  }, [isPlaying]);

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
      start();
    }

    if (event.data === 2) {
      dispatch(setIsPlaying(false));
      stop();
    }

    if (event.data === 0) {
      stop();

      if (isRepeat) {
        if (playerRef.current) {
          playerRef.current.seekTo(0, true);
          playerRef.current.playVideo();
        }
        return;
      }

      if (playList.length === 1) {
        if (playerRef.current) {
          playerRef.current.seekTo(0, true);
          playerRef.current.playVideo();
        }
        return;
      }

      // if (playList.length <= 1 && currentIndex === playList.length - 1) {
      //   dispatch(setCurrentTime(0));
      //   dispatch(setIsPlaying(false));
      //   return;
      // }

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
      if (shuffledQueue.length > 0) {
        nextIndex = shuffledQueue[0];
        setShuffledQueue((prev) => prev.slice(1));
      } else {
        const freshQueue = createShuffledQueue(playList.length, currentIndex);
        nextIndex = freshQueue[0] ?? 0;
        setShuffledQueue(freshQueue.slice(1));
      }
    } else {
      nextIndex = (currentIndex + 1) % playList.length;
    }

    dispatch(setCurrentIndex(nextIndex));
    dispatch(setIsPlaying(true));
    setIsLiked(false);
  };

  const handleSeek = (event) => {
    const value = Number(event.target.value);

    dispatch(setCurrentTime(value));

    if (playerRef.current) {
      playerRef.current.seekTo(value, true);
    }
  };

  useEffect(() => {
    SetMediaAction("play", () => {
      togglePlay();
    });

    SetMediaAction("pause", () => {
      togglePlay();
    });

    SetMediaAction("nexttrack", () => {
      handleNext();
    });

    SetMediaAction("previoustrack", () => {
      handlePrevious();
    });

    SetMediaAction("seekbackward", (details) => {
      if (!playerRef.current) return;

      const offset = details.seekOffset || 10;

      const newTime = Math.max(0, currentTime - offset);

      playerRef.current.seekTo(newTime, true);
    });

    SetMediaAction("seekforward", (details) => {
      if (!playerRef.current) return;

      const offset = details.seekOffset || 10;

      const newTime = Math.min(duration, currentTime + offset);

      playerRef.current.seekTo(newTime, true);
    });

    return () => ClearMediaActions();
  }, [currentTime, duration, togglePlay, handleNext, handlePrevious]);

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

      <div
        className={`relative grid h-full ${isDesktop ? "grid-cols-[1fr_40%] pb-20" : "grid-cols-1"}`}
      >
        <div
          className={`relative z-10 flex min-h-130 flex-col p-6 sm:p-8 lg:p-10 ${isDesktop ? "mt-auto" : "justify-center"}`}
        >
          <div className={`${isDesktop ? "mt-auto" : ""}`}>
            <SlideInText
              text={`এতিয়া শুনি আছে • ${currentSong.album.as} • ${currentSong.year.as}`}
              className={`${isDesktop ? "text-3xl pb-7  " : isTablet ? "text-2xl pb-4" : "text-lg pb-3"}`}
            />

            <SongTitle
              currentSong={currentSong}
              isLiked={isLiked}
              setIsLiked={setIsLiked}
            />
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
          />

          <div className={`flex flex-col items-center`}>
            <AudioProgressBar
              progress={progress}
              currentTime={currentTime}
              duration={duration}
              isPlaying={isPlaying}
              handleSeek={handleSeek}
              formatTime={formatTime}
            />

            <div className="flex items-center justify-between w-full">
              <h5
                className={`w-fit shrink-0 font-Doto font-black tabular-nums text-white drop-shadow-sm drop-shadow-black ${isDesktop ? "text-3xl" : isRepeat ? "text-2xl" : "text-xl"}`}
              >
                {currentMinute}
                <span className="animate-pulse-fast inline-block mx-px">:</span>
                {currentSecond}
              </h5>

              <h5
                className={`w-fit shrink-0 font-Doto font-black tabular-nums text-white drop-shadow-sm drop-shadow-black ${isDesktop ? "text-3xl" : isRepeat ? "text-2xl" : "text-xl"}`}
              >
                {remainMinute}
                <span className="animate-pulse-fast inline-block mx-px">:</span>
                {remainSecond}
              </h5>
            </div>
          </div>
        </div>

        {isDesktop && (
          <div className="relative">
            <NextSong
              songs={upcomingSongs}
              remainTime={`${remainMinute}:${remainSecond}`}
              onPlay={handleNext}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default MusicPlayer;
