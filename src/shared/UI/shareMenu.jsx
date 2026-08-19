import React, { useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSelector } from "react-redux";
import {
  Check,
  Copy,
  ForwardRight,
  MusicNotes,
  Playlist5,
  Turntable,
} from "reicon-react";
import { playLists } from "@/data/music-data";
import useDeviceDetect from "@/hooks/useDeviceDetect";

const ShareMenu = ({ trigger, className }) => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isBusy, setIsBusy] = useState(false);

  const isSharingRef = useRef(false);

  const { isDesktop, isMobile, isTablet } = useDeviceDetect();

  const { playList, currentIndex, currentPlaylistId, isPlaying } = useSelector(
    (state) => state.player,
  );

  const currentSong = playList?.[currentIndex];

  const currentPlaylist = playLists.find(
    (playList) => playList.id === currentPlaylistId,
  );

  const createSongUrl = () => {
    if (!currentSong?.musicId) return null;

    const url = new URL(window.location.origin + window.location.pathname);
    url.searchParams.set("song", currentSong.musicId);

    return url.toString();
  };

  const createPlaylistUrl = () => {
    if (!currentPlaylist?.id) return null;

    const url = new URL(window.location.origin + window.location.pathname);
    url.searchParams.set("playlist", currentPlaylist.id);

    return url.toString();
  };

  const copyToClipboard = async (url) => {
    if (!url) return false;

    try {
      await navigator.clipboard.writeText(url);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);

      return true;
    } catch (error) {
      console.error("Clipboard failed:", error);

      return false;
    }
  };

  const shareContent = async ({ title, text, url }) => {
    if (!url) return;

    if (isSharingRef.current) return;

    isSharingRef.current = true;
    setIsBusy(true);

    try {
      if (
        typeof navigator !== "undefined" &&
        typeof navigator.share === "function"
      ) {
        try {
          await navigator.share({
            title,
            text,
            url,
          });

          return;
        } catch (error) {
          if (error?.name === "AbortError") {
            return;
          }
          console.warn("Native share unavailable:", error);
        }
      }

      const copiedSuccessfully = await copyToClipboard(url);

      if (!copiedSuccessfully) {
        window.prompt("Copy this link:", url);
      }
    } finally {
      isSharingRef.current = false;
      setIsBusy(false);
    }
  };

  const shareCurrentSong = () => {
    const url = createSongUrl();

    if (!currentSong || !url) {
      console.log("Something missing!!");
      return;
    }

    const songTitle = currentSong.title?.as || "Untitled Track";
    const albumName = currentSong.album?.as || currentSong.album?.eg;

    shareContent({
      title: songTitle,
      text: `Now playing "${songTitle}" ${albumName ? ` from the album "${albumName}"` : ""}. Listen now:`,
      url,
    });
  };

  const shareCurrentPlaylist = () => {
    const url = createPlaylistUrl();

    if (!currentPlaylist || !url) return;

    const playlistTitle = currentPlaylist.name || "Curated Playlist";
    const trackCount = currentPlaylist.tracks?.length || 0;

    shareContent({
      title: playlistTitle,
      text: `Explore the "${playlistTitle}"${trackCount ? ` — ${trackCount} tracks.` : "."} Stream the full playlist here:`,
      url,
    });
  };

  const shareWebsite = () => {
    const url = window.location.origin + window.location.pathname;

    shareContent({
      title: "Joi Zubeen Da | Music Archive & Tribute",
      text: "Discover and stream the curated musical tribute and discography honoring Zubeen Garg:",
      url,
    });
  };

  const copyCurrentSong = async () => {
    if (!currentSong?.musicId) return;

    const url =
      `${window.location.origin}` +
      `/?song=${encodeURIComponent(currentSong.musicId)}`;

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>

      <DropdownMenuContent
        sideOffset={10}
        align={isDesktop ? "end" : isMobile ? "center" : "end"}
        className="relative z-9999 w-84 rounded-3xl border border-white/10 bg-black/55 overflow-hidden p-2 text-white shadow-2xl backdrop-blur-2xl"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-lg text-white font-poppins font-medium">
            Share
          </DropdownMenuLabel>

          <div className="space-y-2">
            <DropdownMenuItem
              onClick={shareCurrentSong}
              className="group cursor-pointer rounded-xl px-3 py-3 text-white bg-black/34"
              title={`${currentSong?.title?.as} • ${currentSong?.album?.as}`}
            >
              <MusicNotes
                className={`mr-3 size-6 text-amber-400 ${isPlaying && "animate-bounce"}`}
              />

              <div className="min-w-0 flex-1">
                <p className="text-xs text-white/60 font-semibold">
                  Current song
                </p>

                <p className="truncate text-lg max-w-max text-white font-Noto-Serif">
                  {currentSong?.title?.as || "No song playing"} •{" "}
                  {currentSong?.album?.as || "No song playing"}
                </p>
              </div>

              <ForwardRight
                className="mr-3 size-6 text-amber-400 transition-transform duration-300 ease-out group-hover:translate-x-3 group-hover:rotate-20"
                weight={"Filled"}
              />
            </DropdownMenuItem>

            <DropdownMenuItem
              disabled={!currentPlaylist}
              onClick={shareCurrentPlaylist}
              className="group cursor-pointer rounded-xl px-3 py-3 text-white bg-black/34"
              title={`${currentPlaylist?.name}`}
            >
              <Playlist5 className="mr-3 size-6 text-amber-400" />

              <div className="min-w-0 flex-1">
                <p className="text-xs text-white/60 font-semibold">
                  Current playlist
                </p>

                <p className="truncate text-lg max-w-max text-white font-Noto-Serif">
                  {currentPlaylist?.name || "No playlist"}
                </p>
              </div>

              <ForwardRight
                className="mr-3 size-6 text-amber-400 transition-transform duration-300 ease-out group-hover:translate-x-3 group-hover:rotate-20"
                weight={"Filled"}
              />
            </DropdownMenuItem>

            <DropdownMenuItem
              disabled={isBusy}
              onClick={(event) => {
                event.preventDefault();
                shareWebsite();
              }}
              className="group cursor-pointer rounded-xl px-3 py-3 text-white bg-black/34"
            >
              <Turntable
                className="mr-3 size-6 text-amber-400 "
                weight="Filled"
              />

              <div className="min-w-0 flex-1">
                <p className="text-xs text-white/60 font-semibold">
                  Share website
                </p>

                <p className="truncate text-lg max-w-max text-white font-poppins font-semibold">
                  Zubeen Da
                </p>
              </div>

              <ForwardRight
                className="mr-3 size-6 text-amber-400 transition-transform duration-300 ease-out group-hover:translate-x-3 group-hover:rotate-20"
                weight={"Filled"}
              />
            </DropdownMenuItem>

            <DropdownMenuSeparator className="my-2 bg-white/10" />

            <div
              role="menuitem"
              tabIndex={0}
              onClick={(event) => {
                event.preventDefault();
                copyCurrentSong();
                setOpen(true);
              }}
              className="group cursor-pointer rounded-xl px-3 py-4 text-white bg-black/34 flex items-center"
            >
              {copied ? (
                <Check className="mr-3 size-5 text-green-400" />
              ) : (
                <Copy className="mr-3 size-5" weight="Filled" />
              )}

              <span className="font-poppins text-ab font-medium">
                {copied ? "Link copied" : "Copy current song link"}
              </span>
            </div>
          </div>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ShareMenu;
