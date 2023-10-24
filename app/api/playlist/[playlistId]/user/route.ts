import { getUserSession } from "@/app/actions/getUserSession";
import prisma from "@/prisma/prismaClient";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    const body = await request.json();
    const {playlistId} = body;
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

      if (playlist?.userId === user?.id) {
        return NextResponse.json(true);
      }

    return NextResponse.json(false);
}