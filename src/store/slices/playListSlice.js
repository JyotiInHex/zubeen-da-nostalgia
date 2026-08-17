import { playLists } from "@/data/music-data";
import { createSlice } from "@reduxjs/toolkit";

const initialPlaylist = playLists[0];

const initialState = {
  playList: initialPlaylist?.tracks ?? [],
  currentPlaylistId: initialPlaylist?.id ?? null,

  currentIndex: 0,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setCurrentIndex: (state, action) => {
      state.currentIndex = action.payload;
    },

    nextSong: (state) => {
      state.currentIndex = (state.currentIndex + 1) % state.playList.length;
    },

    prevSong: (state) => {
      state.currentIndex =
        (state.currentIndex - 1 + state.playList.length) %
        state.playList.length;
    },

    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },

    togglePlay: (state) => {
      state.isPlaying = !state.isPlaying;
    },

    setCurrentTime: (state, action) => {
      state.currentTime = action.payload;
    },

    setDuration: (state, action) => {
      state.duration = action.payload;
    },

    setCurrentPlaylist: (state, action) => {
      const playList = playLists.find((item) => item.id === action.payload);

      if (!playList) return;

      state.currentPlaylistId = playList.id;
      state.playList = playList.tracks;
      state.currentIndex = 0;
      state.isPlaying = true;
      state.currentTime = 0;
      state.duration = 0;
    },
  },
});

export const {
  setCurrentIndex,
  nextSong,
  prevSong,
  setIsPlaying,
  togglePlay,
  setCurrentTime,
  setDuration,
  setCurrentPlaylist,
} = playerSlice.actions;

export default playerSlice.reducer;
