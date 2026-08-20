const isMediaSessionSupported = () => {
  return typeof navigator !== "undefined" && "mediaSession" in navigator;
};

export const SetMediaMetaData = (song) => {
  if (!isMediaSessionSupported() || !song) return;

  const title = song.title.as || "Unknown Song";
  const artist = song.artist || "Unknown Artist";
  const album = song.album.as || "Unknown Album";

  const artwork = song.artwork;

  navigator.mediaSession.metadata = new MediaMetadata({
    title,
    artist,
    album,

    artwork: artwork
      ? [
          {
            src: artwork,
            sizes: "512x512",
            type: "image/webp",
          },
        ]
      : [],
  });
};

export const SetMediaPlaybackState = (isPlaying) => {
  if (!isMediaSessionSupported()) return;

  navigator.mediaSession.playbackState = isPlaying ? "playing" : "paused";
};

export const SetMediaAction = (action, handler) => {
  if (!isMediaSessionSupported()) return;

  try {
    navigator.mediaSession.setActionHandler(action, handler);
  } catch {
    console.log("Some browsers don't support");
  }
};

export const ClearMediaActions = () => {
  if (!isMediaSessionSupported()) return;

  const actions = [
    "play",
    "pause",
    "nexttrack",
    "previoustrack",
    "seekbackward",
    "seekforward",
  ];

  actions.forEach((action) => {
    try {
      navigator.mediaSession.setActionHandler(action, null);
    } catch {
      console.log("Ignore unsupported actions.")
    }
  });
};
