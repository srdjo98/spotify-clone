import { ModalContext } from "@/app/contexts/modalContext";
import { SnackBarContext } from "@/app/contexts/useSnackBar";
import { fireEvent, render, screen } from "@testing-library/react";
import RegisterModal from "./RegisterModal";

const snackbarContextValues = {
  isOpen: true,
  notify: jest.fn(),
  message: "success",
  onClose: jest.fn(),
  onOpen: jest.fn(),
  status: "success" as any,
};

const modalContext = {
  isOpen: true,
  type: "",
  price: 0,
  onClose: jest.fn(),
  onOpen: jest.fn(),
  setType: jest.fn(),
  setPrice: jest.fn(),
};

describe("RegisterModal", () => {
  it("should register the user", async () => {
    render(
      <SnackBarContext.Provider value={snackbarContextValues}>
        <ModalContext.Provider value={modalContext}>
          <RegisterModal />
        </ModalContext.Provider>
      </SnackBarContext.Provider>
    );

    const signUps = screen.getAllByText("Sign Up");
    expect(signUps.length).toBe(2);

    expect(
      screen.getByText("Sign Up to get better features.")
    ).toBeInTheDocument();
    expect(screen.getByText("Name:")).toBeInTheDocument();
    expect(screen.getByText("Email:")).toBeInTheDocument();
    expect(screen.getByText("Password:")).toBeInTheDocument();

    expect(signUps[1]).toBeInTheDocument();
    fireEvent.click(signUps[1]);
    const requiredFields = await screen.findAllByText("Required field.");
    expect(requiredFields.length).toBe(3);
  });
});
