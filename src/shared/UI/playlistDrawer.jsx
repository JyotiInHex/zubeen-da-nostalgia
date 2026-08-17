import React, { useState } from "react";
import { setCurrentPlaylist } from "@/store/slices/playListSlice";
import { useDispatch, useSelector } from "react-redux";
import { playLists } from "@/data/music-data";
import { Playlist4, Soundwave, Vinyl2 } from "reicon-react";
import { Button } from "@/components/ui/button";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import SlideInText from "../motion/SlideInText";

const PlaylistDrawer = ({ trigger }) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const { currentPlaylistId, isPlaying } = useSelector((state) => state.player);

  const handlePlaylistChange = (playlistId) => {
    dispatch(setCurrentPlaylist(playlistId));
    // setOpen(false);
  };

  return (
    <Drawer swipeDirection="right" open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild className="outline-0!">
        {trigger}
      </DrawerTrigger>

      <DrawerContent
        className={`fixed! left-auto! right-4! top-5! bottom-5! h-auto! w-100! max-w-[calc(100vw-40px)]! rounded-[28px]! border! border-white/10! bg-black/55! p-0! text-white! shadow-2xl! backdrop-blur-2xl! outline-0! overflow-hidden ${!open && "opacity-0 transition-all"}`}
      >
        <div className="px-2 h-full flex flex-col">
          <DrawerHeader className="px-6 pt-6 text-left select-none!">
            <DrawerTitle className="text-2xl font-bold font-Noto-Serif tracking-tight text-white">
              প্লেলিষ্ট
            </DrawerTitle>
            <DrawerDescription className="mt-1 text-lg font-Noto-Serif font-normal text-neutral-400">
              শুনিবলৈ এটা প্লেলিষ্ট বাছক।
            </DrawerDescription>
          </DrawerHeader>

          <div className="mt-4 h-full space-y-3 overflow-y-auto px-3 pb-5 scrollbar-none">
            {playLists.map((playList) => {
              const isActive = currentPlaylistId === playList.id;

              return (
                <div key={playList.id}>
                  <Button
                    variant="secondary"
                    type="button"
                    onClick={() => handlePlaylistChange(playList.id)}
                    className={`relative flex w-full h-fit items-center gap-4 rounded-2xl p-4 text-left transition-all hover:scale-96 overflow-hidden bg-linear-to-br ${isActive ? "from-amber-400 to-amber-600 text-black hover:bg-amber-300" : "bg-white/5 text-white hover:bg-white/10"}
                    ${isActive && "pointer-events-none"}
                `}
                  >
                    <div
                      className={`flex w-13 h-13 shrink-0 items-center justify-center rounded-xl ${isActive ? "bg-white/20" : "bg-white/10"}`}
                    >
                      {isActive && isPlaying ? (
                        <Vinyl2 className="size-7 animate-spin" />
                      ) : (
                        <Playlist4 className="size-7" />
                      )}
                    </div>

                    <div className="flex w-full min-w-0 items-start justify-between">
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-xl text-white font-semibold font-bilingual max-w-max h-fit">
                          {playList.name}
                        </h3>

                        <h5
                          className={`mt-1 text-base font-bilingual ${isActive ? "text-white/60 font-semibold" : "text-white/40"}`}
                        >
                          {playList.year}
                        </h5>
                      </div>

                      {isActive && (
                        <div className="flex items-center gap-1">
                          <Soundwave size={12} color="white" />
                          <span className="font-poppins font-normal text-white">
                            Playing
                          </span>
                        </div>
                      )}
                    </div>

                    <span
                      className={`absolute -bottom-1.5 -right-1 text-5xl font-Doto font-semibold ${isActive ? "text-black/60" : "text-muted-foreground"}`}
                    >
                      {playList.tracks.length.toString().padStart(2, "0")}
                    </span>
                  </Button>
                </div>
              );
            })}
          </div>

          <DrawerFooter className={"flex flex-col gap-2.5 pt-5"}>
            <DrawerClose asChild>
              <Button
                variant="secondary"
                type="button"
                className="w-full rounded-xl bg-white/10 px-4 py-5 text-white text-lg font-Noto-Serif font-normal hover:bg-white/15 cursor-pointer"
              >
                বন্ধ কৰা
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default PlaylistDrawer;
