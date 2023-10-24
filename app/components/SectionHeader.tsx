"use client";

import Image from "next/image";
import { useModel } from "../contexts/modalContext";
import { useEditPlaylist } from "../hooks/useEditPlaylist";
import EditModal from "./Modal/Edit/EditModal";

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  id?: string;
  listCount?: number;
}

const SectionHeader = ({
  title,
  subtitle,
  description,
  imageUrl,
  id,
  listCount,
}: SectionHeaderProps) => {
  const { isModalsOpen, setIsModalsOpen } = useModel();
  const { isAllowed } = useEditPlaylist(id!);

  const handleEdit = () => {
    if (isAllowed) {
      setIsModalsOpen({ edit: true });
    }
  };

  console.log(imageUrl);

  return (
    <>
      <div
        className="p-10 bg-gradient-to-b from-gray-400 to-gray-700"
        onClick={handleEdit}
      >
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
      {isModalsOpen.edit && <EditModal />}
    </>
  );
};

export default SectionHeader;
