"use client";

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  ReactNode,
} from "react";
// add for display orders by customer
interface ContextProps {
  showMenu: boolean;
  setShowMenu: Dispatch<SetStateAction<boolean>>;
  showCart: boolean;
  setShowCart: Dispatch<SetStateAction<boolean>>;
  showCustomerInfoForm: boolean;
  setShowCustomerInfoForm: Dispatch<SetStateAction<boolean>>;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  showOrderConfirmation: boolean;
  setShowOrderConfirmation: Dispatch<SetStateAction<boolean>>;
  showLogin: boolean;
  setShowLogin: Dispatch<SetStateAction<boolean>>;
  viewOrder: boolean;
  setViewOrder: Dispatch<SetStateAction<boolean>>;
  showConfirmation: boolean;
  setShowConfirmation: Dispatch<SetStateAction<boolean>>;
  showCustomerOrders: boolean;
  setShowCustomerOrders: Dispatch<SetStateAction<boolean>>;
  showOwnerOrderCreator: boolean;
  setShowOwnerOrderCreator: Dispatch<SetStateAction<boolean>>;
}

const DisplayContext = createContext<ContextProps>({
  showMenu: false,
  setShowMenu: () => {},
  showCart: false,
  setShowCart: () => {},
  showCustomerInfoForm: false,
  setShowCustomerInfoForm: () => {},
  showModal: false,
  setShowModal: () => {},
  showOrderConfirmation: false,
  setShowOrderConfirmation: () => {},
  showLogin: false,
  setShowLogin: () => {},
  viewOrder: false,
  setViewOrder: () => {},
  showConfirmation: false,
  setShowConfirmation: () => {},
  showCustomerOrders: false,
  setShowCustomerOrders: () => {},
  showOwnerOrderCreator: false,
  setShowOwnerOrderCreator: () => {},
});

export const DisplayContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showCustomerInfoForm, setShowCustomerInfoForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [viewOrder, setViewOrder] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showCustomerOrders, setShowCustomerOrders] = useState(false);
  const [showOwnerOrderCreator, setShowOwnerOrderCreator] = useState(false);

  return (
    <DisplayContext.Provider
      value={{
        showMenu,
        setShowMenu,
        showCart,
        setShowCart,
        showCustomerInfoForm,
        setShowCustomerInfoForm,
        showModal,
        setShowModal,
        showOrderConfirmation,
        setShowOrderConfirmation,
        showLogin,
        setShowLogin,
        viewOrder,
        setViewOrder,
        showConfirmation,
        setShowConfirmation,
        showCustomerOrders,
        setShowCustomerOrders,
        showOwnerOrderCreator,
        setShowOwnerOrderCreator,
      }}
    >
      {children}
    </DisplayContext.Provider>
  );
};

export const useDisplayContext = () => useContext(DisplayContext);
