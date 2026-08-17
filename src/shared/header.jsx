import React, { useEffect, useState } from "react";
import { Playlist5, Share, SignalStream } from "reicon-react";

import CustomTag from "./UI/tag";
import logoUrl from "../assets/svg/Logo.svg";
import PlaylistDrawer from "./UI/playlistDrawer";

const Header = () => {
  const [count, setCount] = useState(160);
  const [time, setTime] = useState("");

  // Dummy Live Listener Counter
  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => prev + Math.floor(Math.random() * 11) - 4);
    }, 1500);

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
    <header className="grid grid-cols-3 justify-between">
      <div className="flex items-center gap-6 mx-auto">
        <div className="flex gap-3">
          <SignalStream size={34} width={"filled"} color="#fff" />
          <div className="w-fit whitespace-nowrap">
            <h1 className="font-poppins font-medium text-white text-base">
              24/7 On Air
            </h1>
            <p className="font-poppins font-normal text-white text-xs">
              Legend Never Die
            </p>
          </div>
        </div>

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

      <figure className="relative z-10 flex flex-col items-center select-none">
        <img
          src={logoUrl}
          alt="Joi Zubeen Da"
          className="w-55 h-fit object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] brightness-110"
        />
      </figure>

      <div className="flex items-center gap-6 mx-auto">
        <CustomTag
          value={"YT Music"}
          onClick={() =>
            window.open(
              "https://music.youtube.com/",
              "_blank",
              "noopener,noreferrer",
            )
          }
          className={"cursor-pointer"}
          children={
            <img
              src="https://cdn.reicon.dev/logos/youtube-music/original.svg"
              alt="Youtube Music"
              width={22}
              height={22}
            />
          }
        />

        <PlaylistDrawer
          trigger={
            <CustomTag
              value={"Playlist"}
              className={"cursor-pointer"}
              children={<Playlist5 size={24} width={"filled"} color="white" />}
            />
          }
        />

        <CustomTag
          value={"Share"}
          // onClick={() =>
          //   window.open(
          //     "https://music.youtube.com/",
          //     "_blank",
          //     "noopener,noreferrer",
          //   )
          // }
          className={"cursor-pointer"}
          children={<Share size={18} width={"filled"} color="white" />}
        />
      </div>
    </header>
  );
};

export default Header;
