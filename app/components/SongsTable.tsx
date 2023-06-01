"use client";

import TimelapseIcon from "@mui/icons-material/Timelapse";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Song from "./Song";

export interface AlbumProps {
  title: string;
}

export interface SongProps {
  id: any;
  title: string;
  description: string;
  imageUrl: string;
  album: AlbumProps;
  duration?: string;
}

interface SongsTableProps {
  songs: any;
}

const SongsTable = ({ songs }: SongsTableProps) => {
  const columnHelper = createColumnHelper<SongProps>();

  let i = 1;

  const columns = [
    columnHelper.accessor("id", {
      cell: () => <div className="pt-3">{i++}</div>,
      header: () => <span>#</span>,
      size: 10,
    }),
    columnHelper.accessor("title", {
      cell: (info) => (
        <Song
          title={info.getValue()}
          description={info.row.getValue("description")}
          imageUrl={info.row.getValue("imageUrl")}
        />
      ),
      header: () => <span>Title</span>,
      size: 40,
    }),
    columnHelper.accessor("album.title", {
      cell: (info) => <div className="pt-3">{info.getValue()}</div>,
      header: () => <span>Album</span>,
      size: 30,
    }),
    columnHelper.accessor("duration", {
      cell: (info) => <div className="pt-3">{info.getValue()}</div>,
      header: () => <TimelapseIcon />,
      size: 10,
    }),
  ];

  const table = useReactTable({
    data: songs,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="pl-5 pr-5">
      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="flex flex-row justify-between pl-3 pr-3"
            >
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  // @ts-ignore */
                  width={`${header.getSize()}%`}
                  className={`${
                    header.id === `duration` ? "text-right" : "text-left"
                  }`}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="flex flex-row justify-between pt-2 pb-2 pl-3 pr-3 mt-5 hover:bg-gray-600 rounded-md"
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className={`${
                    cell.id === `${row.id}_duration`
                      ? "text-right"
                      : "text-left"
                  }`}
                  width={`${cell.column.getSize()}%`}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SongsTable;
