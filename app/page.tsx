import getPlaylists from "./actions/getPlaylists";
import { getUserSession } from "./actions/getUserSession";
import SectionList from "./components/SectionList";
import Container from "./components/UI/Container";

export default async function Home() {
  const playlists = await getPlaylists();
  const session = await getUserSession();

  return (
    <Container session={session}>
      <div className="flex flex-row bg-gray-900">
        <div className="w-full">
          <SectionList
            title="Focus"
            subtitle="Show All"
            playlists={playlists}
          />
        </div>
      </div>
    </Container>
  );
}
