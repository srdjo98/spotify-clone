"use client";

import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import Image from "next/image";
import { useAudioPlayer } from "../contexts/audioPlayerContext";

interface CardListProps {
  title: string;
  desc: string;
  imageUrl: string;
  action?: (data?: any) => void;
}

const CardList = ({ title, desc, imageUrl, action }: CardListProps) => {
  const { song } = useAudioPlayer();

  return (
    <div className="flex flex-row flex-wrap justify-between gap-10 pl-8 pr-8 pt-8">
      <div className="bg-gray-800 w-[220px] mb-5 rounded-md hover:bg-gray-700 group">
        <div className=" last:h-40 p-5">
          <div className="relative">
            <Image
              className="rounded-md"
              src={imageUrl}
              height={200}
              width={200}
              alt={title}
            />
            <div
              className="absolute rounded-full bg-green-500 h-15 w-15 opacity-0 group-hover:opacity-100 bottom-0 right-0 mr-2 mb-2"
              onClick={action && action}
            >
              {song.isPlaying ? (
                <PauseCircleIcon className="w-14 h-14 drop-shadow-lg text-black  right-12" />
              ) : (
                <PlayArrowRoundedIcon className="w-14 h-14 drop-shadow-lg text-black  right-12" />
              )}
            </div>
          </div>
        </div>
        <div className="font-bold  pl-5 pt-1">{title}</div>
        <div className="pl-5 pr-5 pt-3 pb-3">{desc}</div>
      </div>
    </div>
  );
};

export default CardList;
