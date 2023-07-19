import prisma from "@/prisma/prismaClient";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title");

  const song = await prisma.song.findMany({
    where: {
      title: {
        contains: title!,
        mode: "insensitive",
      },
    },
  });

  return NextResponse.json(song);
};
