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
});

export const OwnerContextProvider = ({ children }: { children: ReactNode }) => {
  const [login, setLogin] = useState<OwnerLogin>({ token: "", ownerName: "" });
  const [loggedIn, setLoggedIn] = useState(false);
  const [ownerOrder, setOwnerOrder] = useState(false);
  const [order, setOrder] = useState<CartItem[]>([]);

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
      }}
    >
      {children}
    </OwnerContext.Provider>
  );
};

export const useOwnerContext = () => useContext(OwnerContext);
