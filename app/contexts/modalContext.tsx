"use client";

import { createContext, useContext } from "react";

export const ModalContext = createContext({
  isModalsOpen: {
    login: false,
    register: false,
    edit: false,
    checkout: false,
    ad: false,
  },
  priceType: { price: 0, type: "" },
  setIsModalsOpen: (values: {}) => {},
  setPriceType: (price: number, type: string) => {},
});

export const useModel = () => useContext(ModalContext);
