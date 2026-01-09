"use client";
import classes from "./update-cart-item.module.css";
import { useCartContext } from "@/context/cart-context";
import { GetCart, UpdateCart } from "@/lib/cart";
import { useEffect, useState } from "react";
import { useModalContext } from "@/context/menu-context/modal-context";
import { useDisplayContext } from "@/context/display-context";
import { useOwnerContext } from "@/context/owner-context";
import {
  GetOwnerOrder,
  updateOwnerOrder,
} from "@/lib/owners-tools/owners-tools-client";

export default function UpdateCartItem(props: {
  cartItemId: string;
  updatedItemQuantity: number;
  updatedItemPrice: string;
  oldQuantity: number;
  oldSize: string;
  newSize: string;
  setEdited: (edited: boolean) => void;
  edited: boolean;
  setCanEdit: (canEdit: boolean) => void;
  setShowSizeError: (showSizeError: boolean) => void;
  setSubmitted: (setSubmitted: boolean) => void;
  reset: (reset: void) => void;
}) {
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

    const cartItemIndex: number = newCart.findIndex(
      (cartItem) => cartItem.id === props.cartItemId
    );

    if (itemQuantityChanged) {
      newCart[cartItemIndex].quantity = props.updatedItemQuantity;
    }
    if (sizeChanged) {
      newCart[cartItemIndex].size = props.newSize;
    }
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
      props.setEdited(true);
    }
    if (props.oldSize != props.newSize) {
      setSizeChanged(true);
      props.setEdited(true);
    }
    if (
      props.newSize !== "S" &&
      props.newSize !== "M" &&
      props.newSize !== "L"
    ) {
      setSizeChanged(false);
    }
  }, [
    props,
    props.newSize,
    props.oldQuantity,
    props.oldSize,
    props.updatedItemQuantity,
  ]);

  return (
    <div>
      {(itemQuantityChanged && props.edited && (
        <button
          disabled={largeOrder === true ? true : false}
          className={classes.update}
          onClick={() => [
            updateCartItem(),
            props.setEdited(false),
            props.setCanEdit(false),
          ]}
        >
          Update
        </button>
      )) ||
        (sizeChanged && props.edited && (
          <button
            disabled={largeOrder === true ? true : false}
            className={classes.update}
            onClick={() => [
              updateCartItem(),
              props.setEdited(false),
              props.setCanEdit(false),
              props.setShowSizeError(false),
              props.setSubmitted(true),
              props.reset(),
            ]}
          >
            Update
          </button>
        ))}
    </div>
  );
}
