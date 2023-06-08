"use client";

import { useState } from "react";

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return {
    isOpen,
    onOpen: () => setIsOpen(true),
    onClose: () => setIsOpen(false),
  };
};
