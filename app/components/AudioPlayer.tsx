"use client";

import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import { useEffect, useRef, useState } from "react";
import { useAudioPlayer } from "../contexts/audioPlayerContext";
import { useModel } from "../contexts/modalContext";
import { calculateTime } from "../utils/calculations";
import AdModal from "./Modal/AdModal";

const AudioPlayer = () => {
  const { isOpen, setDisabled, skipCount, song } = useAudioPlayer();
  const { onOpen, type, setType } = useModel();
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
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

  const handleRange = () => {
    audioPlayer.current!.currentTime = progressBar.current.value;
    progressBar.current.st;
    setCurrentTime(progressBar.current.value);
  };

  useEffect(() => {
    if (progressBar.current) {
      progressBar.current.value = 0;
    }
    setCurrentTime(0);

    if (skipCount > 9) {
      setDisabled();
      setType("ad");
      onOpen();
      song.setCurrent({
        title: "KFC AD",
        imageUrl: "kfc.jpeg",
        description: "New Chicken KFC",
        audioUrl: "ad.mp3",
        id: "1",
        duration: "2:30",
        album: {
          id: "",
          title: "",
          description: "",
          imageUrl: null,
        },
      });
      song.onPlay();
    }
  }, [skipCount]);

  useEffect(() => {
    if (song.isPlaying) {
      audioPlayer.current?.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current?.pause();
      cancelAnimationFrame(animationRef.current);
      song.onPause();
    }
  }, [song.isPlaying]);

  const onDurationChangeHandler = () => {
    const seconds = Math.floor(audioPlayer.current?.duration!);
    setDuration(seconds);
    if (progressBar.current) {
      progressBar.current.max = seconds;
    }
  };

  return (
    <>
      {type === "ad" && <AdModal song={song.current!} />}
      {isOpen && (
        <div className="fixed bottom-0 w-[85%] flex border border-gray-600 bg-slate-500 justify-center p-3 flex-nowrap">
          <audio
            ref={audioPlayer}
            src={`/audio/${song.current?.audioUrl}`}
            onDurationChange={onDurationChangeHandler}
          />
          <div className="mt-2 pr-9">
            <button
              disabled={song.isDisabled}
              onClick={song.onPrev}
              className={`${song.isDisabled ? "text-gray-700" : "text-white"}`}
            >
              <SkipPreviousIcon
                fontSize="large"
                className={`${
                  song.isDisabled ? "cursor-not-allowed" : "cursor-pointer"
                }`}
              />
            </button>
            <button
              onClick={song.onPlay}
              disabled={song.isDisabled}
              className={`${song.isDisabled ? "text-gray-700" : "text-white"}`}
            >
              {song.isPlaying ? (
                <PauseIcon fontSize="large" />
              ) : (
                <PlayArrowIcon fontSize="large" />
              )}
            </button>
            <button
              disabled={song.isDisabled}
              onClick={song.onNext}
              className={`${song.isDisabled ? "text-gray-700" : "text-white"}`}
            >
              <SkipNextIcon
                fontSize="large"
                className={`${
                  song.isDisabled ? "cursor-not-allowed" : "cursor-pointer"
                }`}
              />
            </button>
          </div>
          <div className="flex w-[35%] justify-between">
            <div className="pt-6 text-[14px] pr-5 text-gray-300 font-bold">
              {calculateTime(currentTime)}
            </div>
            <div className="text-center w-[75%]">
              <div>{song.current?.title}</div>
              <input
                type="range"
                className="accent-green-500 w-full"
                defaultValue="0"
                ref={progressBar}
                onChange={handleRange}
              />
            </div>
            <div className="pt-6 text-[14px] pl-5 text-gray-300 font-bold">
              {duration && !isNaN(duration) ? calculateTime(duration) : "0 : 0"}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AudioPlayer;
