import getPlaylistById from "@/app/actions/getPlaylistById";
import PlaylistClient from "./PlaylistClient";

interface PlaylistPageProps {
  playlistId: string;
}

const PlaylistPage = async ({ params }: { params: PlaylistPageProps }) => {
  const data = await getPlaylistById(params);

  return (
    <div className="h-full">
      <PlaylistClient data={data} />
    </div>
  );
};

export default PlaylistPage;
