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
  login: OwnerLogin;
  setLogin: Dispatch<SetStateAction<OwnerLogin>>;
  loggedIn: boolean;
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
  ownerOrder: boolean;
  setOwnerOrder: Dispatch<SetStateAction<boolean>>;
  order: CartItem[];
  setOrder: Dispatch<SetStateAction<CartItem[]>>;
  // order: OrderItem[];
  // setOrder: Dispatch<SetStateAction<OrderItem[]>>;
  orderTotal: string;
  setOrderTotal: Dispatch<SetStateAction<string>>;
}

const OwnerContext = createContext<ContextProps>({
  login: { token: "null", ownerName: "null" },
  setLogin: () => {},
  loggedIn: false,
  setLoggedIn: () => {},
  ownerOrder: false,
  setOwnerOrder: () => {},
  order: [],
  setOrder: () => {},
  orderTotal: "",
  setOrderTotal: () => {},
});

export const OwnerContextProvider = ({ children }: { children: ReactNode }) => {
  const [login, setLogin] = useState<OwnerLogin>({ token: "", ownerName: "" });
  const [loggedIn, setLoggedIn] = useState(false);
  const [ownerOrder, setOwnerOrder] = useState(false);
  // const [order, setOrder] = useState<OrderItem[]>([]);
  const [order, setOrder] = useState<CartItem[]>([]);
  const [orderTotal, setOrderTotal] = useState<string>("");

  return (
    <OwnerContext.Provider
      value={{
        login,
        setLogin,
        loggedIn,
        setLoggedIn,
        ownerOrder,
        setOwnerOrder,
        order,
        setOrder,
        orderTotal,
        setOrderTotal,
      }}
    >
      {children}
    </OwnerContext.Provider>
  );
};

export const useOwnerContext = () => useContext(OwnerContext);
