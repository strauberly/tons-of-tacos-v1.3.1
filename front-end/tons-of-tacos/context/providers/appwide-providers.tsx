"use client";
import { ReactNode } from "react";
import { OwnerContextProvider } from "../owner-context";
import { DisplayContextProvider } from "../display-context";
import { ModalContextProvider } from "../modal-context";
import { OrdersContextProvider } from "../orders-context";
import { EditOrderContextProvider } from "../edit-order-context";
import { OrderConfirmationContextProvider } from "../order-confirmation-context";
import { MenuContextProvider } from "../menu-context";
import { MenuCategoryContextProvider } from "../menu-category-context";
import { CartContextProvider } from "../cart-context";
import { MenuItemIdContextProvider } from "../menu-item-context";
import { SizeSelectedContextProvider } from "../size-context";

export function AppWideProviders({ children }: { children: ReactNode }) {
  return (
    <ModalContextProvider>
      <OwnerContextProvider>
        <MenuCategoryContextProvider>
          <DisplayContextProvider>{children}</DisplayContextProvider>
        </MenuCategoryContextProvider>
      </OwnerContextProvider>
    </ModalContextProvider>
  );
}
