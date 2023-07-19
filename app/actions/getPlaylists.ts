import prisma from "@/prisma/prismaClient";
import { getUserSession } from "./getUserSession";

export default async function getPlaylists() {
  try {
    const user = await getUserSession();

    if (user?.user?.email) {
      const currentUser = await prisma.user.findUnique({
        where: {
          email: user.user.email,
        },
      });

      const playlists = await prisma.playlist.findMany({
        where: {
          NOT: {
            userId: {
              equals: currentUser?.id,
            },
          },
        },
      });

      return playlists;
    }

    const playlists = await prisma.playlist.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return playlists;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
