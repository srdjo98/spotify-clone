"use client";

import { queryClient } from "@/app/ClientLayout";
import { useModel } from "@/app/contexts/modalContext";
import { useSnackBar } from "@/app/contexts/useSnackBar";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import Input from "../Input/Input";
import Modal from "./Modal";

const EditModal = () => {
  const { playlistId } = useParams();
  const router = useRouter();
  const { onClose } = useModel();
  const { notify } = useSnackBar();
  const { handleSubmit, control, register } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    axios
      .post(`/api/playlist/${playlistId}`, {
        data: { ...data, playlistId },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        notify({
          message: "Updated",
          status: "success",
        });
        router.refresh();
        onClose();
        queryClient.invalidateQueries({ queryKey: ["playlists"] });
      });
  };

  const formFields = [
    {
      label: "Title",
      name: "title",
      type: "text",
      defaultValue: "",
    },
    {
      label: "Description",
      name: "description",
      type: "text",
      defaultValue: "",
    },
  ];

  const body = (
    <div className="flex justify-between">
      <div className="flex flex-col gap-5">
        <div className="h-full pt-3">
          <input type="file" {...register("file")} />
        </div>
        {formFields.map((field) => (
          <div key={field.name}>
            <span>{field.label}</span>
            <div>
              <Controller
                name={field.name}
                control={control}
                defaultValue={field.defaultValue}
                render={({ field: controllerField }) => (
                  <Input
                    type={field.type}
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
    />
  );
};

export default EditModal;
