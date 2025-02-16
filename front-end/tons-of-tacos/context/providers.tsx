"use client";

import { ReactNode } from "react";
import { MenuCategoryContextProvider } from "./menu-category-context";
import { DisplayContextProvider } from "./display-context";
import { CartContextProvider } from "./cart-context";
import { MenuContextProvider } from "./menu-context";
import { AlertContextProvider } from "./alert-context";
import { OrderConfirmationContextProvider } from "./order-confirmation-context";
import { SizeSelectedContextProvider } from "./size-context";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AlertContextProvider>
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
    </AlertContextProvider>
  );
}
