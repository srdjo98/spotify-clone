import { getUserSession } from "@/app/actions/getUserSession";
import prisma from "@/prisma/prismaClient";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const body = await request.json();
  const { playlistId, songId } = body;
  const userSession = await getUserSession();

  const user = await prisma.user.findUnique({
    where: {
      email: userSession?.user?.email!,
    },
  });

  const playlist = await prisma.playlist.findUnique({
    where: {
      id: playlistId,
    },
  });

  if (playlist) {
    if (playlist.userId !== user?.id) {
      return NextResponse.json({
        message: "Can only add to your own playlist.",
      });
    }

    const isExistingSong = playlist.songIDs.find((songID: string) => songID === songId);
    if (isExistingSong) {
      return NextResponse.json({
        message: "Song already in playlist",
      });
    }

    const updatePlaylist = await prisma.playlist.update({
      where: {
        id: playlistId,
      },
      data: {
        songIDs: [...playlist.songIDs, songId],
      },
    });

    return NextResponse.json(updatePlaylist);
  }

  return NextResponse.json({
    message: "No playlist found",
  });
};
