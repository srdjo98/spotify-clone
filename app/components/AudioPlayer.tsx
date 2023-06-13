"use client";

import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import { useEffect, useRef, useState } from "react";

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState(0);

  const audioPlayer = useRef<HTMLAudioElement>(null);
  const progressBar = useRef<any>(null);
  const animationRef = useRef<any>(null);

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current?.currentTime;
    progressBar.current.style.setProperty(
      "--seek-before-width",
      `${(progressBar.current.value / duration) * 100}%`
    );
    setCurrentTime(progressBar.current.value);
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      audioPlayer.current?.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current?.pause();
      cancelAnimationFrame(animationRef.current);
    }
  };

  const handleRange = () => {
    audioPlayer.current!.currentTime = progressBar.current.value;
    progressBar.current.st;
    setCurrentTime(progressBar.current.value);
  };

  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current?.duration!);
    setDuration(seconds);
    progressBar.current.max = seconds;
  }, [
    audioPlayer?.current?.onloadedmetadata,
    audioPlayer?.current?.readyState,
  ]);

  const calculateTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 0 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 0 ? `0${seconds}` : `${seconds}`;

    return `${returnedMinutes} : ${returnedSeconds}`;
  };

  return (
    <div className="fixed bottom-0 w-[85%] flex border border-gray-600 bg-slate-500 justify-center p-3 flex-nowrap">
      <audio ref={audioPlayer} src="/audio/example.mp3" />
      <div className="mt-2 pr-9">
        <SkipPreviousIcon fontSize="large" />
        <button onClick={handlePlayPause}>
          {isPlaying ? (
            <PauseIcon fontSize="large" />
          ) : (
            <PlayArrowIcon fontSize="large" />
          )}
        </button>
        <SkipNextIcon fontSize="large" />
      </div>
      <div className="flex w-[30%] justify-between">
        <div className="pt-6 text-[14px] pr-5 text-gray-300 font-bold">
          {calculateTime(currentTime)}
        </div>
        <div className="text-center w-[75%]">
          <div>Dua Lipa - Levitating</div>
          <input
            type="range"
            className="accent-green-500 w-full"
            defaultValue="0"
            ref={progressBar}
            onChange={handleRange}
          />
        </div>
        <div className="pt-6 text-[14px] pl-5 text-gray-300 font-bold">
          {duration && !isNaN(duration) && calculateTime(duration)}
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
