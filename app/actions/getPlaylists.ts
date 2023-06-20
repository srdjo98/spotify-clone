import prisma from "@/prisma/prismaClient";

export default async function getPlaylists() {
  try {
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
