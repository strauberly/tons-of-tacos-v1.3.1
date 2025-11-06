import type { Metadata } from "next";
import "./globals.css";
import MainHeader from "../components/header/main-header/main-header";
import { inter } from "../components/ui/fonts/fonts";
import { Providers } from "@/context/providers";
import OrderConfirmation from "@/components/modal/order-confirmation";
import Footer from "@/components/footer/footer";
import Modal from "@/components/modal/modal";

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
        <Providers>
          <Modal />
          <MainHeader />
          <OrderConfirmation />
          <div id="page-container">
            <div id="content-wrap">
              <div className="children">{children}</div>
            </div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
