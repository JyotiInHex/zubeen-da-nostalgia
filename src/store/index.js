import { configureStore } from "@reduxjs/toolkit";

import playerReducer from "./slices/playListSlice";

export const store = configureStore({
  reducer: {
    player: playerReducer,
  },
});
