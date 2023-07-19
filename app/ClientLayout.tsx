"use client";

import { AudioPlayerProvider } from "@/app/contexts/audioPlayerContext";
import { ModalContext } from "@/app/contexts/modalContext";
import { SnackBarContext } from "@/app/contexts/useSnackBar";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ReactElement } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import AudioPlayer from "./components/AudioPlayer";
import Navbar from "./components/Nav/Navbar";
import SideNav from "./components/Nav/SideNav";
import Snackbar from "./components/UI/Snackbar";
import { useModal } from "./hooks/useModal";
import { useNotify } from "./hooks/useNotify";

export const queryClient = new QueryClient();

const ClientLayout = ({
  session,
  children,
}: {
  session: Session;
  children: ReactElement;
}) => {
  const values = useNotify();
  const { isOpen, type, onOpen, onClose, setType } = useModal();

  return (
    <SessionProvider session={session}>
      <div className="w-full flex">
        <QueryClientProvider client={queryClient}>
          <SnackBarContext.Provider value={values}>
            <AudioPlayerProvider>
              <ModalContext.Provider
                value={{ isOpen, type, onClose, onOpen, setType }}
              >
                <Snackbar />
                <SideNav />
                <div className="w-[85%]">
                  <Navbar />
                  {children}
                  <AudioPlayer />
                </div>
              </ModalContext.Provider>
            </AudioPlayerProvider>
          </SnackBarContext.Provider>
        </QueryClientProvider>
      </div>
    </SessionProvider>
  );
};

export default ClientLayout;
