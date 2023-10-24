"use client";

import { useModel } from "@/app/contexts/modalContext";
import { useSnackBar } from "@/app/contexts/useSnackBar";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { notify } = useSnackBar();
  const { handleSubmit } = useForm();
  const { priceType, setIsModalsOpen } = useModel();
  const { price, type } = priceType;
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const onSubmit = async () => {
    if (!elements || !stripe) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe?.confirmPayment({
      elements: elements,
      redirect: "if_required",
    });

    if (!error) {
      axios
        .post("/api/payment/success", {
          amount: price,
          type,
          currency: "eur",
        })
        .then(() => {
          setIsProcessing(false);
          router.push(`/overview/account?type=${type}`);
          setIsModalsOpen({ checkout: false });
          notify({
            message: "Payment finished",
            duration: 3000,
            status: "success",
          });
        })
        .catch((e) =>
          notify({
            message: e.message,
            duration: 3000,
            status: "error",
          })
        );
    }
  };

  return (
    <div className="rounded-xl p-5 border border-black mt-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <PaymentElement />
        <button
          disabled={!stripe || !elements}
          className="bg-green-500 mt-3 p-3 rounded-2xl"
        >
          {isProcessing ? "Processing ..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
