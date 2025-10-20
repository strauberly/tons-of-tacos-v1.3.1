import classes from "./cart-item.module.css";
import { useEffect, useRef, useState } from "react";
import QuantitySelector from "../menu/menu-items/quantity-selector/quantity-selector";
import RemoveFromCart from "../ui/buttons/remove-from-cart/remove-from-cart";
import Update from "../ui/buttons/update-cart-item/update-cart-item-copy";
import { useCartContext } from "@/context/cart-context";
import { GetCart, RemoveCartItem } from "@/lib/cart";
import { useModalContext } from "@/context/modal-context";
import { useDisplayContext } from "@/context/display-context";
import { useOwnerContext } from "@/context/owner-context";
import SizeSelector from "../owner-dashboard/size-selector";

export default function CartItemCopy(props: {
  id: string;
  menuId: string;
  itemName: string;
  itemQuantity: number;
  size: string;
  itemPrice: string;
}) {
  const { setCart, cartQuantity, setCartQuantity, setItemRemoved } =
    useCartContext();
  const { setModal } = useModalContext();
  const { setShowModal } = useDisplayContext();
  const { loggedIn, ownerOrder } = useOwnerContext();

  const [newSize, setNewSize] = useState<string>(props.size);
  console.log(newSize);
  const [quantity, setQuantity] = useState<number>(props.itemQuantity);
  console.log(quantity);
  const [newPrice, setNewPrice] = useState<number>(Number(props.itemPrice));
  console.log(newPrice);

  const newQuantity = useRef<number>(quantity);
  console.log(newQuantity);
  // const quantity = useRef<number>(props)
  const price = useRef<number>(Number(props.itemPrice));
  const basePrice = Number(props.itemPrice) / props.itemQuantity;

  function updatePrice() {
    let surcharge: number = 0;
    let adjPrice;
    // let basePrice;
    console.log("base price: " + basePrice);

    if (newSize === "M") {
      surcharge = 0.5;
    } else if (newSize === "L") {
      surcharge = 1.0;
    }
    // console.log(price.current + surcharge * uantity.current);
    // adjPrice = newPrice + surcharge * quantity;
    // adjPrice = (price.current + surcharge) * newQuantity.current;
    adjPrice = (basePrice + surcharge) * newQuantity.current;
    return adjPrice;
  }

  const increment = () => {
    setQuantity((newQuantity.current += 1));
    if (quantity >= 10 && !loggedIn) {
      setModal(
        "The limit for this item is 10. If you need more please give us a call so we can try to accommodate your order. Thanks!"
      );
      setShowModal(true);
      setQuantity(10);
    } else if (quantity + cartQuantity > 30 && !loggedIn) {
      setModal(
        "Your order has grown to a fair size. The current maximum is 30 items. Please contact us before adding anything else. \n\nThis will ensure we can make your order happen today. You can also remove items from your cart. Thank you!"
      );
      setShowModal(true);
    }
    setNewPrice(updatePrice());
  };

  // need a context check and appropriate action
  const decrement = () => {
    setQuantity((newQuantity.current -= 1));
    if (quantity < 2) {
      newQuantity.current = 1;
      setQuantity(newQuantity.current);
    } else {
      setNewPrice(updatePrice());
    }
  };

  const [showSizeError, setShowSizeError] = useState<boolean>(false);

  const sizeError: string =
    "Enter 'S' for small, 'M' for medium or 'L' for large.";

  return (
    <li className={ownerOrder ? classes.ownerOrderItem : classes.item}>
      <p className={classes.itemName}>{props.itemName}</p>
      {/* display size of na or size selector conditionally */}
      {/* <p className={classes.size}> {props.size}</p> */}
      {props.size !== "na" && (
        <SizeSelector
          itemSize={props.size}
          setShowSizeError={setShowSizeError}
          setNewSize={setNewSize}
        />
      )}
      <QuantitySelector
        value={quantity}
        increment={increment}
        decrement={decrement}
      />

      <p className={ownerOrder ? classes.ownerOrderItemPrice : classes.price}>
        {" "}
      </p>
      <p>${newPrice.toFixed(2)}</p>
      {/* new div for vert styling */}
      <div className={classes.editCartItem}>
        {showSizeError === true && (
          <p className={classes.sizeWarning}>{sizeError}</p>
        )}
        <Update
          cartItem={props.itemName}
          updatedItemQuantity={quantity}
          updatedItemPrice={newPrice.toFixed(2)}
          oldQuantity={props.itemQuantity}
          oldSize={props.size}
          newSize={newSize}
        />

        <RemoveFromCart
          id={props.menuId}
          cartItemQuantity={props.itemQuantity}
        />
      </div>
    </li>
  );
}
