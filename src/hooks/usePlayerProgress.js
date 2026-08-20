import React, { useEffect, useRef } from "react";

const usePlayerProgress = ({ playerRef, onTimeUpdate }) => {
  const timerRef = useRef(null);

  const stop = () => {
    if (!timerRef.current) return;
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  const start = () => {
    stop();

    timerRef.current = setInterval(() => {
      if (!playerRef.current) return;

      const time = playerRef.current.getCurrentTime();
      const duration = playerRef.current.getDuration();

      onTimeUpdate({
        time: time || 0,
        duration: duration || 0,
      });
    }, 250);
  };

  useEffect(() => {
    return stop;
  }, []);

  return { start, stop };
};

export default usePlayerProgress;
