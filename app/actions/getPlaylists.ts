import prisma from "@/prisma/prismaClient";
import { getUserSession } from "./getUserSession";


export default async function getPlaylists() {
  try {
    const user = await getUserSession();
    console.log("playlist user", user)

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
