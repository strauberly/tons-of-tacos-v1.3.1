"use client";
import { useModalContext } from "@/context/modal-context";
import classes from "./add-to-cart.module.css";
import { useCartContext } from "@/context/cart-context";
import { AddItemToCart, GetCart } from "@/lib/cart";
import { useEffect, useRef, useState } from "react";
import { useDisplayContext } from "@/context/display-context";
import { useSelectedSizeContext } from "@/context/size-context";
import { useOwnerContext } from "@/context/owner-context";
import { AddToOwnerOrder } from "@/lib/owners-tools/owners-tools-client";

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
  const { setModal } = useModalContext();
  const { setShowModal } = useDisplayContext();
  const { selectedSize } = useSelectedSizeContext();
  const { cartQuantity, setCartQuantity, setItemsInCart, cart, setCart } =
    useCartContext();
  const { loggedIn } = useOwnerContext();

  const [largeOrder, setLargeOrder] = useState<boolean>();
  const itemInCart = useRef(false);

  function checkItem() {
    try {
      setCart(GetCart());
      cart.forEach((cartItem) => {
        if (props.id === cartItem.id && props.size === selectedSize) {
          itemInCart.current = true;
          if (itemInCart.current === true) {
            setModal(
              `${
                props.itemName + " " + props.size
              } is already in your cart. Select the cart icon to view your order and change quantities or select this item with a different size.`
            );
            setShowModal(true);
          }
        }
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new Error(
        "Sorry there is an issue with your cart please try refreshing and adding items to your cart again."
      );
    }
  }

  const addCartItem = () => {
    checkItem();
    if (cartQuantity + props.quantity > 30) {
      setModal(
        "Your order has grown to a fair size. The current maximum is 30 items. Please contact us before adding anything else.\n\nThis will ensure we can make your order happen today. You can also remove other items from your cart. Thank you!"
      );
      setShowModal(true);
    } else if (itemInCart.current === false) {
      setItemsInCart(true);
      setLargeOrder(false);
      props.quantitySelector();
      props.expander();
      if (loggedIn) {
        AddToOwnerOrder(
          `${props.itemName}` + `_${props.size}`,
          props.id,
          props.itemName,
          props.quantity,
          props.size,
          props.size
        );
      } else {
        AddItemToCart(
          props.id,
          props.menuId,
          props.itemName,
          props.quantity,
          selectedSize,
          props.price
        );
      }
      setCart(GetCart());
      setCartQuantity(cartQuantity + props.quantity);
    }
    itemInCart.current = false;
  };

  return (
    <>
      <button
        disabled={largeOrder === true ? true : false}
        className={classes.add}
        onClick={() => [checkItem(), addCartItem()]}
      >
        Add To Cart
      </button>
    </>
  );
}
