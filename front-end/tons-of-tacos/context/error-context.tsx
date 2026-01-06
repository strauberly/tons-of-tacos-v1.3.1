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
  error: boolean;
  setError: Dispatch<SetStateAction<boolean>>;
  errorMessage: string;
  setErrorMessage: Dispatch<SetStateAction<string>>;
}

const ErrorContext = createContext<ContextProps>({
  error: false,
  setError: () => {},
  errorMessage: "",
  setErrorMessage: () => {},
});

export const ErrorContextProvider = ({ children }: { children: ReactNode }) => {
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  return (
    <ErrorContext.Provider
      value={{
        error,
        setError,
        errorMessage,
        setErrorMessage,
      }}
    >
      {children}
    </ErrorContext.Provider>
  );
};

export const useErrorContext = () => useContext(ErrorContext);
