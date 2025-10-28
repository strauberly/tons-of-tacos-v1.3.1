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

  const [edited, setEdited] = useState<boolean>(false);

  const [canEdit, setCanEdit] = useState<boolean>(false);

  const newQuantity = useRef<number>(quantity);
  console.log(newQuantity);

  const oldSize = useRef<string>(props.size);
  // const quantity = useRef<number>(props)
  const price = useRef<number>(Number(newPrice));
  const basePrice = Number(props.itemPrice) / props.itemQuantity;

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
    // setNewPrice(updatePrice());
  };

  // need a context check and appropriate action
  const decrement = () => {
    setQuantity((newQuantity.current -= 1));
    if (quantity < 2) {
      newQuantity.current = 1;
      setQuantity(newQuantity.current);
    } else {
      // setNewPrice(updatePrice());
    }
  };

  const [showSizeError, setShowSizeError] = useState<boolean>(false);

  const sizeError: string =
    "Enter 'S' for small, 'M' for medium or 'L' for large.";

  useEffect(() => {
    function updatePrice() {
      let adjPrice = 0;
      let surcharge = 0;
      let oldSurcharge = 0;

      if (props.size === "M") {
        oldSurcharge = 0.5;
      } else if (props.size === "L") {
        oldSurcharge = 1;
      }

      if (newSize === "M") {
        surcharge = 0.5;
      } else if (newSize === "L") {
        surcharge = 1;
      }

      adjPrice = (basePrice - oldSurcharge + surcharge) * newQuantity.current;

      return adjPrice;
    }
    if (edited) {
      setNewPrice(updatePrice());
    } else {
      setNewPrice(Number(props.itemPrice));
    }
  }, [edited, props.size, props.itemPrice, newSize, basePrice]);

  return (
    <li className={ownerOrder ? classes.ownerOrderItem : classes.item}>
      <p className={classes.itemName}>{props.itemName}</p>
      {/* display size of na or size selector conditionally */}
      {canEdit && (
        <QuantitySelector
          value={quantity}
          increment={increment}
          decrement={decrement}
        />
      )}
      {!canEdit && <p className={classes.size}> {props.size}</p>}
      {props.size === "na" && <p>{props.size}</p>}

      {canEdit && props.size !== "na" && (
        <SizeSelector
          itemSize={props.size}
          setShowSizeError={setShowSizeError}
          setNewSize={setNewSize}
        />
      )}

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
          cartItemId={props.id}
          updatedItemQuantity={quantity}
          updatedItemPrice={newPrice.toFixed(2)}
          oldQuantity={props.itemQuantity}
          oldSize={props.size}
          newSize={newSize}
          setEdited={setEdited}
          edited={edited}
        />
        {!canEdit && <button onClick={() => setCanEdit(true)}>Edit</button>}
        <RemoveFromCart id={props.id} cartItemQuantity={props.itemQuantity} />
        {canEdit && (
          <button
            onClick={() => [
              (newQuantity.current = props.itemQuantity),
              setQuantity(newQuantity.current),
              setNewPrice(newPrice),
              setNewSize(oldSize.current),
              setEdited(false),
              setCanEdit(false),
            ]}
          >
            Cancel
          </button>
        )}
      </div>
    </li>
  );
}
