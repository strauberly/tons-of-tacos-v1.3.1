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
  ownerToken: string;
  setOwnerToken: Dispatch<SetStateAction<string>>;
}

const OwnerTokenContext = createContext<ContextProps>({
  ownerToken: "",
  setOwnerToken: () => {},
});

export const OwnerTokenContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [ownerToken, setOwnerToken] = useState<string>("");
  return (
    <OwnerTokenContext.Provider value={{ ownerToken, setOwnerToken }}>
      {children}
    </OwnerTokenContext.Provider>
  );
};

export const useOwnerTokenContext = () => useContext(OwnerTokenContext);
