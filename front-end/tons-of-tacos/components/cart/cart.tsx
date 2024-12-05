import classes from "./cart.module.css";
import { GetCart } from "@/lib/cart";
import { useDisplayContext } from "@/context/display-context";
import { useCartContext } from "@/context/cart-context";
import { useEffect, useRef } from "react";
import CustomerInfoForm from "../ui/forms/customer-info-form";
import CartItems from "./cart-item-list";
import { AnimatePresence } from "framer-motion";
import DropDown from "../ui/animations/drop-down";

export default function Cart() {
  const { setShowCart } = useDisplayContext();
  const { cart, setCart } = useCartContext();
  const cartRef = useRef<HTMLDivElement>(null);

  let total = 0;

  function calcTotal() {
    let i;
    for (i = 0; i < cart.length; i++) {
      total += parseFloat(cart[i].price);
    }
    return total;
  }

  useEffect(() => {
    function clickHandler(event: MouseEvent) {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setShowCart(false);
      }
    }
    window.addEventListener("click", clickHandler, true);
    setCart(GetCart());
    return () => window.removeEventListener("click", clickHandler, true);
  }, [cartRef, setCart, setShowCart]);

  return (
    <>
      <AnimatePresence>
        <DropDown>
          <div ref={cartRef} className={classes.cart}>
            <CartItems />
            <p className={classes.total}>Total: $ {calcTotal().toFixed(2)}</p>
            <CustomerInfoForm />
          </div>
        </DropDown>
      </AnimatePresence>
    </>
  );
}
