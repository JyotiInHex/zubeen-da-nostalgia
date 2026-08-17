import React from "react";
import Header from "./shared/header";
import MusicPlayer from "./shared/UI/music-player/player";
import defaultBg from "./assets/bg/scene-wide-13.webp";
import { useSelector } from "react-redux";

const App = () => {
  const { playList, currentIndex } = useSelector((state) => state.player);
  const currentSong = playList[currentIndex];

  console.log(playList)

  const bgImage = currentSong?.artwork || defaultBg;

  return (
    <main
      className="main-div px-10 py-7 select-none w-full h-screen overflow-hidden bg-cover! bg-center! bg-no-repeat! bg-fixed! flex flex-col"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <Header />

      <section className="w-full h-max flex-1 flex flex-col justify-end min-h-0">
        <MusicPlayer />
      </section>
    </main>
  );
};

export default App;
