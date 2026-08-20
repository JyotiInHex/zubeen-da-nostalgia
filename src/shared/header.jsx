import React, { useEffect, useState } from "react";
import { Menu, Playlist5, Share, SignalStream } from "reicon-react";

import CustomTag from "./UI/tag";
import logoUrl from "../assets/svg/Logo.svg";
import PlaylistDrawer from "./UI/playlistDrawer";
import ShareMenu from "./UI/shareMenu";
import useDeviceDetect from "@/hooks/useDeviceDetect";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const HeaderActions = ({ isMobile, isDesktop, isTablet }) => {
  return (
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
  );
};

const HeaderLiveInfo = ({ isMobile }) => {
  return (
    <div className="flex items-center gap-3">
      <SignalStream size={isMobile ? 28 : 34} weight={"Filled"} color="#fff" />
      <div className="w-fit whitespace-nowrap">
        <h1 className="font-poppins font-medium text-white text-base">
          24/7 On Air
        </h1>
        <p className="font-poppins font-normal text-white text-xs">
          Legend Never Die
        </p>
      </div>
    </div>
  );
};

const HeaderLiveTags = ({ count, time, isMobile }) => {
  return (
    <div
      className={`flex items-center gap-2 flex-nowrap shrink-0 ${isMobile && "flex-col items-start w-full"}`}
    >
      <CustomTag
        value={`${count} জনে শুনি আছে`}
        className={`cursor-none ${isMobile && "w-full"}`}
        children={
          <span className="relative flex h-3 w-3 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
          </span>
        }
      />

      <CustomTag
        value={time}
        className={`cursor-none ${isMobile && "w-full"}`}
      />
    </div>
  );
};

const Header = () => {
  const [time, setTime] = useState("");
  const [shareOpen, setShareOpen] = useState(false);
  const [playlistOpen, setPlaylistOpen] = useState(false);
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

  if (isDesktop) {
    return (
      <header className="z-10 grid w-full grid-cols-[1fr_auto_1fr] items-center px-4">
        <div className="flex items-center gap-4">
          <HeaderLiveInfo isMobile={false} />

          <HeaderLiveTags count={count} time={time} />
        </div>

        <figure className="justify-self-center">
          <img
            src={logoUrl}
            alt="Zubeen Da"
            className="w-64 object-contain brightness-110 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
          />
        </figure>

        <HeaderActions
          isMobile={false}
          isDesktop={isDesktop}
          isTablet={isTablet}
        />
      </header>
    );
  }

  if (isTablet) {
    return (
      <header className="z-10 grid grid-cols-[auto_1fr] w-full gap-10 px-4 pt-6">
        <figure className="w-fit">
          <img
            src={logoUrl}
            alt="Zubeen Da"
            className="w-52 object-contain brightness-110 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
          />
        </figure>

        <div className="flex flex-wrap items-center justify-end">
          <div className="flex gap-5">
            <HeaderLiveInfo isMobile={false} />

            <HeaderLiveTags count={count} time={time} />
          </div>

          <HeaderActions
            isMobile={false}
            isDesktop={isDesktop}
            isTablet={isTablet}
          />
        </div>
      </header>
    );
  }

  return (
    <>
      <header
        className={`relative z-20 flex w-full items-center justify-between px-2`}
      >
        <figure className={`select-none`}>
          <img
            src={logoUrl}
            alt="Zubeen Da"
            className={`w-40 object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]`}
          />
        </figure>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-black/30 text-white outline-none backdrop-blur-xl transition-all hover:bg-white/10 active:scale-95"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            sideOffset={20}
            className="z-9999 w-75 rounded-3xl border border-white/10 bg-zinc-950/20 p-2 text-white shadow-2xl backdrop-blur-2xl"
          >
            <div className="py-3">
              <HeaderLiveTags count={count} time={time} isMobile={isMobile} />
            </div>

            <DropdownMenuSeparator className="my-3 bg-white/10" />

            <DropdownMenuGroup>
              <div className="space-y-2">
                <DropdownMenuItem
                  className="group cursor-pointer rounded-xl px-3 py-2.5 text-white bg-black/34 place-content-center"
                  onClick={() =>
                    window.open(
                      "https://open.spotify.com/playlist/5ie8i7ss6syVEhU7fgqD4n",
                      "_blank",
                      "noopener,noreferrer",
                    )
                  }
                >
                  <img
                    src="https://cdn.reicon.dev/logos/spotify/original.svg"
                    alt="Spotify"
                    width={22}
                    height={22}
                    className="mr-1 drop-shadow-zinc-600/40 drop-shadow-sm"
                  />
                  <span className="text-sm font-bilingual">Spotify</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="group cursor-pointer rounded-xl px-3 py-2.5 text-white bg-black/34 place-content-center"
                  onClick={(event) => {
                    event.preventDefault();

                    setPlaylistOpen(true);
                  }}
                >
                  <Playlist5 weight="Filled" className="size-5 mr-1.5" />
                  <span className="text-sm font-bilingual">Playlist</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="group cursor-pointer rounded-xl px-3 py-2.5 text-white bg-black/34 place-content-center"
                  onClick={(event) => {
                    event.preventDefault();
                    setShareOpen(true);
                  }}
                >
                  <Share size={20} weight="Filled" className="size-5 mr-1.5" />
                  <span className="text-sm font-bilingual">Share</span>
                </DropdownMenuItem>
              </div>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <PlaylistDrawer
        open={playlistOpen}
        onOpenChange={setPlaylistOpen}
        trigger={<span className="hidden" />}
      />

      <ShareMenu
        open={shareOpen}
        onOpenChange={setShareOpen}
        trigger={<span className="hidden" />}
      />
    </>
  );
};

export default Header;
