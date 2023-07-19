import { getUserSession } from "@/app/actions/getUserSession";
import prisma from "@/prisma/prismaClient";
import { NextResponse } from "next/server";

export const POST = async () => {
  const user = await getUserSession();
  let userId: any;

  if (user?.user?.email) {
    const currentUser = await prisma.user.findUnique({
      where: {
        email: user?.user?.email,
      },
    });

    userId = currentUser?.id;

    const playlist = await prisma.playlist.create({
      data: {
        title: "",
        description: "",
        imageUrl: "placeholder.png",
        userId,
      },
    });

    return NextResponse.json(playlist);
  }

  return NextResponse.json("DATA");
};
