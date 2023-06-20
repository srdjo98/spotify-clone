export const calculateTime = (secs: number) => {
  const minutes = Math.floor(secs / 60);
  const returnedMinutes = minutes < 0 ? `0${minutes}` : `${minutes}`;
  const seconds = Math.floor(secs % 60);
  const returnedSeconds = seconds < 0 ? `0${seconds}` : `${seconds}`;

  return `${returnedMinutes} : ${returnedSeconds}`;
};
