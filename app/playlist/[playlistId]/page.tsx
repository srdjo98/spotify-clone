import getPlaylistById from "@/app/actions/getPlaylistById";
import Image from "next/image";

interface PlaylistPageProps {
  playlistId: string;
}

const PlaylistPage = async ({ params }: { params: PlaylistPageProps }) => {
  const data = await getPlaylistById(params);

  return (
    <div className="h-full p-10 bg-gradient-to-b from-gray-400 to-gray-700">
      <div>
        <div className="flex flex-row h-50">
          <div className="shadow-black shadow-md">
            <Image
              src={`/../public/images/${data.playlist.imageUrl}`}
              height={250}
              width={250}
              alt={data.playlist.title}
            />
          </div>
          <div className="pl-8 pt-10">
            <div className="text-bold">Playlist</div>
            <div className="text-[65px] font-bold">{data.playlist.title}</div>
            <div className="text-gray-500 text-[14px] font-bold pt-8">{data.playlist.description}.</div>
            <div className="pt-3">6,400,999 likes • 1 song • 2.3 min</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistPage;
