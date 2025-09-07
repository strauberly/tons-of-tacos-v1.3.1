"use client";

import { useCartContext } from "@/context/cart-context";

import { UpdateCart } from "@/lib/cart";

import { useEffect, useState } from "react";

import classes from "./update-cart-item.module.css";
import { useModalContext } from "@/context/modal-context";
import { useDisplayContext } from "@/context/display-context";
import { useOwnerContext } from "@/context/owner-context";
import {
  GetOwnerOrder,
  updateOwnerOrder,
} from "@/lib/owners-tools/owners-tools-client";

export default function Update(props: {
  cartItem: string;
  updatedItemQuantity: number;
  updatedItemPrice: string;
  oldQuantity: number;
}) {
  const { cart, setCart, setCartQuantity, cartQuantity } = useCartContext();

  const { setModal } = useModalContext();
  const { setShowModal } = useDisplayContext();
  const { ownerOrder, order, setOrder } = useOwnerContext();

  const newCart = cart;

  const [largeOrder, setLargeOrder] = useState(false);

  const [itemQuantityChanged, setItemQuantityChanged] = useState(false);

  const updateCartItem = () => {
    const cartItemIndex = newCart.findIndex(
      (cartItem) => cartItem.itemName === props.cartItem
    );

    newCart[cartItemIndex].quantity = props.updatedItemQuantity;

    newCart[cartItemIndex].price = props.updatedItemPrice;
    setCart(newCart);
    UpdateCart(newCart);
  };

  function updateOrderItem() {
    console.log(GetOwnerOrder());
    console.log(order);
    console.log(
      order.findIndex((orderItem) => orderItem.itemName === props.cartItem)
    );
    const orderItemIndex = order.findIndex(
      (orderItem) => orderItem.itemName === props.cartItem
    );
    console.log("order item index: " + order[orderItemIndex]);
    console.log("order item index quantity: " + order[orderItemIndex].quantity);
    order[orderItemIndex].quantity = props.updatedItemQuantity;
    order[orderItemIndex].price = props.updatedItemPrice;
    setOrder(order);
    updateOwnerOrder(order);
  }

  let newQuantity = 0;

  const updateQuantity = () => {
    newQuantity = cartQuantity - props.oldQuantity;
    newQuantity += props.updatedItemQuantity;
    if (newQuantity > 30) {
      setModal(
        "Your order has grown to a fair size. The current maximum is 30 items. Please contact us before adding anything else. \n\nThis will ensure we can make your order happen today. You can also remove items from your cart. Thank you!"
      );
      setShowModal(true);
      setLargeOrder(true);
    } else if (!largeOrder) {
      setCartQuantity(newQuantity);
    }
  };

  function checkOrderContext() {
    if (ownerOrder) {
      return [
        updateOrderItem(),
        setOrder(GetOwnerOrder()),
        setItemQuantityChanged(false),
      ];
    } else {
      return [
        updateCartItem(),
        updateQuantity(),
        setItemQuantityChanged(false),
      ];
    }
  }

  useEffect(() => {
    if (props.oldQuantity != props.updatedItemQuantity) {
      setItemQuantityChanged(true);
    }
  }, [props.oldQuantity, props.updatedItemQuantity]);

  return (
    <div>
      {itemQuantityChanged && (
        <button
          disabled={largeOrder === true ? true : false}
          className={classes.update}
          onClick={() => [checkOrderContext()]}
        >
          Update
        </button>
      )}
    </div>
  );
}
