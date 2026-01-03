import { ReactNode } from "react";
import { EditOrderContextProvider } from "../edit-order-context";
import { OrderConfirmationContextProvider } from "../order-confirmation-context";
import { OrdersContextProvider } from "../orders-context";
import OrderConfirmation from "@/components/modal/confirmations/order-confirmation";

export function OrdersProviders({ children }: { children: ReactNode }) {
  return (
    <EditOrderContextProvider>
      <OrderConfirmationContextProvider>
        <OrdersContextProvider>
          <OrderConfirmation />
          {children}
        </OrdersContextProvider>
      </OrderConfirmationContextProvider>
    </EditOrderContextProvider>
  );
}
