import getSongsByAlbumId from "@/app/actions/getSongsByAlbumId";
import AlbumClient from "./AlbumClient";

interface AlbumPageProps {
  albumId?: string;
}

const AlbumPage = async ({ params }: { params: AlbumPageProps }) => {
  const data = await getSongsByAlbumId(params);

  return <AlbumClient data={data} />;
};

export default AlbumPage;
