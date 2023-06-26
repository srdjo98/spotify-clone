"use client";

import { useAudioPlayer } from "@/app/contexts/audioPlayerContext";
import { useModel } from "@/app/contexts/modalContext";
import Image from "next/image";
import { SongProps } from "../TableList";
import Modal from "./Modal";

const AdModal = ({ song }: { song: SongProps }) => {
  const {
    resetSkipCount,
    onClose: onClosePlayer,
    setDisabled,
  } = useAudioPlayer();
  const { onClose: onCloseModal } = useModel();

  const handleClose = () => {
    onClosePlayer();
    setDisabled();
    resetSkipCount();
    onCloseModal();
  };

  return (
    <Modal
      title={song.title}
      body={
        <Image
          src={`/../public/images/${song.imageUrl}`}
          height={650}
          width={650}
          alt={song.title}
        />
      }
      closeAction={handleClose}
    />
  );
};

export default AdModal;
