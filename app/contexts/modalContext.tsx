"use client";

import { createContext, useContext } from "react";

export const ModalContext = createContext({
  isOpen: false,
  onClose: () => {},
  onOpen: () => {},
});

export const useModel = () => useContext(ModalContext);
