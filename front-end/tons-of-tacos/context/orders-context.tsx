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
  orders: Order[] | undefined;
  setOrders: Dispatch<SetStateAction<Order[] | undefined>>;
}

const OrdersContext = createContext<ContextProps>({
  orders: [],
  setOrders: () => {},
});

export const OrdersContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [orders, setOrders] = useState<Order[] | undefined>([]);
  return (
    <OrdersContext.Provider
      value={{
        orders,
        setOrders,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrdersContext = () => useContext(OrdersContext);
