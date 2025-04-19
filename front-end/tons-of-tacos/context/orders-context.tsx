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
  orders: Order[];
  setOrders: Dispatch<SetStateAction<Order[]>>;
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
  const [orders, setOrders] = useState<Order[]>([]);
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
