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
  submitted: boolean;
  canEdit: boolean;
  setCanEdit: (setCanEdit: boolean) => void;
}) {
  /*
    Takes a size(string) from either a menu item or order item and if appropriate displays the selector.
    The selector uses the logic from add order item to receive input from owner and then update call the update path from backend.
    Backend will need to be adjusted appropriately
    */

  const { ownerOrder } = useOwnerContext();
  const { cart } = useCartContext();

  const [size, setSize] = useState<string>(`${props.itemSize}`);

  const sizeRef = useRef<string>(props.itemSize);

  console.log(`${sizeRef.current}`);

  //   const [showSizeError, setShowSizeError] = useState<boolean>(false);
  //   const sizeError: string =
  //     "Enter 'S' for small, 'M' for medium or 'L' for large.";

  const [sizeValid, setSizeValid] = useState<boolean>();
  // if (props.itemSize === "a") {
  //   sizeRef.current = " ";
  // } else {
  //   sizeRef.current = "NA";
  // }

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
      setSizeValid(true);
      props.setShowSizeError(false);
      // setSize(sizeRef.current);
      // sizeRef.current = size;
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
    const element = document.getElementById("size") as HTMLInputElement;
    if (
      (props.submitted && !props.canEdit) ||
      (!props.submitted && props.canEdit)
    ) {
      // element.value = "";
      // props.setCanEdit(true);
      props.setNewSize(size);
    }

    if (size !== " " && props.submitted === false && props.canEdit === false) {
      setSize(" ");
      console.log("hi");
    }
    if (props.canEdit) {
      element.value = `${sizeRef.current}`;
      props.setNewSize(size);
    }
  }, [cart, props, size]);
  console.log(props.itemSize);
  console.log(`${props.itemSize}`);
  console.log(`${sizeRef.current}`);
  return (
    <div className={classes.size}>
      <>
        <p>{"props: " + `${props.itemSize}`}</p>
        <p>{"state: " + `${size}`}</p>
        <p>{"ref: " + `${sizeRef.current}`}</p>
        <p>{"submitted: " + `${props.submitted}`}</p>
        <p>{"canEdit: " + `${props.canEdit}`}</p>
        {`${sizeRef.current}` !== "a" && (
          <input
            className={`${
              sizeValid == false ? classes.invalid : classes.valid
            }`}
            // disabled={!props.submitted && !props.canEdit}
            disabled={
              (sizeRef.current === "NA" && props.itemSize === " ") ||
              (sizeRef.current === "NA" && props.itemSize === "NA")
            }
            // disabled={
            //   (size === " " && sizeRef.current === "NA") ||
            //   props.itemSize === "NA"
            // }
            name="size"
            id="size"
            type="text"
            // placeholder={"NA"}
            // value={size}
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
