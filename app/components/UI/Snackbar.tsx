"use client";

import { useSnackBar } from "@/app/contexts/useSnackBar";
import CloseIcon from "@mui/icons-material/Close";

const Snackbar = () => {
  const { isOpen, onClose, message, status } = useSnackBar();

  return (
    <>
      {isOpen && (
        <div
          className={`absolute ${
            status === "error" ? "bg-red-500" : "bg-green-500"
          }  w-52 rounded-xl p-3 mr-5 mt-5 right-0 top-0 flex justify-between`}
        >
          <div className="text-">{message}</div>
          <CloseIcon className="cursor-pointer" onClick={() => onClose()} />
        </div>
      )}
    </>
  );
};

export default Snackbar;
