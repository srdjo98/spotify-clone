"use client";

import { useState } from "react";

interface IsModalsOpenProps {
  login: boolean;
  register: boolean;
  edit: boolean;
  checkout: boolean;
  ad: boolean;
}

export const useModal = () => {
  const [isModalsOpen, setIsModalsOpen] = useState<IsModalsOpenProps>({
    login: false,
    register: false,
    edit: false,
    checkout: false,
    ad: false,
  });
  const [priceType, setPriceType] = useState<{ price: number; type: string }>({
    price: 0,
    type: "",
  });

  return {
    isModalsOpen,
    priceType,
    setIsModalsOpen: (values: Partial<IsModalsOpenProps>) =>
      setIsModalsOpen((prevState) => ({ ...prevState, ...values })),
    setPriceType: (price: number, type: string) => setPriceType({ price, type }),
  };
};
