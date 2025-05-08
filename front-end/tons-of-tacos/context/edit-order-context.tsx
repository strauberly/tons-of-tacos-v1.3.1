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
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  menuItem: MenuItem;
  setMenuItem: Dispatch<SetStateAction<MenuItem>>;
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
  customerName: string;
  setCustomerName: Dispatch<SetStateAction<string>>;
  menuItemSize: string;
  setMenuItemSize: Dispatch<SetStateAction<string>>;

  orderItem: OrderItem;
  setOrderItem: Dispatch<SetStateAction<OrderItem>>;
  itemSize: string;
  setItemSize: Dispatch<SetStateAction<string>>;
}

const EditOrderContext = createContext<ContextProps>({
  message: "",
  setMessage: () => {},
  title: "",
  setTitle: () => {},
  itemSize: "",
  setItemSize: () => {},
  menuItem: {
    id: "",
    itemName: "",
    category: "",
    imageUrl: "",
    description: "",
    itemSize: "",
    unitPrice: 0,
  },
  setMenuItem: () => {},
  quantity: 0,
  setQuantity: () => {},
  customerName: "",
  setCustomerName: () => {},
  menuItemSize: "",
  setMenuItemSize: () => {},
  orderItem: {
    orderItemId: 0,
    itemName: "",
    quantity: 0,
    size: "",
    total: 0,
  },
  setOrderItem: () => {},
});

export const EditOrderContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [message, setMessage] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [menuItemSize, setMenuItemSize] = useState<string>("");
  const [menuItem, setMenuItem] = useState<MenuItem>({
    id: "",
    itemName: "",
    category: "",
    imageUrl: "",
    description: "",
    itemSize: "",
    unitPrice: 0,
  });
  const [customerName, setCustomerName] = useState<string>("");
  const [itemSize, setItemSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [orderItem, setOrderItem] = useState<OrderItem>({
    orderItemId: 0,
    itemName: "",
    quantity: 0,
    size: "",
    total: 0,
  });
  return (
    <EditOrderContext.Provider
      value={{
        message,
        setMessage,
        title,
        setTitle,
        menuItem,
        setMenuItem,
        quantity,
        setQuantity,
        customerName,
        setCustomerName,
        menuItemSize,
        setMenuItemSize,
        orderItem,
        setOrderItem,
        itemSize,
        setItemSize,
      }}
    >
      {children}
    </EditOrderContext.Provider>
  );
};

export const useEditOrderContext = () => useContext(EditOrderContext);
