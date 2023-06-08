"use client";

import SectionHeader from "@/app/components/SectionHeader";
import TableList, { AlbumProps, SongProps } from "@/app/components/TableList";
import Container from "@/app/components/UI/Container";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import { createColumnHelper } from "@tanstack/react-table";

interface AlbumClientProps {
  data: {
    album: AlbumProps;
    songs: SongProps[];
  };
}

const AlbumClient = ({ data }: AlbumClientProps) => {
  const columnHelper = createColumnHelper<SongProps>();
  let i = 1;

  const columns = [
    columnHelper.accessor("id", {
      cell: () => <div className="pt-2">{i++}</div>,
      header: () => <span>#</span>,
      size: 5,
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
    <Container>
      <SectionHeader
        title={data.album.title}
        subtitle="Album"
        description={data.album.description}
        imageUrl={data.album.imageUrl || ""}
        listCount={data.songs.length}
      />
      <TableList data={data.songs} columns={columns} />
    </Container>
  );
};

export default AlbumClient;
