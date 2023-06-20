"use client";

import {
  ReactElement,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
import { SongProps } from "../components/TableList";

interface AudioPlayerProps {
  isOpen: boolean;
  songs: SongProps[];
  setSongs: (songs: SongProps[]) => void;
  song: {
    isPlaying: boolean;
    current: SongProps | undefined;
    setCurrent: (song: SongProps) => void;
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
  // const [isPrevDisabled, setIsPrevDisabled] = useState(false);
  // const [isNextDisabled, setIsNextDisabled] = useState(true);
  const [currentSong, setCurrentSong] = useState<SongProps>();

  const [songs, setSongs] = useState<SongProps[]>([]);

  const handlePlaying = () => {
    setIsOpen(true);
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setIsPlaying(false);
    let currentIndex = songs.findIndex((song) => song.id === currentSong?.id);
    currentIndex++;
    const song = songs.find((_song, i) => currentIndex === i);
    if (song) {
      setCurrentSong(song);
    }
  };

  const handlePrev = () => {
    setIsPlaying(false);
    let currentIndex = songs.findIndex((song) => song.id === currentSong?.id);
    currentIndex--;
    const song = songs.find((_song, i) => currentIndex === i);
    if (song) {
      setCurrentSong(song);
    }
  };

  const value = useMemo(
    () => ({
      isOpen,
      songs,
      setSongs: (songs: SongProps[]) => setSongs(songs),
      song: {
        isPlaying,
        current: currentSong,
        setCurrent: (song: SongProps) => setCurrentSong(song),
        onPlay: handlePlaying,
        onPause: () => setIsPlaying(false),
        onNext: handleNext,
        onPrev: handlePrev,
      },
    }),
    [isPlaying, songs, currentSong]
  );

  return (
    <AudioPlayerContext.Provider value={{ ...value }}>
      {children}
    </AudioPlayerContext.Provider>
  );
};

export const useAudioPlayer = () => useContext(AudioPlayerContext);
