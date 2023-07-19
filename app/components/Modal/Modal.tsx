"use client";

import { useModel } from "@/app/contexts/modalContext";
import CloseIcon from "@mui/icons-material/Close";
import { ReactElement } from "react";

interface ModalProps {
  title: string;
  subTitle?: string;
  body: ReactElement;
  primaryAction?: () => void;
  primaryActionLabel?: string;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
  closeAction?: () => void;
}

const Modal = ({
  title,
  subTitle,
  body,
  primaryAction,
  primaryActionLabel,
  secondaryAction,
  secondaryActionLabel,
  closeAction,
}: ModalProps) => {
  const { isOpen, onClose } = useModel();

  return (
    <>
      {isOpen && (
        <>
          <div className="absolute inset-0  opacity-80 h-full w-full bg-gray-800" />
          <div className="absolute inset-0 h-full w-[100%]  flex flex-col justify-center items-center z-50">
            <div className="p-5 rounded-2xl w-[450px]  bg-black">
              <div className="flex justify-between">
                <div className="text-4xl pb-1">{title}</div>
                <CloseIcon
                  className="mt-2 cursor-pointer"
                  onClick={closeAction ? closeAction : onClose}
                />
              </div>
              {subTitle && <div className="text-xl pt-4 pb-4">{subTitle}</div>}
              <hr />
              <div className="flex flex-col pt-2">{body}</div>
              <div className="flex pt-7 justify-between">
                {secondaryActionLabel && (
                  <button
                    className="rounded-2xl bg-gray-800 p-4"
                    onClick={secondaryAction}
                  >
                    {secondaryActionLabel}
                  </button>
                )}
                {primaryActionLabel && (
                  <button
                    className="rounded-2xl bg-green-600 p-4"
                    onClick={primaryAction}
                  >
                    {primaryActionLabel}
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Modal;
