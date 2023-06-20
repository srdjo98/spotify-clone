"use client";

import SectionHeader from "@/app/components/SectionHeader";
import TableList, { AlbumProps, SongProps } from "@/app/components/TableList";
import { useAudioPlayer } from "@/app/contexts/audioPlayerContext";
import { useModel } from "@/app/contexts/modalContext";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import { createColumnHelper } from "@tanstack/react-table";
import { useSession } from "next-auth/react";

interface AlbumClientProps {
  data: {
    album: AlbumProps;
    songs: SongProps[];
  };
}

const AlbumClient = ({ data }: AlbumClientProps) => {
  const { data: session } = useSession();
  const { onOpen } = useModel();
  const { setSongs, song } = useAudioPlayer();
  const columnHelper = createColumnHelper<SongProps>();

  const handlePlay = (audioUrl: string | undefined) => {
    if (!session?.user) {
      onOpen();
      return;
    }
    setSongs(data.songs);
    const currentSong = data.songs.find((song) => song.audioUrl === audioUrl);
    song.setCurrent(currentSong!);
    song.onPlay();
  };

  let i = 1;
  const columns = [
    columnHelper.accessor("id", {
      cell: ({ row }) => (
        <div className="flex relative">
          <div className="absolute group-hover:opacity-0 pt-2">{i++}</div>
          <div
            className="absolute opacity-0 group-hover:opacity-100 group-hover:cursor-pointer "
            onClick={() => handlePlay(row.original.audioUrl)!}
          >
            {song.isPlaying && row.original.id === song.current?.id ? (
              <PauseIcon fontSize="large" />
            ) : (
              <PlayArrowIcon fontSize="large" />
            )}
          </div>
        </div>
      ),
      header: () => <span>#</span>,
      size: 10,
    }),
    columnHelper.accessor("title", {
      cell: (info) => <div className="pt-2">{info.getValue()}</div>,
      header: () => <span>Title</span>,
      size: 120,
    }),

    columnHelper.accessor("duration", {
      cell: (info) => <div className="pt-2 text-lg">{info.getValue()}</div>,
      header: () => <TimelapseIcon />,
      size: 10,
    }),
  ];

  return (
    <>
      <SectionHeader
        title={data.album.title}
        subtitle="Album"
        description={data.album.description}
        imageUrl={data.album.imageUrl || ""}
        listCount={data.songs.length}
      />
      <TableList data={data.songs} columns={columns} />
    </>
  );
};

export default AlbumClient;
