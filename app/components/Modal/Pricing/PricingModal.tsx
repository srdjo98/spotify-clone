"use client";

import { useModel } from "@/app/contexts/modalContext";
import { PricingCard, PricingCardProp } from "../../Card/PricingCard";

interface PricingModalProps {
  currentType?: string;
}

const PricingModal = ({ currentType = "" }: PricingModalProps) => {
  const { setPriceType, setIsModalsOpen } = useModel();

  const pricingPlans: PricingCardProp[] = [
    {
      title: "Free",
      price: 0.0,
      description: "Play music for free with ads",
      primaryActionLabel: "Base",
      isDisabled: true,
    },
    {
      title: "Premium",
      price: 5.99,
      description: "Enjoy in unlimited music",
      primaryActionLabel: "Get Started",
      primaryAction: (price) => {
        setPriceType(price, "Premium");
        setIsModalsOpen({ checkout: true });
      },
      isZoomedIn: true,
    },
    {
      title: "Family",
      price: 15.99,
      description: "Enjoy in unlimited music",
      primaryActionLabel: "Get Started",
      primaryAction: (price) => {
        setPriceType(price, "Family");
        setIsModalsOpen({ checkout: true });
      },
    },
  ];

  return (
    <div className="bg-gray-500 rounded-t-xl flex justify-center gap-2 p-8">
      {pricingPlans.map((plan: PricingCardProp) => (
        <PricingCard
          key={plan.title}
          title={plan.title}
          price={plan.price}
          description={plan.description}
          primaryAction={() => plan.primaryAction?.(plan.price)}
          primaryActionLabel={plan.primaryActionLabel}
          isZoomedIn={plan.isZoomedIn}
          isDisabled={plan.isDisabled || plan.title === currentType}
        />
      ))}
    </div>
  );
};

export default PricingModal;
