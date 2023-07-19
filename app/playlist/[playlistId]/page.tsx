import getPlaylistById from "@/app/actions/getPlaylistById";
import Container from "@/app/components/UI/Container";
import PlaylistClient from "./PlaylistClient";

interface PlaylistPageProps {
  playlistId: string;
}

const PlaylistPage = async ({ params }: { params: PlaylistPageProps }) => {
  const data = await getPlaylistById(params);

  if (!data) {
    return <p>No Results</p>;
  }

  return (
    <div className="h-full">
      <Container>
        <PlaylistClient data={data} />
      </Container>
    </div>
  );
};

export default PlaylistPage;
