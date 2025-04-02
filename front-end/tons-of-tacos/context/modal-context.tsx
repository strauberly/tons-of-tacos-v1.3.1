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
    created: "",
    ready: "",
    closed: "",
  },
  setOrderToView: () => {},
});

export const ModalContextProvider = ({ children }: { children: ReactNode }) => {
  const [modal, setModal] = useState<string>("");
  const [orderToView, setOrderToView] = useState<Order>({
    orderUid: "",
    name: "",
    email: "",
    phone: "",
    orderTotal: 0,
    created: "",
    ready: "",
    closed: "",
  });
  return (
    <ModalContext.Provider
      value={{
        modal,
        setModal,
        orderToView,
        setOrderToView,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);
