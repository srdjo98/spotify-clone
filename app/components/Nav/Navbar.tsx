"use client";

import { useAudioPlayer } from "@/app/contexts/audioPlayerContext";
import { useModel } from "@/app/contexts/modalContext";
import { formatPathName } from "@/app/utils";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SearchIcon from "@mui/icons-material/Search";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import LoginModal from "../Modal/LoginModal";
import RegisterModal from "../Modal/RegisterModal";

const Navbar = () => {
  const { data: session } = useSession();
  const { onClose: closeAudioPlayer } = useAudioPlayer();
  const router = useRouter();
  const pathName = usePathname();
  const [searchText, setSearchText] = useState<string>("");
  const { type, setType, onOpen } = useModel();
  const [value] = useDebounce(searchText, 800);

  useEffect(() => {
    router.push(`/search/${value}`);
  }, [value]);

  const handleSignOut = () => {
    closeAudioPlayer();
    signOut({ redirect: false });
  };

  return (
    <>
      <div className="flex justify-between p-5">
        <div className="flex gap-8">
          <ArrowBackIosIcon
            className="cursor-pointer mt-3"
            onClick={() => router.back()}
          />
          {formatPathName(pathName).includes("search") && (
            <div className="flex relative">
              <SearchIcon
                fontSize="large"
                className="absolute inset-y-0 left-0 ml-2 pt-2"
              />
              <input
                type="text"
                className="bg-gray-500 pl-8 p-2 rounded-2xl border border-transparent mr-2 ml-2 active:border-transparent"
                placeholder="What dou you want to listen?"
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
          )}
        </div>
        {session?.user ? (
          <button
            className="bg-white text-black rounded-2xl pt-2 pb-2 pr-5 pl-5 text-xl"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        ) : (
          <div className="flex">
            <button
              className="text-gray-400 text-xl pr-3"
              onClick={() => {
                setType("register");
                onOpen();
              }}
            >
              Sign Up
            </button>
            <button
              className="bg-white text-black rounded-2xl pt-2 pb-2 pr-5 pl-5 text-xl"
              onClick={() => {
                setType("login");
                onOpen();
              }}
            >
              Login
            </button>
          </div>
        )}
      </div>
      {type === "login" && <LoginModal />}
      {type === "register" && <RegisterModal />}
    </>
  );
};

export default Navbar;
