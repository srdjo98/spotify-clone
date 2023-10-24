"use client";

import { queryClient } from "@/app/ClientLayout";
import { useModel } from "@/app/contexts/modalContext";
import { useSnackBar } from "@/app/contexts/useSnackBar";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import Input from "../../Input/Input";
import Modal from "../Modal";

interface FormData {
  title: string;
  description: string;
}

const EditModal = () => {
  const { playlistId } = useParams();
  const router = useRouter();
  const { setIsModalsOpen } = useModel();
  const { notify } = useSnackBar();
  const { handleSubmit, control } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    axios
      .post(`/api/playlist/${playlistId}`, {
        ...data,
        playlistId,
      })
      .then(() => {
        notify({
          message: "Updated",
          status: "success",
        });
        router.refresh();
        setIsModalsOpen({ edit: false });
        queryClient.invalidateQueries({ queryKey: ["playlists"] });
      });
  };

  const formFields = [
    {
      label: "Title",
      name: "title",
      defaultValue: "",
    },
    {
      label: "Description",
      name: "description",
      defaultValue: "",
    },
  ];

  const body = (
    <div className="flex justify-between">
      <div className="flex gap-5">
        {formFields.map((field) => (
          <div key={field.name}>
            <span>{field.label}</span>
            <div>
              <Controller
                name={field.name as "title" | "description"}
                control={control}
                defaultValue={field.defaultValue}
                render={({ field: controllerField }) => (
                  <Input
                    field={controllerField}
                    defaultValue={field.defaultValue}
                  />
                )}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Modal
      title="Edit Modal"
      body={body}
      primaryActionLabel="Save"
      primaryAction={handleSubmit(onSubmit)}
      closeAction={() => setIsModalsOpen({ edit: false })}
    />
  );
};

export default EditModal;
