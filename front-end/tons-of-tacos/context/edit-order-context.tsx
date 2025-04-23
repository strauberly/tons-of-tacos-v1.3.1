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
}

const EditOrderContext = createContext<ContextProps>({
  message: "",
  setMessage: () => {},
  title: "",
  setTitle: () => {},
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
  const [quantity, setQuantity] = useState<number>(0);
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
      }}
    >
      {children}
    </EditOrderContext.Provider>
  );
};

export const useEditOrderContext = () => useContext(EditOrderContext);
