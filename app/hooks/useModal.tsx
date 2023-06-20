"use client";

import { useState } from "react";

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<string>("register");

  return {
    isOpen,
    type,
    onOpen: () => setIsOpen(true),
    onClose: () => setIsOpen(false),
    setType: (typeValue: string) => setType(typeValue),
  };
};
