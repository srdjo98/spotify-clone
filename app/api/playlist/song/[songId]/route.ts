import prisma from "@/prisma/prismaClient";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const body = await request.json();
  const { songId, playlistId } = body;

  const playlist = await prisma.playlist.findUnique({
    where: {
      id: playlistId,
    },
  });

  if (playlist) {
    const songsIds = playlist.songIDs.filter((id) => id !== songId);
    const updatePlaylist = await prisma.playlist.update({
      where: {
        id: playlistId,
      },
      data: {
        songIDs: [...songsIds],
      },
    });

    return NextResponse.json(updatePlaylist);
  }

  return NextResponse.json({
    message: "Playlist not found",
  });
};
