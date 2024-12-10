"use client";

import { useCartContext } from "@/context/cart-context";

import { UpdateCart } from "@/lib/cart";

import { useEffect, useState } from "react";

import classes from "./update-cart-item.module.css";
import { useAlertContext } from "@/context/alert-context";
import { useDisplayContext } from "@/context/display-context";

export default function Update(props: {
  cartItem: string;
  updatedItemQuantity: number;
  updatedItemPrice: string;
  oldQuantity: number;
}) {
  const { cart, setCart, setCartQuantity, cartQuantity } = useCartContext();

  const { setAlert } = useAlertContext();
  const { setShowAlert } = useDisplayContext();

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

  let newQuantity = 0;

  console.log("old" + props.oldQuantity);

  const updateQuantity = () => {
    newQuantity = cartQuantity - props.oldQuantity;
    newQuantity += props.updatedItemQuantity;
    if (newQuantity > 30) {
      setAlert(
        "Your order has grown to a fair size. The current maximum is 30 items. Please contact us before adding anything else. \n\nThis will ensure we can make your order happen today. You can also remove items from your cart. Thank you!"
      );
      setShowAlert(true);
      setLargeOrder(true);
    } else if (!largeOrder) {
      setCartQuantity(newQuantity);
    }
  };

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
          onClick={() => [
            updateCartItem(),
            updateQuantity(),
            setItemQuantityChanged(false),
          ]}
        >
          Update
        </button>
      )}
    </div>
  );
}
