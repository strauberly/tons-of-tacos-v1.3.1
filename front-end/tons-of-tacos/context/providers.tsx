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
import { OwnerContextProvider } from "./owner-context";
import { OrdersContextProvider } from "./orders-context";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ModalContextProvider>
      <OwnerContextProvider>
        <OrdersContextProvider>
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
        </OrdersContextProvider>
      </OwnerContextProvider>
    </ModalContextProvider>
  );
}
