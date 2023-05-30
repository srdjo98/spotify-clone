"use client";

import CardList from "./CardList";

interface SectionListProps {
  title: string;
  subtitle?: string;
}

const SectionList = ({ title, subtitle }: SectionListProps) => {
  return (
    <div className="p-5 w-full">
      <div className="bg-gray-1000">
        <div className="flex flex-row justify-between pr-5 pl-5 pt-5">
          <h3 className="text-2xl font-bold">{title}</h3>
          <div className="text-gray-300 font-bold">{subtitle}</div>
        </div>
        <CardList
          title="Dua Lipa"
          desc="Dua Lipa is on top of the Hottest 50!"
          imageUrl="/../public/images/lipa.jpg"
        />
      </div>
    </div>
  );
};

export default SectionList;
