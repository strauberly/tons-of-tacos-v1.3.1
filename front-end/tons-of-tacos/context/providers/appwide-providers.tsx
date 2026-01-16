"use client";
import { ReactNode } from "react";
import { OwnerContextProvider } from "@/context/session-context/owner-context";
import { DisplayContextProvider } from "../display-context";
import { ModalContextProvider } from "../menu-context/modal-context";
import { MenuCategoryContextProvider } from "../menu-context/menu-category-context";
import { CartContextProvider } from "../cart-context";
import { ErrorContextProvider } from "../error-context";

export function AppWideProviders({ children }: { children: ReactNode }) {
  return (
    <ErrorContextProvider>
      <OwnerContextProvider>
        <CartContextProvider>
          <DisplayContextProvider>
            <ModalContextProvider>
              <MenuCategoryContextProvider>
                {children}
              </MenuCategoryContextProvider>
            </ModalContextProvider>
          </DisplayContextProvider>
        </CartContextProvider>
      </OwnerContextProvider>
    </ErrorContextProvider>
  );
}
