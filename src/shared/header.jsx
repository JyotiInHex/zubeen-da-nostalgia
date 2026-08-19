import React, { useEffect, useState } from "react";
import { Playlist5, Share, SignalStream } from "reicon-react";

import CustomTag from "./UI/tag";
import logoUrl from "../assets/svg/Logo.svg";
import PlaylistDrawer from "./UI/playlistDrawer";
import { useSelector } from "react-redux";
import ShareMenu from "./UI/shareMenu";
import useDeviceDetect from "@/hooks/useDeviceDetect";

const Header = () => {
  const [time, setTime] = useState("");
  const [count, setCount] = useState(Math.floor(Math.random() * 35) + 180);

  const { isDesktop, isMobile, isTablet } = useDeviceDetect();

  // Dummy Live Listener Counter
  useEffect(() => {
    const MIN_LISTENERS = 80;
    const MAX_LISTENERS = 999;

    const timer = setInterval(
      () => {
        setCount((prev) => {
          const random = Math.random();

          let change = 0;

          if (random < 0.55) {
            change = Math.floor(Math.random() * 3) - 1;
          } else if (random < 0.9) {
            change = Math.floor(Math.random() * 5) - 2;
          } else {
            change = Math.floor(Math.random() * 13) - 6;
          }

          const next = prev + change;

          return Math.min(MAX_LISTENERS, Math.max(MIN_LISTENERS, next));
        });
      },
      2200 + Math.random() * 1800,
    );

    return () => clearInterval(timer);
  }, []);

  // Live Clock (12-hour format with AM/PM)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }),
      );
    };

    updateTime();
    const clockTimer = setInterval(updateTime, 1000);
    return () => clearInterval(clockTimer);
  }, []);

  return (
    <header
      className={`z-10 w-full px-4 transition-all duration-300 ${isDesktop ? "grid grid-cols-3 items-center justify-between" : isTablet ? "flex flex-wrap items-center justify-between gap-4" : "flex flex-col items-center gap-5"}`}
    >
      <div
        className={`flex items-center flex-wrap justify-center ${isDesktop ? "justify-start gap-4 mx-0" : isTablet ? "gap-3" : "gap-2.5 w-full order-2"}`}
      >
        <div className="flex items-center gap-3">
          <SignalStream
            size={isMobile ? 28 : 34}
            weight={"Filled"}
            color="#fff"
          />
          <div className="w-fit whitespace-nowrap">
            <h1 className="font-poppins font-medium text-white text-base">
              24/7 On Air
            </h1>
            <p className="font-poppins font-normal text-white text-xs">
              Legend Never Die
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-nowrap shrink-0">
          <CustomTag
            value={`${count} জনে শুনি আছে`}
            className={"cursor-none"}
            children={
              <span className="relative flex h-3 w-3 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
              </span>
            }
          />

          <CustomTag value={time} className={"cursor-none"} />
        </div>
      </div>

      <figure
        className={`relative z-10 flex flex-col items-center select-none ${isMobile ? "order-1 w-full" : isTablet ? "order-first md:order-0" : ""}`}
      >
        <img
          src={logoUrl}
          alt="Joi Zubeen Da"
          className={`object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] brightness-110 ${isMobile ? "w-44" : isTablet ? "w-56" : "w-64"}`}
        />
      </figure>

      <div
        className={`flex items-center justify-center ${isDesktop ? "justify-end gap-4 mx-0" : isTablet ? "gap-3" : "gap-3 w-full order-2"}`}
      >
        <CustomTag
          value={isMobile ? "" : "Spotify"}
          onClick={() =>
            window.open(
              "https://open.spotify.com/playlist/5ie8i7ss6syVEhU7fgqD4n?si=8sqEylCHQO-HZxCn90Z4uQ",
              "_blank",
              "noopener,noreferrer",
            )
          }
          className={"cursor-pointer"}
          children={
            <img
              src="https://cdn.reicon.dev/logos/spotify/original.svg"
              alt="Spotify"
              width={20}
              height={20}
            />
          }
        />

        <PlaylistDrawer
          trigger={
            <CustomTag
              value={isMobile ? "" : "Playlist"}
              className={"cursor-pointer"}
              children={<Playlist5 size={24} weight="Filled" color="white" />}
            />
          }
        />

        <ShareMenu
          trigger={
            <CustomTag
              value={isMobile ? "" : "Share"}
              className={"cursor-pointer"}
              children={<Share size={18} weight="Filled" color="white" />}
            />
          }
        />
      </div>
    </header>
  );
};

export default Header;
