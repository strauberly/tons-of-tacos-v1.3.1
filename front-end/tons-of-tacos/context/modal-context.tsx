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
  modal: string;
  setModal: Dispatch<SetStateAction<string>>;
  orderToView: Order;
  setOrderToView: Dispatch<SetStateAction<Order>>;
  confirmationTitle: string;
  setConfirmationTitle: Dispatch<SetStateAction<string>>;
}

const ModalContext = createContext<ContextProps>({
  modal: "",
  setModal: () => {},
  orderToView: {
    orderUid: "",
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
  const [modal, setModal] = useState<string | undefined>("");
  const [orderToView, setOrderToView] = useState<Order>({
    orderUid: "",
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
        modal,
        setModal,
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
