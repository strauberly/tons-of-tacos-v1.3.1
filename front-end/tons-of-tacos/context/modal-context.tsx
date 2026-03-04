"use client";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface ContextProps {
  modalMessage: string;
  setModalMessage: Dispatch<SetStateAction<string>>;
  orderToView: Order;
  setOrderToView: Dispatch<SetStateAction<Order>>;
  confirmationTitle: string;
  setConfirmationTitle: Dispatch<SetStateAction<string>>;
}

const ModalContext = createContext<ContextProps>({
  modalMessage: "",
  setModalMessage: () => {},
  orderToView: {
    orderUid: "",
    customerUid: "",
    name: "",
    email: "",
    phone: "",
    orderTotal: 0,
    orderItems: [],
    created: "",
    ready: "",
    closed: "",
  },
  setOrderToView: () => {},
  confirmationTitle: "",
  setConfirmationTitle: () => {},
});

export const ModalContextProvider = ({ children }: { children: ReactNode }) => {
  const [modalMessage, setModalMessage] = useState<string>("");
  const [orderToView, setOrderToView] = useState<Order>({
    orderUid: "",
    customerUid: "",
    name: "",
    email: "",
    phone: "",
    orderTotal: 0,
    orderItems: [],
    created: "",
    ready: "",
    closed: "",
  });
  const [confirmationTitle, setConfirmationTitle] = useState<string>("");
  return (
    <ModalContext.Provider
      value={{
        modalMessage,
        setModalMessage,
        orderToView,
        setOrderToView,
        confirmationTitle,
        setConfirmationTitle,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);
