"use client";

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  ReactNode,
} from "react";

interface ContextProps {
  showMenu: boolean;
  setShowMenu: Dispatch<SetStateAction<boolean>>;
  showCart: boolean;
  setShowCart: Dispatch<SetStateAction<boolean>>;
  showCustomerInfoForm: boolean;
  setShowCustomerInfoForm: Dispatch<SetStateAction<boolean>>;
  showAlert: boolean;
  setShowAlert: Dispatch<SetStateAction<boolean>>;
  showOrderConfirmation: boolean;
  setShowOrderConfirmation: Dispatch<SetStateAction<boolean>>;
}

const DisplayContext = createContext<ContextProps>({
  showMenu: false,
  setShowMenu: () => {},
  showCart: false,
  setShowCart: () => {},
  showCustomerInfoForm: false,
  setShowCustomerInfoForm: () => {},
  showAlert: false,
  setShowAlert: () => {},
  showOrderConfirmation: false,
  setShowOrderConfirmation: () => {},
});

export const DisplayContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showCustomerInfoForm, setShowCustomerInfoForm] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);

  return (
    <DisplayContext.Provider
      value={{
        showMenu,
        setShowMenu,
        showCart,
        setShowCart,
        showCustomerInfoForm,
        setShowCustomerInfoForm,
        showAlert,
        setShowAlert,
        showOrderConfirmation,
        setShowOrderConfirmation,
      }}
    >
      {children}
    </DisplayContext.Provider>
  );
};

export const useDisplayContext = () => useContext(DisplayContext);
