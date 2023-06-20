"use client";

import { createContext, useContext } from "react";

export const ModalContext = createContext({
  isOpen: false,
  type: "",
  onClose: () => {},
  onOpen: () => {},
  setType: (type: string) => {},
});

export const useModel = () => useContext(ModalContext);
