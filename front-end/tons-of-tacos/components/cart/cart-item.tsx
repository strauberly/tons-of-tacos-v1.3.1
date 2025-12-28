import { useEffect, useRef, useState } from "react";
import { useCartContext } from "@/context/cart-context";
import { useModalContext } from "@/context/modal-context";
import { useDisplayContext } from "@/context/display-context";
import { useOwnerContext } from "@/context/owner-context";
import SizeSelector from "../ui/selectors/size-selector/size-selector";
import QuantitySelector from "../ui/selectors/quantity-selector/quantity-selector";
import RemoveFromCart from "../ui/buttons/remove-from-cart/remove-from-cart";
import Update from "../ui/buttons/update-cart-item/update-cart-item";
import { calcItemTotal } from "@/lib/general/multi-use";
import classes from "./cart-item.module.css";
import { useSelectedSizeContext } from "@/context/size-context";

export default function CartItem(props: {
  id: string;
  menuId: string;
  itemName: string;
  itemQuantity: number;
  size: string;
  itemPrice: string;
}) {
  const { cartQuantity, cart } = useCartContext();
  const { setModal } = useModalContext();
  const { setShowModal } = useDisplayContext();
  const { loggedIn, ownerOrder } = useOwnerContext();
  const { selectedSize } = useSelectedSizeContext();

  const [newSize, setNewSize] = useState<string>("NA");
  const [quantity, setQuantity] = useState<number>(props.itemQuantity);
  const [newPrice, setNewPrice] = useState<number>(Number(props.itemPrice));
  const [edited, setEdited] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [canEdit, setCanEdit] = useState<boolean>(false);
  const [canUpdate, setCanUpdate] = useState<boolean>(false);
  const [showSizeError, setShowSizeError] = useState<boolean>(false);
  const [sizeError, setSizeError] = useState<string>("hi");
  const [readyToAdd, setReadyToAdd] = useState<boolean>(false);

  const newQuantity = useRef<number>(quantity);
  const oldSize = useRef<string>(props.size);

  const basePrice = Number(props.itemPrice) / props.itemQuantity;

  // const sizeError: string =
  //   "Enter 'S' for small, 'M' for medium or 'L' for large.";

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
    } else {
    }
    setEdited(true);
    setNewPrice(
      calcItemTotal(basePrice, props.size, newSize, newQuantity.current)
    );
  };

  const decrement = () => {
    setQuantity((newQuantity.current -= 1));
    if (quantity < 2) {
      newQuantity.current = 1;
      setQuantity(newQuantity.current);
    } else {
      setNewPrice(
        calcItemTotal(basePrice, props.size, newSize, newQuantity.current)
      );
    }
  };

  function reset() {
    // props.size = "p";
    // console.log("props: " + props.size);
  }

  const [sizes] = useState<string[]>([]);
  const sizeRef = useRef<string[]>([]);
  useEffect(() => {
    cart.forEach((cartItem) => {
      if (cartItem.itemName === props.itemName) {
        sizeRef.current.push(cartItem.size);
      }
      sizeRef.current.forEach((size) => {
        if (
          props.size === "NA" ||
          (size !== props.size && quantity !== props.itemQuantity)
        ) {
          setShowSizeError(false);
        } else if (
          cartItem.itemName === props.itemName &&
          size === newSize &&
          edited
        ) {
          setSizeError(
            `${
              props.itemName + " " + newSize + " x " + props.itemQuantity
            } is already in cart. Select a different size, item, quantity, or cancel.`
          );
          setShowSizeError(true);
          setCanUpdate(false);
          // } else {
          //   setShowSizeError(false);
        }
      });
    });
    // const sizes: string[] = [];
    // cart.forEach((cartItem) => {
    //   if (cartItem.itemName === props.itemName) {
    //     sizes.push(cartItem.size);
    //   }
    // });

    console.log("found it: " + sizes.some((size) => size === newSize));
    console.log("itemSizes:" + sizes);

    setCanUpdate(!sizeRef.current.some((size) => size === newSize));
    if (edited) {
      setNewPrice(
        calcItemTotal(basePrice, props.size, newSize, newQuantity.current)
      );
    } else {
      setNewPrice(Number(props.itemPrice));
    }
    // setNewSize(props.size);
  }, [
    edited,
    props.size,
    props.itemPrice,
    newSize,
    basePrice,
    canEdit,
    cart,
    props.itemName,
    canUpdate,
    selectedSize,
    sizes,
    props.itemQuantity,
    quantity,
  ]);

  return (
    <div className={classes.wholeItem}>
      <p>{`${sizes}`}</p>
      <li className={ownerOrder ? classes.ownerOrderItem : classes.item}>
        <p className={classes.itemName}>{props.itemName}</p>
        {!canEdit && <p>{props.itemQuantity}</p>}
        {canEdit && (
          <div className={classes.quantity}>
            <QuantitySelector
              value={quantity}
              increment={increment}
              decrement={decrement}
              setEdited={setEdited}
              scale="scale(.8)"
            />
          </div>
        )}
        {!canEdit && props.size === "NA" && (
          <p className={classes.size}> {props.size}</p>
        )}
        {!canEdit && props.size !== "NA" && (
          <p className={classes.size}>{props.size}</p>
        )}
        {canEdit === true && props.size === "NA" && (
          <p className={classes.size}>{props.size}</p>
        )}
        {canEdit && props.size !== "NA" && (
          // address ready to add and other bugs
          <SizeSelector
            itemSize={props.size}
            setShowSizeError={setShowSizeError}
            setNewSize={setNewSize}
            setSizeError={setSizeError}
            itemName={props.itemName}
            setEdited={setEdited}
            edited={edited}
            submitted={submitted}
            canEdit={canEdit}
            setCanEdit={setCanEdit}
            setReadyToAdd={setReadyToAdd}
          />
        )}
        <p>${newPrice.toFixed(2)}</p>
      </li>
      <div className={classes.editCartItem}>
        {showSizeError === true && (
          <p className={classes.sizeWarning}>{sizeError}</p>
        )}
      </div>

      <div className={classes.actionButtonGroup}>
        {edited && !showSizeError && (
          // {canUpdate && (
          <Update
            cartItemId={props.id}
            updatedItemQuantity={quantity}
            updatedItemPrice={newPrice.toFixed(2)}
            oldQuantity={props.itemQuantity}
            oldSize={props.size}
            newSize={newSize}
            setEdited={setEdited}
            edited={edited}
            setCanEdit={setCanEdit}
            setShowSizeError={setShowSizeError}
            setSubmitted={setSubmitted}
            reset={reset}
          />
        )}
        {canEdit && (
          <button
            onClick={() => [
              (newQuantity.current = props.itemQuantity),
              setQuantity(newQuantity.current),
              setNewPrice(newPrice),
              setNewSize(oldSize.current),
              setEdited(false),
              setCanEdit(false),
              setShowSizeError(false),
            ]}
          >
            Cancel
          </button>
        )}
        {!canEdit && (
          <button onClick={() => [setCanEdit(true), setShowSizeError(false)]}>
            Edit
          </button>
        )}
        <RemoveFromCart id={props.id} cartItemQuantity={props.itemQuantity} />
      </div>
    </div>
  );
}
