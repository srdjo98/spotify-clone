"use client";

import { createContext, useContext } from "react";
import { NotifyProps } from "../hooks/useNotify";

export type StatusType = "success" | "error";

export interface SnackBarContextProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  notify: ({}: NotifyProps) => void;
  message: string;
  status: StatusType;
}

export const SnackBarContext = createContext<SnackBarContextProps>(
  undefined as never
);

export const useSnackBar = () => useContext(SnackBarContext);
