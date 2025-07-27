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
  customerOrders: Order[];
  setCustomerOrders: Dispatch<SetStateAction<Order[]>>;
}

const OrdersContext = createContext<ContextProps>({
  orders: [],
  setOrders: () => {},
  customerOrders: [],
  setCustomerOrders: () => {},
});

export const OrdersContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [customerOrders, setCustomerOrders] = useState<Order[]>([]);
  return (
    <OrdersContext.Provider
      value={{
        orders,
        setOrders,
        customerOrders,
        setCustomerOrders,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrdersContext = () => useContext(OrdersContext);
