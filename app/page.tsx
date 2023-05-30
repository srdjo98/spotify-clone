import SectionList from "./components/SectionList";

export default function Home() {
  return (
    <div className="flex flex-row">
      <div className="w-20 bg-red-400">Navbar</div>
      <div className="w-full">
        <SectionList title="Focus" subtitle="Show All" />
        <br />
        <SectionList title="Spotify Playlists" subtitle="Show All" />
      </div>
    </div>
  );
}
