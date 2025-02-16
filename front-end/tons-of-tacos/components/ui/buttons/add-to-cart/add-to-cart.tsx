"use client";
import { useAlertContext } from "@/context/alert-context";
import classes from "./add-to-cart.module.css";
import { useCartContext } from "@/context/cart-context";
import { AddItemToCart, GetCart } from "@/lib/cart";
import { useRef, useState } from "react";
import { useDisplayContext } from "@/context/display-context";
import { useSelectedSizeContext } from "@/context/size-context";

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
  const { setAlert } = useAlertContext();
  const { setShowAlert } = useDisplayContext();
  const { selectedSize } = useSelectedSizeContext();
  const { cartQuantity, setCartQuantity, setItemsInCart, cart, setCart } =
    useCartContext();

  const [largeOrder, setLargeOrder] = useState<boolean>();
  const itemInCart = useRef(false);

  function checkItem() {
    try {
      setCart(GetCart());
      cart.forEach((cartItem) => {
        if (props.id == cartItem.id && props.size == selectedSize) {
          itemInCart.current = true;
          if (itemInCart.current === true) {
            setAlert(
              `${props.itemName} is already in your cart. Select the cart icon to view your order and change quantities.`
            );
            setShowAlert(true);
          }
        }
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new Error(
        "Sorry there is an issue with your cart please try refreshing and adding items to your cart again."
      );
    }
    console.log(itemInCart);
  }

  const addCartItem = () => {
    checkItem();
    if (cartQuantity + props.quantity > 30) {
      setAlert(
        "Your order has grown to a fair size. The current maximum is 30 items. Please contact us before adding anything else.\n\nThis will ensure we can make your order happen today. You can also remove other items from your cart. Thank you!"
      );
      setShowAlert(true);
    } else if (itemInCart.current === false) {
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
