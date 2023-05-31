import getPlaylists from "./actions/getPlaylists";
import SectionList from "./components/SectionList";

export default async function Home() {
  const playlists = await getPlaylists();

  return (
    <div className="flex flex-row">
      <div className="w-20 bg-red-400">Navbar</div>
      <div className="w-full">
        <SectionList title="Focus" subtitle="Show All" playlists={playlists} />
      </div>
    </div>
  );
}
