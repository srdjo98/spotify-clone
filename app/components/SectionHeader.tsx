"use client";

import Image from "next/image";

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  listCount?: number;
}

const SectionHeader = ({
  title,
  subtitle,
  description,
  imageUrl,
  listCount,
}: SectionHeaderProps) => {
  return (
    <div className="p-10 bg-gradient-to-b from-gray-400 to-gray-700">
      <div className="flex flex-row h-50">
        <div className="shadow-black shadow-md">
          <Image
            src={`/../public/images/${imageUrl}`}
            height={250}
            width={250}
            alt={title || ""}
          />
        </div>
        <div className="pl-8 pt-10">
          <div className="text-bold">{subtitle}</div>
          <div className="text-[65px] font-bold">{title}</div>
          <div className="text-gray-500 text-[14px] font-bold pt-8">
            {description}.
          </div>
          <div className="pt-3">6,400,999 likes • {listCount} • 2.3 min</div>
        </div>
      </div>
    </div>
  );
};

export default SectionHeader;
