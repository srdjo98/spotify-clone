"use client";

import HouseIcon from "@mui/icons-material/House";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SideNav = () => {
  const router = useRouter();

  return (
    <>
      <div className="w-[15%] h-[100hv]">
        <div className="pt-5 pl-12">
          <Image
            src={`/../public/images/spotilogo.png`}
            height={150}
            width={150}
            alt="spotify"
          />
        </div>
        <div className="pl-12 pt-11">
          <div
            className="font-bold text-lg pb-5 cursor-pointer flex"
            onClick={() => router.push("/")}
          >
            <HouseIcon fontSize="large" />
            <div className="pl-4 pt-1">Home</div>
          </div>
          <div
            className="font-bold text-lg pb-5 cursor-pointer flex"
            onClick={() => router.push("/search")}
          >
            <SearchIcon fontSize="large" />
            <div className="pl-4 pt-1">Search</div>
          </div>
          <div className="font-bold text-lg pb-5 cursor-pointer flex">
            <LibraryMusicIcon fontSize="large" />
            <div className="pl-4 pt-1">Your Library</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideNav;
