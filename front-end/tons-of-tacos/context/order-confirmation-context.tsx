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
  orderConfirmation: string;
  setOrderConfirmation: Dispatch<SetStateAction<string>>;
}

const OrderConfirmationContext = createContext<ContextProps>({
  orderConfirmation: "",
  setOrderConfirmation: () => {},
});

export const OrderConfirmationContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [orderConfirmation, setOrderConfirmation] = useState<string>("");
  return (
    <OrderConfirmationContext.Provider
      value={{
        orderConfirmation,
        setOrderConfirmation,
      }}
    >
      {children}
    </OrderConfirmationContext.Provider>
  );
};

export const useOrderConfirmationContext = () =>
  useContext(OrderConfirmationContext);
