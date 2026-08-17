export const formatTime = (seconds) => {
  if (seconds == null || Number.isNaN(Number(seconds)) || seconds < 0) {
    return { m: "00", s: "00" };
  }
  
  const minutes = Math.floor(seconds / 60);

  const remainingSeconds = Math.floor(seconds % 60);

  return {
    m: String(minutes).padStart(2, "0"),
    s: String(remainingSeconds).padStart(2, "0"),
  };
};
