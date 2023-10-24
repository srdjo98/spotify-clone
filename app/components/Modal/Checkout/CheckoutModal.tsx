"use client";

import { useModel } from "@/app/contexts/modalContext";
import CheckoutStripe from "../../Stripe/CheckoutStripe";
import Modal from "../Modal";

const CheckoutModal = () => {
  const { setIsModalsOpen } = useModel();

  return (
    <Modal
      title="Checkout"
      subTitle="Enter your credentials"
      body={<CheckoutStripe />}
      closeAction={() => setIsModalsOpen({ checkout: false })}
    />
  );
};

export default CheckoutModal;
