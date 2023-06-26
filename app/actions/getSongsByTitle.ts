import prisma from "@/prisma/prismaClient";

interface IParams {
  slug?: string[];
}

const getSongsByTitle = async (params: IParams) => {
  try {
    const title = params?.slug?.[0];
 
    const song = await prisma.song.findMany({
      where: {
        title: {
          contains: title,
          mode: "insensitive",
        },
      },
    });

    if (!song) {
      return null;
    }

    return song;
  } catch (e: any) {
    throw new Error(e);
  }
};

export default getSongsByTitle;
