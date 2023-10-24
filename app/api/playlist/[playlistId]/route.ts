import prisma from "@/prisma/prismaClient";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const body = await request.json();
  const { title, description, playlistId } = body;

  const playlistUpdate = await prisma.playlist.update({
    where: {
      id: playlistId,
    },
    data: {
      title,
      description,
    },
  });

  return NextResponse.json(playlistUpdate);
};
