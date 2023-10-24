"use client";

import CheckoutModal from "@/app/components/Modal/Checkout/CheckoutModal";
import PricingModal from "@/app/components/Modal/Pricing/PricingModal";
import Spinner from "@/app/components/Spinner/Spinner";
import { useModel } from "@/app/contexts/modalContext";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useQuery } from "react-query";
import OverviewLayout from "../OverviewLayout";

const AccountPage = () => {
  const { isModalsOpen } = useModel();
  const searchParams = useSearchParams();
  const paymentType = searchParams.get("type");

  const { data, isError, isFetching } = useQuery(["profile", paymentType], () =>
    axios.get("/api/profile").then((res) => res.data)
  );

  if (isFetching) {
    return <Spinner />;
  }

  if (isError) {
    return <p>Refresh something went wrong</p>;
  }

  const { subscription } = data;

  let endData: Date = new Date(subscription.updateAt);
  endData.setMonth(endData.getMonth() + 1);

  return (
    <OverviewLayout>
      <>
        <div className="p-10 text-black">
          <div className="text-3xl font-bold">Profile overview</div>
          <div className="pt-10 pb-7 font-bold text-2xl">Profile</div>
          <div className="grid grid-cols-2 gap-y-5 grid-flow-row text-xl text-gray-500">
            <div>
              Username <hr className="mt-2" />
            </div>
            <div>
              {data.name} <hr className="mt-2" />
            </div>
            <div>
              Email <hr className="mt-2" />
            </div>
            <div>
              {data.email} <hr className="mt-2" />
            </div>
          </div>
          <div className="pt-10">
            <div className="text-2xl font-bold pb-7">
              Your Plan - {subscription?.amount} Monthly Fee
            </div>
            <div className="p-1 bg-gray-300 rounded-lg">
              <div className="p-8">
                <div>{subscription?.subscriptionType?.description}</div>
              </div>
              <div className="bg-gray-400 rounded-b-lg p-8">
                <div className="flex justify-between">
                  <div className="font-bold text-xl">
                    {subscription?.subscriptionType?.title}
                  </div>
                  <div className="flex">
                    End Date -{" "}
                    <p className="underline">
                      {endData.toLocaleString("en-US", { timeZone: "UTC" })}
                    </p>
                  </div>
                </div>
                <div className="pt-4 flex flex-col">
                  Your Family plan allows you to add 4 more registered users
                  (Not Mandatory).
                  <div>
                    <button className="mt-2 bg-green-500 rounded-xl p-2">
                      Add User <AddCircleIcon />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <PricingModal currentType={subscription?.subscriptionType.title} />
        {isModalsOpen.checkout && <CheckoutModal />}
      </>
    </OverviewLayout>
  );
};

export default AccountPage;
