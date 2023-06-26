"use client";

import CardList from "@/app/components/CardList";
import { SimpleSongProps } from "@/app/components/TableList";
import { useAudioPlayer } from "@/app/contexts/audioPlayerContext";

interface Props {
  songs: SimpleSongProps[];
}

const SearchSlugClient = ({ songs }: Props) => {
  const { song: audioSong } = useAudioPlayer();

  const handlePlay = (song: any) => {
    audioSong.setCurrent(song);
    audioSong.onPlay();
  };

  return (
    <>
      {songs.map((song: SimpleSongProps) => (
        <CardList
          key={song.id}
          title={song.title}
          desc={song.description}
          imageUrl={`/../public/images/${song.imageUrl}`}
          action={() => handlePlay(song)}
        />
      ))}
    </>
  );
};

export default SearchSlugClient;
