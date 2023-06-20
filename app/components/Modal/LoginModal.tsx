"use client";

import { useModel } from "@/app/contexts/modalContext";
import { useSnackBar } from "@/app/contexts/useSnackBar";
import { signIn } from "next-auth/react";
import { Controller, useForm } from "react-hook-form";
import Input from "../Input/Input";
import Modal from "./Modal";

interface FormDataProps {
  email: string;
  password: string;
}

const LoginModal = () => {
  const { notify } = useSnackBar();
  const { setType, onClose } = useModel();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  const onSubmit = (data: FormDataProps) => {
    signIn("credentials", { ...data, redirect: false }).then(() => {
      onClose();
      notify({
        message: "Logged in.",
      });
    });
  };

  const formFields = [
    {
      label: "Email",
      name: "email",
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
      title="Login"
      subTitle="Login to website"
      body={body}
      primaryActionLabel="Login"
      primaryAction={handleSubmit(onSubmit)}
      secondaryActionLabel="Sign Up"
      secondaryAction={() => setType("register")}
    />
  );
};

export default LoginModal;
