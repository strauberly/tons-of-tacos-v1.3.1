"use client";
import classes from "./order-confirmation.module.css";
import { useDisplayContext } from "@/context/display-context";
import { useRouter } from "next/navigation";
import { CreateCart, ResetCart } from "@/lib/cart";
import { useCartContext } from "@/context/cart-context";
import { useOrderConfirmationContext } from "@/context/order-confirmation-context";

export default function OrderConfirmation() {
  const { showOrderConfirmation, setShowOrderConfirmation } =
    useDisplayContext();
  const { setCartQuantity } = useCartContext();
  const { orderConfirmation } = useOrderConfirmationContext();
  const router = useRouter();

  // console.log(orderConfirmation);
  return (
    <>
      {showOrderConfirmation && (
        <div className={classes.alertBackdrop}>
          <div className={classes.alert}>
            <div className={classes.alertBackground}>
              <pre>
                <p>{orderConfirmation}</p>
              </pre>
              <button
                className={classes.close}
                onClick={() => {
                  setShowOrderConfirmation(false);
                  ResetCart();
                  CreateCart();
                  setCartQuantity(0);
                  router.push("/");
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
