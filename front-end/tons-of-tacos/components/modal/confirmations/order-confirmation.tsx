"use client";
import classes from "./order-confirmation.module.css";
import { useDisplayContext } from "@/context/display-context";
import { useRouter } from "next/navigation";
import { CreateCart, ResetCart } from "@/lib/cart";
import { useCartContext } from "@/context/cart-context";
import { useOrderConfirmationContext } from "@/context/order-context/order-confirmation-context";
import { useOwnerContext } from "@/context/session-context/owner-context";
import { DeleteOwnerOrder } from "@/lib/owners-tools/owners-tools-client";
import { useOrdersContext } from "@/context/order-context/orders-context";
import { GetAllOrders } from "@/lib/owners-tools/owners-tools-server";

export default function OrderConfirmation() {
  const {
    showOrderConfirmation,
    setShowOrderConfirmation,
    setShowOwnerOrderCreator,
  } = useDisplayContext();
  const { setCartQuantity } = useCartContext();
  const { loggedIn, login } = useOwnerContext();
  const { setOrders } = useOrdersContext();

  const { orderConfirmation } = useOrderConfirmationContext();
  const router = useRouter();

  const { setCart } = useCartContext();

  function orderCompletion() {
    if (loggedIn) {
      setShowOwnerOrderCreator(false);
      setShowOrderConfirmation(false);
      DeleteOwnerOrder();
      ResetCart();
      CreateCart();
      setCart([]);
      router.push("/owners-tools");
    } else {
      setShowOrderConfirmation(false);
      ResetCart();
      CreateCart();
      setCartQuantity(0);
      router.push("/");
    }
  }

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
                onClick={async () => {
                  orderCompletion();
                  if (loggedIn) {
                    setOrders(await GetAllOrders(login.accessToken));
                  }
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
