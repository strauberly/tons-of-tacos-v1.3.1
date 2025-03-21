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
}

const OwnerContext = createContext<ContextProps>({
  login: { token: "null", ownerName: "null" },
  setLogin: () => {},
  loggedIn: false,
  setLoggedIn: () => {},
});

export const OwnerContextProvider = ({ children }: { children: ReactNode }) => {
  const [login, setLogin] = useState<OwnerLogin>({ token: "", ownerName: "" });
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <OwnerContext.Provider value={{ login, setLogin, loggedIn, setLoggedIn }}>
      {children}
    </OwnerContext.Provider>
  );
};

export const useOwnerContext = () => useContext(OwnerContext);
