"use client";
import { RemoveCartItem } from "@/lib/cart";
import classes from "./remove-from-cart.module.css";
import { useCartContext } from "@/context/cart-context";
import { useOwnerContext } from "@/context/order-context/owner-context";
import {
  GetOwnerOrder,
  RemoveFromOwnerOrder,
} from "@/lib/owners-tools/owners-tools-client";
// import { useEffect } from "react";

export default function Remove(props: {
  id: string;
  cartItemQuantity: number;
}) {
  const { cartQuantity, setCartQuantity, setItemRemoved } = useCartContext();
  const { ownerOrder, setOrder } = useOwnerContext();

  // useEffect(() => {
  //   setCart(GetCart());
  // });

  function checkOrderContext() {
    console.log("id: " + props.id);
    if (ownerOrder) {
      return [
        console.log(props.id),
        RemoveFromOwnerOrder(props.id),
        setOrder(GetOwnerOrder()),
      ];
    } else {
      return [
        ,
        setItemRemoved(true),
        RemoveCartItem(props.id),
        setCartQuantity(cartQuantity - props.cartItemQuantity),
      ];
    }
  }

  return (
    <button
      className={classes.remove}
      onClick={() => [
        // console.log(props.id),
        checkOrderContext(),
        // setItemRemoved(true),
        // RemoveCartItem(props.id),
        // setCartQuantity(cartQuantity - props.cartItemQuantity),
      ]}
    >
      Remove
    </button>
  );
}
