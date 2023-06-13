"use client";

import { useModel } from "@/app/contexts/modalContext";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import HouseIcon from "@mui/icons-material/House";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import SearchIcon from "@mui/icons-material/Search";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ReactElement, useState } from "react";
import LoginModal from "../Modal/LoginModal";
import RegisterModal from "../Modal/RegisterModal";

const Navbar = ({ children }: { children: ReactElement }) => {
  const { data: session } = useSession();

  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const { onOpen } = useModel();

  return (
    <div className="w-full flex">
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
          <div className="font-bold text-lg pb-5 cursor-pointer flex">
            <SearchIcon fontSize="large" />
            <div className="pl-4 pt-1">Search</div>
          </div>
          <div className="font-bold text-lg pb-5 cursor-pointer flex">
            <LibraryMusicIcon fontSize="large" />
            <div className="pl-4 pt-1">Your Library</div>
          </div>
        </div>
      </div>
      <div className="w-[85%]">
        <div className="flex justify-between p-5">
          <ArrowBackIosIcon
            className="cursor-pointer mt-2"
            onClick={() => router.back()}
          />
          {session?.user ? (
            <button
              className="bg-white text-black rounded-2xl pt-2 pb-2 pr-5 pl-5 text-xl"
              onClick={() => signOut()}
            >
              Sign Out
            </button>
          ) : (
            <div className="flex">
              <button
                className="text-gray-400 text-xl pr-3"
                onClick={() => {
                  setIsLogin(false);
                  onOpen();
                }}
              >
                Sign Up
              </button>
              <button
                className="bg-white text-black rounded-2xl pt-2 pb-2 pr-5 pl-5 text-xl"
                onClick={() => {
                  setIsLogin(true);
                  onOpen();
                }}
              >
                Login
              </button>
            </div>
          )}
        </div>
        {children}
        {isLogin ? <LoginModal /> : <RegisterModal />}
      </div>
    </div>
  );
};

export default Navbar;
