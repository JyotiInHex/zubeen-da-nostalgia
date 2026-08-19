export const createShuffledQueue = (length, currentIdx) => {
  const indices = Array.from({ length }, (_, i) => i).filter(
    (i) => i !== currentIdx,
  );
  
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices;
};
