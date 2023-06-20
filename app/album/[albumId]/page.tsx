import getSongsByAlbumId from "@/app/actions/getSongsByAlbumId";
import Container from "@/app/components/UI/Container";
import AlbumClient from "./AlbumClient";

interface AlbumPageProps {
  albumId?: string;
}

const AlbumPage = async ({ params }: { params: AlbumPageProps }) => {
  const data = await getSongsByAlbumId(params);

  return (
    <Container>
      <AlbumClient data={data} />
    </Container>
  );
};

export default AlbumPage;
