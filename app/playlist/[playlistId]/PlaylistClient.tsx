"use client";

import AudioPlayer from "@/app/components/AudioPlayer";
import SectionHeader from "@/app/components/SectionHeader";
import Song from "@/app/components/Song";
import TableList, { SongProps } from "@/app/components/TableList";
import Container from "@/app/components/UI/Container";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import { createColumnHelper } from "@tanstack/react-table";
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
  const columnHelper = createColumnHelper<SongProps>();

  let i = 1;

  const columns = [
    columnHelper.accessor("id", {
      cell: () => (
        <div className="pt-3 flex relative">
          <div className="absolute group-hover:opacity-0">{i++}</div>
          <div
            className="absolute opacity-0 group-hover:opacity-100 group-hover:cursor-pointer"
            onClick={() => alert("play music")}
          >
            <PlayArrowIcon />
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
      <Container>
        <>
          <SectionHeader
            title={data.playlist.title || ""}
            subtitle="Playlist"
            description={data.playlist.description || ""}
            imageUrl={data.playlist.imageUrl || ""}
            listCount={data.songs.length}
          />
          <TableList data={data.songs} columns={columns} />
          <AudioPlayer  />
        </>
      </Container>
    </>
  );
};

export default PlaylistClient;
