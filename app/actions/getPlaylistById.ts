import { prisma } from "@/prisma/prismaClient";
interface IParams {
  playlistId?: string;
}

const getPlaylistById = async (params: IParams) => {
  try {
    const { playlistId } = params;

    const songs = await prisma.song.findMany({
      where: {
        playlistId: playlistId,
      },
      include: {
        playlist: true,
      },
    });

    return {
      playlist: {
        ...songs[0].playlist,
      },
      songs: [...songs],
    };
  } catch (e: any) {
    throw new Error(e);
  }
};

export default getPlaylistById;
