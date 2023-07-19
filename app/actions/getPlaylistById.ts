import prisma from "@/prisma/prismaClient";
interface IParams {
  playlistId?: string;
}

const getPlaylistById = async (params: IParams) => {
  try {
    const { playlistId } = params;

    const playlist = await prisma.playlist.findMany({
      where: {
        id: playlistId,
      },
      include: {
        songs: true,
      },
    });

    if (!playlist) {
      return null;
    }

    return { playlist: playlist[0], songs: [...playlist[0].songs] };
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export default getPlaylistById;
