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
  ownerOrder: boolean;
  setOwnerOrder: Dispatch<SetStateAction<boolean>>;
  order: CartItem[];
  setOrder: Dispatch<SetStateAction<CartItem[]>>;
  orderTotal: string;
  setOrderTotal: Dispatch<SetStateAction<string>>;
}

const OrdersContext = createContext<ContextProps>({
  orders: [],
  setOrders: () => {},
  customerOrders: [],
  setCustomerOrders: () => {},
  ownerOrder: false,
  setOwnerOrder: () => {},
  order: [],
  setOrder: () => {},
  orderTotal: "",
  setOrderTotal: () => {},
});

export const OrdersContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [customerOrders, setCustomerOrders] = useState<Order[]>([]);
  const [ownerOrder, setOwnerOrder] = useState(false);
  const [order, setOrder] = useState<CartItem[]>([]);
  const [orderTotal, setOrderTotal] = useState<string>("");

  return (
    <OrdersContext.Provider
      value={{
        orders,
        setOrders,
        customerOrders,
        setCustomerOrders,
        ownerOrder,
        setOwnerOrder,
        order,
        setOrder,
        orderTotal,
        setOrderTotal,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrdersContext = () => useContext(OrdersContext);
