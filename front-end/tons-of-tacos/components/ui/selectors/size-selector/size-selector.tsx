import classes from "./size-selector.module.css";
import { useEffect, useRef, useState } from "react";
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
  const { cart } = useCartContext();

  const [size, setSize] = useState<string>(`${props.itemSize}`);

  const sizeRef = useRef<string>(props.itemSize);

  const [sizeValid, setSizeValid] = useState<boolean>(true);

  function checkSize(event: React.ChangeEvent<HTMLInputElement>) {
    sizeRef.current = event.currentTarget.value.toUpperCase();
    setSize(event.target.value.toUpperCase());

    if (
      sizeRef.current !== "S" &&
      sizeRef.current !== "M" &&
      sizeRef.current !== "L" &&
      sizeRef.current !== "NA"
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
      props.setNewSize(sizeRef.current);
    }
  }

  useEffect(() => {
    if (props.submitted === true) {
      sizeRef.current = props.itemSize;
    }

    if (sizeRef.current !== props.itemSize) {
      props.setEdited(true);
    }
    const element = document.getElementById("size") as HTMLInputElement;
    if (props.submitted === true) {
      element.value = "NA";
      sizeRef.current = "NA";
    }
    if (size !== " " && props.submitted === false && props.canEdit === false) {
      setSize(" ");
    }
    if (props.canEdit) {
      props.setNewSize(size);
    }
  }, [cart, props, size]);

  return (
    <div className={classes.size}>
      <>
        {`${sizeRef.current}` !== "a" && (
          <input
            className={`${
              sizeValid == false ? classes.invalid : classes.valid
            }`}
            disabled={
              (sizeRef.current === "NA" && props.itemSize === " ") ||
              (sizeRef.current === "NA" && props.itemSize === "NA")
            }
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
