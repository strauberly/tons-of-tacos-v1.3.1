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
  menuCategories: Category[];
  setMenuCategories: Dispatch<SetStateAction<Category[]>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const MenuCategoryContext = createContext<ContextProps>({
  menuCategories: [],
  setMenuCategories: (): Category[] => [],
  isLoading: false,
  setIsLoading: () => {},
});

export const MenuCategoryContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [categories, setMenuCategories] = useState<[] | Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <MenuCategoryContext.Provider
      value={{
        menuCategories: categories,
        setMenuCategories: setMenuCategories,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </MenuCategoryContext.Provider>
  );
};

export const useMenuCategoryContext = () => useContext(MenuCategoryContext);
