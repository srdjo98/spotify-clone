"use client";

import { ModalContext } from "@/app/contexts/modalContext";
import { SnackBarContext } from "@/app/contexts/useSnackBar";
import { useModal } from "@/app/hooks/useModal";
import { useNotify } from "@/app/hooks/useNotify";
import { SessionProvider } from "next-auth/react";
import { ReactElement } from "react";
import Navbar from "../Nav/Navbar";
import Snackbar from "./Snackbar";

const Container = ({
  session,
  children,
}: {
  session?: any;
  children: ReactElement;
}) => {
  const values = useNotify();
  const { isOpen, onOpen, onClose } = useModal();

  return (
    <SessionProvider session={session}>
      <SnackBarContext.Provider value={values}>
        <ModalContext.Provider value={{ isOpen, onClose, onOpen }}>
          <Snackbar />
          <Navbar children={children} />
        </ModalContext.Provider>
      </SnackBarContext.Provider>
    </SessionProvider>
  );
};

export default Container;
