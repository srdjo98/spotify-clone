"use client";

import { useModel } from "@/app/contexts/modalContext";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoginModal from "../Modal/LoginModal";
import RegisterModal from "../Modal/RegisterModal";

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { type, setType, onOpen } = useModel();

  return (
    <>
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
      {type === "login" ? <LoginModal /> : <RegisterModal />}
    </>
  );
};

export default Navbar;
