"use client";

import { useModel } from "@/app/contexts/modalContext";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import Spinner from "../Spinner/Spinner";
import CheckoutForm from "./CheckoutForm";

const CheckoutStripe = () => {
  const { priceType, setIsModalsOpen } = useModel();
  const [isUpgrading, setIsUpgrading] = useState<boolean>(true);
  const { price, type } = priceType;

  const { data, isFetching } = useQuery(["profile-checkout", price, type], () =>
    axios
      .post("/api/payment", { amount: price, type, currency: "eur" })
      .then((res) => res.data)
  );

  if (isFetching) {
    return (
      <div className="pt-6">
        <Spinner />
      </div>
    );
  }

  const { clientSecret, stripePromise, isExistingSubscription } = data;

  if (isExistingSubscription && isUpgrading) {
    return (
      <div className="flex flex-col">
        <div>You already have an existing subscription.</div>
        <div className="font-bold text-xl">
          Are you sure you want to change to a new subscription plan?
          <br />
          <span className="text-red-500 text-sm mt-2">
            Note - changing to a new subscription will lose your previous one
            and the end date will be calculated from new subscriptions start time
          </span>
        </div>
        <div className="flex justify-between pt-3">
          <button
            className="bg-green-500 p-2 rounded-md"
            onClick={() => setIsUpgrading(false)}
          >
            Yes
          </button>
          <button
            className="bg-red-500 p-2 rounded-md"
            onClick={() => setIsModalsOpen({ checkout: false })}
          >
            No
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {clientSecret && stripePromise && (
        <Elements
          stripe={loadStripe(stripePromise)}
          options={{
            clientSecret,
            appearance: {
              theme: "night",
              labels: "floating",
            },
          }}
        >
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
};

export default CheckoutStripe;
