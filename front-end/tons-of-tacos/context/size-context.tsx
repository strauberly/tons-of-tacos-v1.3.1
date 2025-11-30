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
  selectedSize: string;
  setSelectedSize: Dispatch<SetStateAction<string>>;
}

const SizeSelectedContext = createContext<ContextProps>({
  selectedSize: "",
  setSelectedSize: () => {},
});

export const SizeSelectedContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [selectedSize, setSelectedSize] = useState<string>("NA");
  return (
    <SizeSelectedContext.Provider value={{ selectedSize, setSelectedSize }}>
      {children}
    </SizeSelectedContext.Provider>
  );
};

export const useSelectedSizeContext = () => useContext(SizeSelectedContext);
