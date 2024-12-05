"use client";
import { useAlertContext } from "@/context/alert-context";
import classes from "./add-to-cart.module.css";
import { useCartContext } from "@/context/cart-context";
import { AddItemToCart, GetCart } from "@/lib/cart";
import { useCallback, useEffect, useState } from "react";
import { useDisplayContext } from "@/context/display-context";

export default function AddToCart(props: {
  id: string;
  menuId: string;
  itemName: string;
  quantity: number;
  size: string;
  price: string;
  quantitySelector: () => void;
  expander: () => void;
}) {
  const [largeOrder, setLargeOrder] = useState(false);
  const [itemInCart, setItemInCart] = useState(false);
  const { setAlert } = useAlertContext();
  const { setShowAlert } = useDisplayContext();

  const {
    cartQuantity,
    setCartQuantity,
    setItemsInCart,
    cart,
    setCart,
    itemRemoved,
    setItemRemoved,
  } = useCartContext();

  let newQuantity = 0;

  const quantity = () => {
    newQuantity = cartQuantity + props.quantity;
    if (newQuantity > 30) {
      setAlert(
        "Your order has grown to a fair size. The current maximum is 30 items. Please contact us before adding anything else. This will ensure we can make your order happen today. You can also remove other items from your cart. Thank you!"
      );
      setShowAlert(true);
      setLargeOrder(true);
    } else {
      setCartQuantity(cartQuantity + props.quantity);
    }
  };

  const checkItem = useCallback(() => {
    cart.forEach((cartItem) => {
      if (props.id == cartItem.id) {
        setItemInCart(true);
      }
    });
  }, [cart, props.id]);

  const addCartItem = () => {
    checkItem();
    if (itemInCart === false) {
      quantity();
      setItemsInCart(true);
      setLargeOrder(false);
      props.quantitySelector();
      props.expander();
      AddItemToCart(
        props.id,
        props.menuId,
        props.itemName,
        props.quantity,
        props.size,
        props.price
      );
      setCart(GetCart());
    } else {
      // use your alert
      setAlert(
        `${props.itemName} is already in your cart. Select the cart icon to view your order and change quantities.`
      );
      setShowAlert(true);
    }
  };

  useEffect(() => {
    checkItem();
    if (itemRemoved && itemInCart === true) {
      setItemInCart(false);
      setItemRemoved(false);
    }
  }, [checkItem, itemInCart, itemRemoved, setItemRemoved]);

  return (
    <>
      <button
        disabled={largeOrder === true ? true : false}
        className={classes.add}
        onClick={() => {
          addCartItem();
        }}
      >
        Add To Cart
      </button>
    </>
  );
}
