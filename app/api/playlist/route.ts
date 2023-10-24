import { getUserSession } from "@/app/actions/getUserSession";
import prisma from "@/prisma/prismaClient";
import { NextResponse } from "next/server";

export const POST = async () => {
  const user = await getUserSession();

  if (user?.user?.email) {
    const currentUser = await prisma.user.findUnique({
      where: {
        email: user?.user?.email,
      },
    });

    const playlists = await prisma.playlist.findMany({
      where: {
        title: {
          contains: "Playlist",
          mode: "insensitive",
        },
      },
    });

    let title: string;
    if (playlists.length === 0) {
      title = `Playlist 0`
    } else {
      title = `Playlist ${playlists.length ++}`
    }

    if (currentUser) {
      const playlist = await prisma.playlist.create({
        data: {
          title: title,
          description: "Auto generated description",
          imageUrl: "placeholder.png",
          userId: currentUser?.id,
        },
      });
      return NextResponse.json(playlist);
    }
  }

  return NextResponse.json("DATA");
};
