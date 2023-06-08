import prisma from "@/prisma/prismaClient";
interface IParams {
  albumId?: string;
}

const getSongsByAlbumId = async (params: IParams) => {
  try {
    const { albumId } = params;

    const songs = await prisma.song.findMany({
      where: {
        albumId: albumId,
      },
      include: {
        album: true,
      },
    });

    return {
      album: { ...songs[0].album },
      songs: [...songs],
    };
  } catch (e: any) {
    throw new Error(e);
  }
};

export default getSongsByAlbumId;
