"use client";

import { useRouter } from "next/navigation";
import CardList from "./CardList";

interface PlaylistProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
}
interface SectionListProps {
  title: string;
  subtitle?: string;
  playlists?: PlaylistProps[];
}

const SectionList = ({ title, subtitle, playlists }: SectionListProps) => {
  const router = useRouter();

  return (
    <div className="p-5 w-full">
      <div className="bg-gray-1000">
        <div className="flex flex-row justify-between pr-5 pl-5 pt-5">
          <h3 className="text-2xl font-bold">{title}</h3>
          <div className="text-gray-300 font-bold">{subtitle}</div>
        </div>
        {playlists?.map((playlist) => (
          <div
            key={playlist.id}
            onClick={() => router.push(`/playlist/${playlist.id}`)}
          >
            <CardList
              title={playlist.title}
              desc={playlist.description}
              imageUrl={`/../public/images/${playlist.imageUrl}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionList;
