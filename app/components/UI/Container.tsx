"use client";

import { ModalContext } from "@/app/contexts/modalContext";
import { useModal } from "@/app/hooks/useModal";
import { ReactElement } from "react";
import Navbar from "../Nav/Navbar";

const Container = ({ children }: { children: ReactElement }) => {
  const { isOpen, onOpen, onClose } = useModal();

  return (
    <ModalContext.Provider value={{ isOpen, onClose, onOpen }}>
      <Navbar children={children} />
    </ModalContext.Provider>
  );
};

export default Container;
