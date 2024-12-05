"use client";
import { RemoveCartItem } from "@/lib/cart";
import classes from "./remove-from-cart.module.css";
import { useCartContext } from "@/context/cart-context";
// import { useEffect } from "react";

export default function Remove(props: {
  id: string;
  cartItemQuantity: number;
}) {
  const { cartQuantity, setCartQuantity, setItemRemoved } = useCartContext();

  // useEffect(() => {
  //   setCart(GetCart());
  // });

  return (
    <button
      className={classes.remove}
      onClick={() => [
        setItemRemoved(true),
        RemoveCartItem(props.id),
        setCartQuantity(cartQuantity - props.cartItemQuantity),
      ]}
    >
      Remove
    </button>
  );
}
