import { useEffect, useMemo, useState } from "react";
import { StatusType } from "../contexts/useSnackBar";

export interface NotifyProps {
  message?: string;
  status?: StatusType;
  duration?: number;
}

export const useNotify = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [duration, setDuration] = useState<number>(2000);
  const [status, setStatus] = useState<StatusType>("success");

  useEffect(() => {
    setTimeout(() => {
      setIsOpen(false);
    }, duration);
  }, [isOpen]);

  const notify = ({
    message = "",
    status = "success",
    duration = 3000,
  }: NotifyProps) => {
    setIsOpen(true);
    setMessage(message);
    setDuration(duration);
    setStatus(status);
  };

  const values = useMemo(
    () => ({
      isOpen,
      notify,
      message,
      onClose: () => setIsOpen(false),
      onOpen: () => setIsOpen(true),
      status,
    }),
    [isOpen]
  );

  return values;
};
