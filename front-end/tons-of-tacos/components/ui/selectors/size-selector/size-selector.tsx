import { useRef, useState } from "react";
import classes from "./size-selector.module.css";
import { useOwnerContext } from "@/context/owner-context";

export default function SizeSelector(props: {
  itemSize: string;
  setShowSizeError: (showSizeError: boolean) => void;
  setNewSize: (newSize: string) => void;
}) {
  /*
    Takes a size(string) from either a menu item or order item and if appropriate displays the selector.
    The selector uses the logic from add order item to receive input from owner and then update call the update path from backend.
    Backend will need to be adjusted appropriately
    */

  const { ownerOrder } = useOwnerContext();

  const [size, setSize] = useState<string>(`${props.itemSize}`);

  const sizeRef = useRef<string>(size);

  //   const [showSizeError, setShowSizeError] = useState<boolean>(false);
  //   const sizeError: string =
  //     "Enter 'S' for small, 'M' for medium or 'L' for large.";

  const [sizeValid, setSizeValid] = useState<boolean>();

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
      props.setShowSizeError(true);
      setSizeValid(false);
      props.setNewSize(sizeRef.current);
    } else {
      setSizeValid(true);
      props.setShowSizeError(false);
      setSize(sizeRef.current);
      props.setNewSize(sizeRef.current);
    }
  }

  return (
    <div className={classes.size}>
      <>
        {`${sizeRef.current}` !== "a" && (
          <input
            className={`${
              sizeValid == false ? classes.invalid : classes.valid
            }`}
            name="size"
            id="size"
            type="text"
            placeholder={props.itemSize}
            maxLength={1}
            style={{ textTransform: "uppercase" }}
            onChange={checkSize}
          />
        )}
      </>
    </div>
  );
}
