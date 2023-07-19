import { getUserSession } from "@/app/actions/getUserSession";
import prisma from "@/prisma/prismaClient";
import { NextResponse } from "next/server";

export const GET = async () => {
  const user = await getUserSession();

  if (user?.user?.email) {
    const currentUser = await prisma.user.findUnique({
      where: {
        email: user?.user?.email,
      },
    });

    const playlists = await prisma.playlist.findMany({
      where: {
        userId: currentUser?.id,
      },
    });

    return NextResponse.json(playlists);
  }

  return NextResponse.json({
    message: "User not logged in.",
  });
};
