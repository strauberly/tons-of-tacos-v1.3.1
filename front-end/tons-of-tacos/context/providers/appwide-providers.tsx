"use client";
import { ReactNode } from "react";
import { OwnerContextProvider } from "../owner-context";
import { DisplayContextProvider } from "../display-context";
import { ModalContextProvider } from "../modal-context";
import { MenuCategoryContextProvider } from "../menu-category-context";
import { CartContextProvider } from "../cart-context";
import { SizeSelectedContextProvider } from "../size-context";

export function AppWideProviders({ children }: { children: ReactNode }) {
  return (
    <DisplayContextProvider>
      <ModalContextProvider>
        <OwnerContextProvider>
          <CartContextProvider>
            <MenuCategoryContextProvider>
              {children}
            </MenuCategoryContextProvider>
          </CartContextProvider>
        </OwnerContextProvider>
      </ModalContextProvider>
    </DisplayContextProvider>
  );
}
