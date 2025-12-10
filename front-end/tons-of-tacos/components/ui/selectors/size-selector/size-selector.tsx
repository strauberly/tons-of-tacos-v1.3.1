import { useEffect, useRef, useState } from "react";
import classes from "./size-selector.module.css";
import { useOwnerContext } from "@/context/owner-context";
import { useCartContext } from "@/context/cart-context";

export default function SizeSelector(props: {
  itemSize: string;
  setShowSizeError: (showSizeError: boolean) => void;
  setNewSize: (newSize: string) => void;
  setSizeError: (sizeError: string) => void;
  itemName: string;
  setEdited: (setEdited: boolean) => void;
  edited: boolean;
}) {
  /*
    Takes a size(string) from either a menu item or order item and if appropriate displays the selector.
    The selector uses the logic from add order item to receive input from owner and then update call the update path from backend.
    Backend will need to be adjusted appropriately
    */

  const { ownerOrder } = useOwnerContext();
  const { cart } = useCartContext();

  const [size, setSize] = useState<string>(`${props.itemSize}`);

  const sizeRef = useRef<string>("");

  console.log(`${sizeRef.current}`);

  //   const [showSizeError, setShowSizeError] = useState<boolean>(false);
  //   const sizeError: string =
  //     "Enter 'S' for small, 'M' for medium or 'L' for large.";

  const [sizeValid, setSizeValid] = useState<boolean>();
  if (props.itemSize === "a") {
    sizeRef.current = " ";
  } else {
    sizeRef.current = "NA";
  }

  function checkSize(event: React.ChangeEvent<HTMLInputElement>) {
    sizeRef.current = event.currentTarget.value.toUpperCase();
    setSize(event.target.value.toUpperCase());
    console.log("item size: " + props.itemSize);
    // console.log("item size: " + item.itemSize);
    if (
      sizeRef.current !== "S" &&
      sizeRef.current !== "M" &&
      sizeRef.current !== "L"
    ) {
      props.setSizeError(
        "Enter 'S' for small, 'M' for medium or 'L' for large."
      );
      props.setShowSizeError(true);
      setSizeValid(false);
      props.setNewSize(sizeRef.current);
    } else {
      // setSizeValid(true);
      props.setShowSizeError(false);
      setSize(sizeRef.current);
      props.setNewSize(sizeRef.current);
    }
  }

  useEffect(() => {
    const sizes: string[] = [];
    cart.forEach((cartItem) => {
      if (cartItem.itemName === props.itemName) {
        sizes.push(cartItem.size);
      }
      sizes.forEach((size) => {
        if (size === props.itemSize) {
          props.setSizeError(
            `${props.itemName + " " + sizeRef.current} is already in cart.`
          );
          props.setShowSizeError(true);
        }
      });
    });
    if (sizeRef.current !== props.itemSize) {
      props.setEdited(true);
    }
  });
  console.log(props.itemSize);
  console.log(`${props.itemSize}`);
  console.log(`${sizeRef.current}`);
  return (
    <div className={classes.size}>
      <>
        {`${sizeRef.current}` !== "a" && (
          <input
            className={`${
              sizeValid == false ? classes.invalid : classes.valid
            }`}
            disabled={sizeRef.current === "NA" || props.itemSize === "NA"}
            name="size"
            id="size"
            type="text"
            placeholder={sizeRef.current}
            maxLength={1}
            style={{ textTransform: "uppercase" }}
            onChange={checkSize}
          />
        )}
      </>
    </div>
  );
}
