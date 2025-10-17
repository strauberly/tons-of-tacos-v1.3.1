"use client";

import { useCartContext } from "@/context/cart-context";

import { GetCart, UpdateCart } from "@/lib/cart";

import { useEffect, useState } from "react";

import classes from "./update-cart-item.module.css";
import { useModalContext } from "@/context/modal-context";
import { useDisplayContext } from "@/context/display-context";
import { useOwnerContext } from "@/context/owner-context";
import {
  GetOwnerOrder,
  updateOwnerOrder,
} from "@/lib/owners-tools/owners-tools-client";
import CartQuantity from "../../badges/cart-quantity";

export default function Update(props: {
  cartItem: string;
  updatedItemQuantity: number;
  updatedItemPrice: string;
  oldQuantity: number;
  oldSize: string;
  newSize: string;
}) {
  // get index of the the item already in cart
  const { cart, setCart, cartQuantity, setCartQuantity } = useCartContext();
  const { ownerOrder } = useOwnerContext();
  const { setModal } = useModalContext();
  const { setShowModal } = useDisplayContext();
  const [largeOrder, setLargeOrder] = useState(false);
  const [itemQuantityChanged, setItemQuantityChanged] = useState(false);
  const [sizeChanged, setSizeChanged] = useState(false);

  function updateCartItem() {
    let newQuantity = 0;
    const newCart = cart;
    newQuantity = cartQuantity - props.oldQuantity;
    newQuantity += props.updatedItemQuantity;

    if (!ownerOrder && newQuantity > 30) {
      setModal(
        "Your order has grown to a fair size. The current maximum is 30 items. Please contact us before adding anything else. \n\nThis will ensure we can make your order happen today. You can also remove items from your cart. Thank you!"
      );
      setShowModal(true);
      setLargeOrder(true);
    } else if (!largeOrder) {
      setCartQuantity(newQuantity);
    }

    // let newCart: CartItem[];

    // let cartItemIndex: number;
    console.log(newCart);

    const cartItemIndex: number = newCart.findIndex(
      (cartItem) => cartItem.itemName === props.cartItem
    );

    console.log("index: " + cartItemIndex);

    newCart[cartItemIndex].quantity = props.updatedItemQuantity;
    newCart[cartItemIndex].price = props.updatedItemPrice;
    if (ownerOrder) {
      updateOwnerOrder(newCart);
      setCart(GetOwnerOrder());
    } else {
      UpdateCart(newCart);
      setCart(GetCart());
    }
    setItemQuantityChanged(false);
  }

  useEffect(() => {
    if (props.oldQuantity != props.updatedItemQuantity) {
      setItemQuantityChanged(true);
    }
    if (props.oldSize != props.newSize && props.newSize) {
      setSizeChanged(true);
    }
    if (
      props.newSize !== "S" &&
      props.newSize !== "M" &&
      props.newSize !== "L"
    ) {
      setSizeChanged(false);
    }
  }, [
    props.newSize,
    props.oldQuantity,
    props.oldSize,
    props.updatedItemQuantity,
  ]);

  return (
    <div>
      {itemQuantityChanged ||
        (sizeChanged && (
          <button
            disabled={largeOrder === true ? true : false}
            className={classes.update}
            onClick={() => [updateCartItem()]}
          >
            Update
          </button>
        ))}
    </div>
  );
}
