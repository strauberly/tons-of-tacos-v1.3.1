import classes from "./cart-item.module.css";
import { useEffect, useState } from "react";
import QuantitySelector from "../menu/menu-items/quantity-selector/quantity-selector";
import RemoveFromCart from "../ui/buttons/remove-from-cart/remove-from-cart";
import Update from "../ui/buttons/update-cart-item/update-cart-item-copy";
import { useCartContext } from "@/context/cart-context";
import { GetCart, RemoveCartItem } from "@/lib/cart";
import { useModalContext } from "@/context/modal-context";
import { useDisplayContext } from "@/context/display-context";
import { useOwnerContext } from "@/context/owner-context";
import SizeSelector from "../owner-dashboard/size-selector";
import { calcPrice } from "@/lib/owners-tools/owners-tools-client";

export default function CartItem(props: {
  id: string;
  menuId: string;
  itemName: string;
  itemQuantity: number;
  size: string;
  itemPrice: string;
}) {
  const [quantity, setQuantity] = useState(props.itemQuantity);
  const { setCart, cartQuantity, setCartQuantity, setItemRemoved } =
    useCartContext();
  const { setModal } = useModalContext();
  const { setShowModal } = useDisplayContext();
  const { loggedIn, ownerOrder } = useOwnerContext();

  const [newSize, setNewSize] = useState<string>(props.size);
  const [newPrice, setNewPrice] = useState<number>(Number(props.itemPrice));
  const increment = () => {
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
      // setQuantity(cartQuantity - quantity);
    }
    setQuantity(quantity + 1);
    setNewPrice(priceWork() * quantity);
  };

  // need a context check and appropriate action
  const decrement = () => {
    setQuantity(quantity - 1);
    if (quantity <= 1) {
      // RemoveCartItem(props.menuId);
      // setItemRemoved(true);
      // setCart(GetCart());
      // setCartQuantity(cartQuantity - props.itemQuantity);
      setQuantity(1);
    } else {
      // set quantity -1?
      // setCartQuantity(cartQuantity - props.itemQuantity);
    }
  };

  function priceWork() {
    let adjPrice;

    // let adjPrice: number;
    let sizeSurcharge = 0;

    if (newSize === "M") {
      sizeSurcharge = 0.5;
    } else if (newSize === "L") {
      sizeSurcharge = 1.0;
    }

    // const unitPrice =
    // eslint-disable-next-line prefer-const
    adjPrice =
      (Number(props.itemPrice) / Number(props.itemPrice) + sizeSurcharge) *
      quantity;
    console.log(adjPrice);
    return adjPrice;
  }

  // const price = calcPrice().toFixed(2);

  const [showSizeError, setShowSizeError] = useState<boolean>(false);

  const sizeError: string =
    "Enter 'S' for small, 'M' for medium or 'L' for large.";

  // const [newSize, setNewSize] = useState<string>(props.size);

  // const [sameSize, setSameSize] = useState<boolean>(true);

  // useEffect(() => {
  //   function CompareSize() {
  //     if (newSize !== props.size) {
  //       setSameSize(false);
  //     }
  //   }
  //   CompareSize();
  // }, [newSize, props.size]);

  useEffect(() => {
    function calcPrice() {
      let adjPrice;

      // let adjPrice: number;
      let sizeSurcharge = 0;

      if (newSize === "M") {
        sizeSurcharge = 0.5;
      } else if (newSize === "L") {
        sizeSurcharge = 1.0;
      }

      // reflect price work
      // eslint-disable-next-line prefer-const
      // adjPrice = props.itemQuantity + sizeSurcharge * quantity;
      adjPrice =
        (Number(props.itemPrice) / Number(props.itemPrice) + sizeSurcharge) *
        quantity;
      return adjPrice;
    }
    setNewPrice(calcPrice());
  }, [newSize, props.itemPrice, props.itemQuantity, quantity]);

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
        {}${newPrice.toFixed(2)}
        {/* ${price} */}
      </p>
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
