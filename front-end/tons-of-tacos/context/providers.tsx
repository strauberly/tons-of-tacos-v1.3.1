"use client";

import { ReactNode } from "react";
import { MenuCategoryContextProvider } from "./menu-category-context";
import { DisplayContextProvider } from "./display-context";
import { CartContextProvider } from "./cart-context";
import { MenuContextProvider } from "./menu-context";
import { ModalContextProvider } from "./modal-context";
import { OrderConfirmationContextProvider } from "./order-confirmation-context";
import { SizeSelectedContextProvider } from "./size-context";
import { MenuItemIdContextProvider } from "./menu-item-context";
import { OwnerTokenContextProvider } from "./owner-context";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ModalContextProvider>
      <OwnerTokenContextProvider>
        <MenuItemIdContextProvider>
          <DisplayContextProvider>
            <SizeSelectedContextProvider>
              <OrderConfirmationContextProvider>
                <CartContextProvider>
                  <MenuCategoryContextProvider>
                    <MenuContextProvider>{children}</MenuContextProvider>
                  </MenuCategoryContextProvider>
                </CartContextProvider>
              </OrderConfirmationContextProvider>
            </SizeSelectedContextProvider>
          </DisplayContextProvider>
        </MenuItemIdContextProvider>
      </OwnerTokenContextProvider>
    </ModalContextProvider>
  );
}
