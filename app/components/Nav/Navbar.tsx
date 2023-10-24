"use client";

import { useAudioPlayer } from "@/app/contexts/audioPlayerContext";
import { useModel } from "@/app/contexts/modalContext";
import { formatPathName } from "@/app/utils";
import { AccountCircle, ArrowBackIos, Search } from "@mui/icons-material";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import EditModal from "../Modal/Edit/EditModal";
import LoginModal from "../Modal/Login/LoginModal";
import RegisterModal from "../Modal/Register/RegisterModal";

const Navbar = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [isExtendedProfile, setIsExtendedProfile] = useState<boolean>(false);
  const { data: session } = useSession();
  const { onClose: closeAudioPlayer } = useAudioPlayer();
  const router = useRouter();
  const pathName = usePathname();
  const { isModalsOpen, setIsModalsOpen } = useModel();
  const [value] = useDebounce(searchText, 800);

  useEffect(() => {
    if (value.length > 0) router.push(`/search/${value}`);
  }, [value]);

  const handleSignOut = () => {
    closeAudioPlayer();
    router.refresh();
    signOut({ callbackUrl: "http://localhost:3000/" });
  };

  return (
    <>
      <div className="flex justify-between p-5">
        <div className="flex gap-8">
          <ArrowBackIos
            className="cursor-pointer mt-3"
            onClick={() => router.back()}
          />
          {formatPathName(pathName).includes("search") && (
            <div className="flex relative">
              <Search
                fontSize="large"
                className="absolute inset-y-0 left-0 ml-2 pt-2"
              />
              <input
                type="text"
                className="bg-gray-500 pl-8 p-2 rounded-2xl border border-transparent mr-2 ml-2 active:border-transparent"
                placeholder="What do you want to listen?"
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
          )}
        </div>
        {session?.user ? (
          <div className="flex relative">
            <div className="pr-5 pt-2">
              <AccountCircle
                fontSize="large"
                onClick={() => setIsExtendedProfile(!isExtendedProfile)}
              />
            </div>
            {isExtendedProfile && (
              <div className="flex flex-col absolute right-0 mt-12 w-36 items-center bg-gray-700 rounded-lg p-2">
                <div
                  className="font-bold text-lg text-white pb-2 cursor-pointer capitalize"
                  onClick={() => router.push("/overview/account")}
                >
                  {session.user?.name}
                </div>
                <div>
                  <button
                    className="bg-white text-black rounded-2xl pt-2 pb-2 pr-5 pl-5 text-xl"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex">
            <button
              className="text-gray-400 text-xl pr-3"
              onClick={() => setIsModalsOpen({ register: true })}
            >
              Sign Up
            </button>
            <button
              className="bg-white text-black rounded-2xl pt-2 pb-2 pr-5 pl-5 text-xl"
              onClick={() => setIsModalsOpen({ login: true })}
            >
              Login
            </button>
          </div>
        )}
      </div>
      {isModalsOpen.login && <LoginModal />}
      {isModalsOpen.register && <RegisterModal />}
    </>
  );
};

export default Navbar;
