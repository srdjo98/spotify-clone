"use client";

import Image from "next/image";

interface SongProps {
  title: string;
  description: string;
  imageUrl: string;
}

const Song = ({ title, description, imageUrl }: SongProps) => {
  return (
    <div className="flex flex-row">
      <div>
        <Image
          src={`/../public/images/${imageUrl}`}
          width={45}
          height={45}
          alt="dua lipa"
        />
      </div>
      <div className="pl-5 text-left">
        <h5>{title}</h5>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  );
};

export default Song;
