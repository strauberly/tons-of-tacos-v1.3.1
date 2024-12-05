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
  alert: string;
  setAlert: Dispatch<SetStateAction<string>>;
}

const AlertContext = createContext<ContextProps>({
  alert: "",
  setAlert: () => {},
});

export const AlertContextProvider = ({ children }: { children: ReactNode }) => {
  const [alert, setAlert] = useState<string>("");
  return (
    <AlertContext.Provider
      value={{
        alert,
        setAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export const useAlertContext = () => useContext(AlertContext);
