"use client";
import { RemoveCartItem } from "@/lib/cart";
import classes from "./remove-from-cart.module.css";
import { useCartContext } from "@/context/cart-context";
import { useOwnerContext } from "@/context/owner-context";
import {
  GetOwnerOrder,
  RemoveFromOwnerOrder,
} from "@/lib/owners-tools/owners-tools-client";
// import { useEffect } from "react";

export default function Remove(props: {
  menuId: string;
  cartItemQuantity: number;
}) {
  const { cartQuantity, setCartQuantity, setItemRemoved } = useCartContext();
  const { ownerOrder, setOrder } = useOwnerContext();

  // useEffect(() => {
  //   setCart(GetCart());
  // });

  function checkOrderContext() {
    if (ownerOrder) {
      return [
        console.log("id" + props.menuId),
        RemoveFromOwnerOrder(props.menuId),
        setOrder(GetOwnerOrder()),
      ];
    } else {
      return [
        ,
        console.log("id" + props.menuId),
        RemoveCartItem(props.menuId),
        setCartQuantity(cartQuantity - props.cartItemQuantity),
        setItemRemoved(true),
      ];
    }
  }

  return (
    <button
      className={classes.remove}
      onClick={() => [
        console.log("id: " + props.id),
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
