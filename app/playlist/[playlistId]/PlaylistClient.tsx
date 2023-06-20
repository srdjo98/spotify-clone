"use client";

import SectionHeader from "@/app/components/SectionHeader";
import Song from "@/app/components/Song";
import TableList, { SongProps } from "@/app/components/TableList";
import { useAudioPlayer } from "@/app/contexts/audioPlayerContext";
import { useModel } from "@/app/contexts/modalContext";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import { createColumnHelper } from "@tanstack/react-table";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface PlaylistClientProps {
  data: {
    playlist: {
      title?: string;
      description?: string;
      imageUrl?: string | null;
    };
    songs: SongProps[];
  };
}

const PlaylistClient = ({ data }: PlaylistClientProps) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { onOpen, setType } = useModel();
  const { setSongs, song } = useAudioPlayer();
  const columnHelper = createColumnHelper<SongProps>();

  const handlePlay = (audioUrl: string | undefined) => {
    if (!session?.user) {
      setType("login");
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
        <div className=" flex relative">
          <div className="absolute group-hover:opacity-0 pt-3">{i++}</div>
          <div
            className="absolute opacity-0 group-hover:opacity-100 group-hover:cursor-pointer pt-2"
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
      cell: ({ row }) => (
        <Song
          title={row.getValue("title")}
          description={row.original.description}
          imageUrl={row.original.imageUrl || ""}
        />
      ),
      header: () => <span>Title</span>,
      size: 40,
    }),
    columnHelper.accessor("album.title", {
      cell: (info) => (
        <div
          className="pt-3 hover:cursor-pointer hover:underline hover:font-bold"
          onClick={() => router.push(`/album/${info.row.original.album.id}`)}
        >
          {info.getValue()}
        </div>
      ),
      header: () => <span>Album</span>,
      size: 30,
    }),
    columnHelper.accessor("duration", {
      cell: (info) => <div className="pt-3">{info.getValue()}</div>,
      header: () => <TimelapseIcon />,
      size: 10,
    }),
  ];

  return (
    <>
      <SectionHeader
        title={data.playlist.title || ""}
        subtitle="Playlist"
        description={data.playlist.description || ""}
        imageUrl={data.playlist.imageUrl || ""}
        listCount={data.songs.length}
      />
      <TableList data={data.songs} columns={columns} />
    </>
  );
};

export default PlaylistClient;
