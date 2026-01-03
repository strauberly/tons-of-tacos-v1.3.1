import type { Metadata } from "next";
import "./globals.css";
import MainHeader from "../components/header/main-header/main-header";
import { inter } from "../components/ui/fonts/fonts";

import OrderConfirmation from "@/components/modal/confirmations/order-confirmation";
import Footer from "@/components/footer/footer";
import Modal from "@/components/modal/modal";
import { AppWideProviders } from "@/context/providers/appwide-providers";
import { OrdersContextProvider } from "@/context/orders-context";
import { SizeSelectedContextProvider } from "@/context/size-context";
import { OrderConfirmationContextProvider } from "@/context/order-confirmation-context";
import { EditOrderContextProvider } from "@/context/edit-order-context";
import { OrdersProviders } from "@/context/providers/orders-providers";

export const metadata: Metadata = {
  title: "Tons Of Tacos",
  description: "Our delicious food brought to you.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="html">
      <body className={`${inter.variable}`}>
        <AppWideProviders>
          <Modal />
          <OrdersProviders>
            <MainHeader />
            <SizeSelectedContextProvider>
              <div id="page-container">
                <div id="content-wrap">
                  <div className="children">{children}</div>
                </div>
                <Footer />
              </div>
            </SizeSelectedContextProvider>
          </OrdersProviders>
        </AppWideProviders>
      </body>
    </html>
  );
}
