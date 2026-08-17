import React, { useState, useRef } from "react";

export default function AudioProgressBar({
  progress,
  currentTime,
  duration,
  isPlaying,
  handleSeek,
  formatTime,
}) {
  const containerRef = useRef(null);

  const [hoverTime, setHoverTime] = useState(null);
  const [hoverPos, setHoverPos] = useState(0);

  const handleMouseMove = (e) => {
    if (!containerRef.current || !duration) return;

    const rect = containerRef.current.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));

    setHoverPos(pos * 100);
    setHoverTime(pos * duration);
  };

  const handleMouseLeave = () => setHoverTime(null);

  const formattedHover = hoverTime !== null ? formatTime(hoverTime) : null;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative flex-1 py-4 cursor-pointer select-none w-full"
    >
      {hoverTime !== null && (
        <div
          className="pointer-events-none absolute -top-7 -translate-x-1/2 rounded-md bg-neutral-900/90 px-2 py-0.5 text-[11px] font-mono font-semibold tracking-wider text-white shadow-xl backdrop-blur-md border border-white/10 transition-all duration-75"
          style={{ left: `${hoverPos}%` }}
        >
          {formattedHover?.m ?? "00"}:{formattedHover?.s ?? "00"}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-x-4 border-t-4 border-x-transparent border-t-neutral-900/90" />
        </div>
      )}

      <div className="relative h-2.5 w-full rounded-full bg-white/15 backdrop-blur-sm transition-all duration-300">
        {hoverTime !== null && (
          <div
            className="absolute left-0 top-0 h-full rounded-full bg-white/15 transition-all duration-75"
            style={{ width: `${hoverPos}%` }}
          />
        )}

        <div
          className="relative h-full rounded-full bg-linear-to-r from-amber-500 via-orange-500 to-rose-500 transition-[width] duration-100 ease-out"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>

      <div
        className="pointer-events-none absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${progress}%` }}
      >
        {isPlaying && (
          <>
            <span className="absolute -inset-2.5 rounded-full bg-orange-500/30 animate-ping" />
            <span className="absolute -inset-1.5 rounded-full bg-rose-500/40 animate-pulse" />
          </>
        )}

        <div className="absolute -inset-2 rounded-full bg-orange-500/30 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <span
          className={`relative block rounded-full border border-white/60 bg-white shadow-[0_0_12px_rgba(249,115,22,0.8)] transition-all duration-200 ${
            isPlaying
              ? "h-3.5 w-3.5 scale-110 group-hover:scale-125 bg-orange-400"
              : "h-3 w-3 scale-90 group-hover:scale-110 bg-neutral-200"
          }`}
        />
      </div>

      <input
        type="range"
        min="0"
        max={duration || 0}
        step="0.1"
        value={currentTime || 0}
        onChange={handleSeek}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
      />
    </div>
  );
}
