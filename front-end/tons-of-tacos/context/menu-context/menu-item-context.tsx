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
  menuItemId: string;
  setMenuItemId: Dispatch<SetStateAction<string>>;
}

const MenuItemIdContext = createContext<ContextProps>({
  menuItemId: "",
  setMenuItemId: () => {},
});

export const MenuItemIdContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [menuItemId, setMenuItemId] = useState<string>("");
  return (
    <MenuItemIdContext.Provider
      value={{
        menuItemId,
        setMenuItemId,
      }}
    >
      {children}
    </MenuItemIdContext.Provider>
  );
};

export const useMenuItemIdContext = () => useContext(MenuItemIdContext);
