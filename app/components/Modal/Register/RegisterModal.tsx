"use client";

import { useModel } from "@/app/contexts/modalContext";
import { useSnackBar } from "@/app/contexts/useSnackBar";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import Input from "../../Input/Input";
import Modal from "../Modal";

const RegisterModal = () => {
  const { setIsModalsOpen } = useModel();
  const { notify } = useSnackBar();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleOnSubmit = (data: any) => {
    axios
      .post("/api/register", {
        ...data,
      })
      .then(() => {
        setIsModalsOpen({ register: false });
        notify({
          message: "Registered!",
        });
      })
      .catch((e) => console.log(e.message));
  };

  const formFields = [
    {
      label: "Name",
      name: "name",
      type: "text",
      defaultValue: "",
      options: {
        required: {
          value: true,
          message: "Required field.",
        },
      },
    },
    {
      label: "Email",
      name: "email",
      type: "text",
      defaultValue: "",
      options: {
        optionFields: [
          {
            label: "VW",
            value: "vw",
          },
          {
            label: "Audi",
            value: "audi",
          },
        ],
        required: {
          value: true,
          message: "Required field.",
        },
      },
    },
    {
      label: "Password",
      name: "password",
      type: "text",
      defaultValue: "",
      options: {
        required: {
          value: true,
          message: "Required field.",
        },
      },
    },
  ];

  const body = (
    <form>
      {formFields.map((field) => (
        <div key={field.name}>
          <div className="pb-2 text-lg pt-3 flex justify-between">
            <div>
              {field?.options?.required && <span className="pr-1">*</span>}
              {field.label}:
            </div>
            <div className="text-sm pt-2 text-red-400 font-bold ">
              {errors?.[field.name]?.message as string}
            </div>
          </div>
          <Controller
            name={field.name}
            control={control}
            defaultValue={field.defaultValue}
            rules={{ required: field?.options?.required }}
            render={({ field: controllerField }) => (
              <Input
                type={field.type}
                field={controllerField}
                defaultValue={field.defaultValue}
                options={field.options}
              />
            )}
          />
        </div>
      ))}
    </form>
  );

  return (
    <Modal
      title="Sign Up"
      subTitle="Sign Up to get better features."
      body={body}
      primaryActionLabel="Sign Up"
      primaryAction={() => handleSubmit(handleOnSubmit)()}
      closeAction={() => setIsModalsOpen({ register: false })}
    />
  );
};

export default RegisterModal;
