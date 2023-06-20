"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

export interface AlbumProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
}

export interface SongProps {
  id: any;
  title: string;
  description: string;
  imageUrl: string | null;
  duration: string | null;
  album: AlbumProps;
  audioUrl?: string;
}

interface SongsTableProps {
  data: any;
  columns: any;
}

const TableList = ({ data, columns }: SongsTableProps) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="pl-5 pr-5 pt-5">
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
              className="group flex flex-row justify-between pt-2 pb-2 pl-3 pr-3 mt-5 hover:bg-gray-600 rounded-md"
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

export default TableList;
