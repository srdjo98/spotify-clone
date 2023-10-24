"use client";

import {
  ReactElement,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
import { SongProps } from "../components/TableList";
import { Song } from "@prisma/client";

interface AudioPlayerProps {
  isOpen: boolean;
  skipCount: number;
  resetSkipCount: () => void;
  songs: Song[];
  setDisabled: () => void;
  setSongs: (songs: Song[]) => void;
  onClose: () => void;
  song: {
    isPlaying: boolean;
    isDisabled: boolean;
    current: Song | undefined;
    setCurrent: (song: Song) => void;
    onPlay: () => void;
    onPause: () => void;
    onNext: () => void;
    onPrev: () => void;
  };
}

export const AudioPlayerContext = createContext<AudioPlayerProps>(
  undefined as never
);

export const AudioPlayerProvider = ({
  children,
}: {
  children: ReactElement;
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [skipCount, setSkipCount] = useState<number>(0);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [currentSong, setCurrentSong] = useState<Song>();
  const [songs, setSongs] = useState<Song[]>([]);

  const handlePlaying = () => {
    setIsOpen(true);
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setIsPlaying(false);
    let currentIndex = songs.findIndex((song) => song.id === currentSong?.id);
    currentIndex++;
    const song = songs.find((_song, i) => currentIndex === i);
    setSkipCount((prev) => prev + 1);
    if (song) {
      setCurrentSong(song);
    }
  };

  const handlePrev = () => {
    setIsPlaying(false);
    let currentIndex = songs.findIndex((song) => song.id === currentSong?.id);
    currentIndex--;
    const song = songs.find((_song, i) => currentIndex === i);
    setSkipCount((prev) => prev + 1);
    if (song) {
      setCurrentSong(song);
    }
  };

  const handleClose = () => {
    setIsPlaying(false);
    setIsOpen(false);
  };

  const value = useMemo(
    () => ({
      isOpen,
      skipCount,
      resetSkipCount: () => setSkipCount(0),
      songs,
      setSongs: (songs: Song[]) => setSongs(songs),
      setDisabled: () => setIsDisabled(!isDisabled),
      onClose: handleClose,
      song: {
        isPlaying,
        isDisabled,
        current: currentSong,
        setCurrent: (song: Song) => setCurrentSong(song),
        onPlay: handlePlaying,
        onPause: () => setIsPlaying(false),
        onNext: handleNext,
        onPrev: handlePrev,
      },
    }),
    [isOpen, isPlaying, skipCount, songs, currentSong]
  );

  return (
    <AudioPlayerContext.Provider value={{ ...value }}>
      {children}
    </AudioPlayerContext.Provider>
  );
};

export const useAudioPlayer = () => useContext(AudioPlayerContext);
