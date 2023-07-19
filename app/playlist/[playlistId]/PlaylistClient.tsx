"use client";

import SectionHeader from "@/app/components/SectionHeader";
import Song from "@/app/components/Song";
import TableList, { SongProps } from "@/app/components/TableList";
import { useAudioPlayer } from "@/app/contexts/audioPlayerContext";
import { useModel } from "@/app/contexts/modalContext";
import { useSnackBar } from "@/app/contexts/useSnackBar";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SearchIcon from "@mui/icons-material/Search";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import { createColumnHelper } from "@tanstack/react-table";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useQuery } from "react-query";
import { useDebounce } from "use-debounce";

interface PlaylistClientProps {
  data: {
    playlist: {
      id?: string;
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
  const { notify } = useSnackBar();
  const { setSongs, song } = useAudioPlayer();
  const columnHelper = createColumnHelper<SongProps>();
  const [title, setTitle] = useState<string>("");
  const [debouncedTitle] = useDebounce(title, 800);
  const { data: songsData } = useQuery(
    ["search", debouncedTitle],
    () =>
      axios.get(`/api/search?title=${debouncedTitle}`).then((res) => res.data),
    {
      enabled: debouncedTitle !== "",
    }
  );

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

  const handleDeleteFromPlaylist = (id: string) => {
    axios
      .post(`/api/playlist/song/${id}`, {
        playlistId: data.playlist.id,
        songId: id,
      })
      .then(() => {
        notify({
          message: "Deleted",
          status: "error",
          duration: 3000,
        });
        router.refresh();
      });
  };

  let i = 1;
  const columns = [
    columnHelper.accessor("id", {
      cell: ({ row }) => (
        <div className="flex relative">
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
      cell: ({ row }) => (
        <div className="flex justify-end">
          <span
            className="p-3 rounded-xl bg-red-700 cursor-pointer"
            onClick={() => handleDeleteFromPlaylist(row.original.id)}
          >
            Delete
          </span>
        </div>
      ),
      header: () => <TimelapseIcon />,
      size: 10,
    }),
  ];

  const handleAddSongToPlaylist = (id: string) => {
    axios
      .post("/api/playlist/song", {
        playlistId: data.playlist.id,
        songId: id,
      })
      .then((res) => {
        notify({
          message: res.data.message || "Added to Playlist",
          status: "success",
        });
        router.refresh();
      });
  };

  const searchColumns = [
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
    columnHelper.accessor("action", {
      cell: ({ row }) => (
        <div className="flex justify-end">
          <span
            className="p-3 rounded-xl bg-green-700 cursor-pointer"
            onClick={() => handleAddSongToPlaylist(row.original.id)}
          >
            Add
          </span>
        </div>
      ),
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
      <div className="flex relative pt-3">
        <SearchIcon
          fontSize="large"
          className="absolute inset-y-0 left-0 ml-2 mt-4"
        />
        <input
          type="text"
          className="bg-gray-500 pl-9 p-2 rounded-2xl border border-transparent mr-2 ml-2 active:border-transparent"
          placeholder="Add songs"
          onChange={(e) => setTitle(e.currentTarget.value as string)}
        />
      </div>
      <TableList data={data.songs} columns={columns} />
      {songsData && songsData.length > 0 && (
        <div className="border border-green-500 mt-2">
          <div className="pl-7 pt-2 font-bold text-xl">Search Results</div>
          <TableList data={songsData} columns={searchColumns} />
        </div>
      )}
    </>
  );
};

export default PlaylistClient;
