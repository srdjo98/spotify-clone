"use client";

export interface PricingCardProp {
  title: string;
  price: number;
  description: string;
  primaryActionLabel: string;
  primaryAction?: (price: any) => void;
  isDisabled?: boolean;
  isZoomedIn?: boolean;
}

export const PricingCard = ({
  title,
  price,
  description,
  primaryAction,
  primaryActionLabel,
  isDisabled = false,
  isZoomedIn = false,
}: PricingCardProp) => (
  <div
    className={`bg-white p-8 rounded-xl text-center text-black ${
      isZoomedIn ? "mt-0" : "mt-10"
    }`}
  >
    <div className={`${isZoomedIn ? "text-3xl" : "text-2xl"}  pb-2`}>
      {title}
    </div>
    <div className="flex pb-3 justify-center">
      <div className={`${isZoomedIn ? "text-3xl" : "text-2xl"} font-bold`}>
        €{price}/
      </div>
      <div className="text-md font-thin text-gray-400 pt-1">mo</div>
    </div>
    <div>{description}</div>
    {primaryActionLabel === "Base" ? (
      <p className="text-xl font-bold mt-7">Base</p>
    ) : (
      <button
        className={`p-2 mt-7 rounded-md ${
          isDisabled ? "bg-slate-500" : "bg-green-500"
        }`}
        onClick={primaryAction}
        disabled={isDisabled}
      >
        {primaryActionLabel}
      </button>
    )}
  </div>
);
