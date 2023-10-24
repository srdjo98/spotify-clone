import { ModalContext } from "@/app/contexts/modalContext";
import { fireEvent, render, screen } from "@testing-library/react";
import Modal from "./Modal";

const modalContext = {
  isOpen: true,
  type: "",
  price: 0,
  onClose: jest.fn(),
  onOpen: jest.fn(),
  setType: jest.fn(),
  setPrice: jest.fn(),
};

describe("Modal", () => {
  it("should display working modal", () => {
    const primaryAction = jest.fn();
    const secondaryAction = jest.fn();
    const onClose = jest.fn();

    render(
      <ModalContext.Provider value={modalContext}>
        <Modal
          title="Checkout"
          subTitle="follow thru with checkout"
          body={<div>hello body</div>}
          primaryAction={primaryAction}
          primaryActionLabel="Buy"
          secondaryAction={secondaryAction}
          secondaryActionLabel="Back"
          closeAction={onClose}
        />
      </ModalContext.Provider>
    );

    expect(screen.getByText("Checkout")).toBeInTheDocument();
    expect(screen.getByText("follow thru with checkout")).toBeInTheDocument();
    expect(screen.getByText("hello body")).toBeInTheDocument();
    const buyButton = screen.getByText("Buy");
    expect(buyButton).toBeInTheDocument();
    const backButton = screen.getByText("Back");
    expect(backButton).toBeInTheDocument();

    fireEvent.click(buyButton);
    expect(primaryAction).toBeCalledTimes(1);
    fireEvent.click(backButton);
    expect(secondaryAction).toBeCalledTimes(1);
    const closeButton = screen.getByTestId("close-modal");
    fireEvent.click(closeButton);
    expect(onClose).toBeCalledTimes(1);
  });

  it("should display required props modal", async () => {
    const primaryAction = jest.fn();

    render(
      <ModalContext.Provider value={modalContext}>
        <Modal
          title="Checkout"
          subTitle="follow thru with checkout"
          body={<div>hello body</div>}
          primaryAction={primaryAction}
          primaryActionLabel="Buy"
        />
      </ModalContext.Provider>
    );

    expect(screen.getByText("Checkout")).toBeInTheDocument();
    expect(screen.getByText("follow thru with checkout")).toBeInTheDocument();
    expect(screen.getByText("hello body")).toBeInTheDocument();

    const primaryButton = screen.getByText("Buy");
    expect(primaryButton).toBeInTheDocument();
    fireEvent.click(primaryButton);
    expect(primaryAction).toBeCalledTimes(1);

    const closeButton = screen.getByTestId("close-modal");
    expect(closeButton).toBeInTheDocument();
    fireEvent.click(closeButton);

    // await waitFor(() => {
    //   expect(screen.queryByText("Checkout")).not.toBeInTheDocument();
    // });
  });
});
