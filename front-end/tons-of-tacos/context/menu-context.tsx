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
  menuItems: MenuItem[];
  setMenuItems: Dispatch<SetStateAction<MenuItem[]>>;
}

const MenuContext = createContext<ContextProps>({
  menuItems: [],
  setMenuItems: (): MenuItem[] => [],
});

export const MenuContextProvider = ({ children }: { children: ReactNode }) => {
  const [menuItems, setMenuItems] = useState<[] | MenuItem[]>([]);

  return (
    <MenuContext.Provider
      value={{
        menuItems,
        setMenuItems,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenuContext = () => useContext(MenuContext);
