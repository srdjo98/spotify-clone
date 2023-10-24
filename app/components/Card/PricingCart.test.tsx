import { PricingCard } from "./PricingCard";
import { render, screen, fireEvent } from "@testing-library/react";

describe("PricingCard", () => {
  it("should display pricing card", async () => {
    const onSubmit = jest.fn();

    render(
      <PricingCard
        title="5.00"
        price={5}
        description="Family plan"
        primaryAction={onSubmit}
        primaryActionLabel="Submit"
      />
    );

    expect(screen.getByText("Submit")).toBeInTheDocument();
    expect(screen.getByText("5.00")).toBeInTheDocument();
    expect(screen.getByText("Family plan")).toBeInTheDocument();
    const submitButton = screen.getByText("Submit");
    expect(submitButton).toBeInTheDocument();

    fireEvent.click(submitButton);
    expect(onSubmit).toBeCalledTimes(1);
  });
});
