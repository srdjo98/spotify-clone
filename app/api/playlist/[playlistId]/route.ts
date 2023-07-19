import prisma from "@/prisma/prismaClient";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const body = await request.json();
  console.log(body);
  const { playlistId, title, description, file } = body;
console.log(file);
  if (title === undefined && description === undefined) {
    const deletePlaylist = await prisma.playlist.delete({
      where: {
        id: playlistId,
      },
    });

    return NextResponse.json(deletePlaylist);
  }

  const updatePlaylist = await prisma.playlist.update({
    where: {
      id: playlistId,
    },
    data: {
      title,
      description,
    },
  });

  return NextResponse.json(updatePlaylist);
};
