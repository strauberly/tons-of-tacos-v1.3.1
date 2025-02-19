import { useSelectedSizeContext } from "@/context/size-context";
import classes from "./size-buttons.module.css";
import { useEffect, useId } from "react";
import { useMenuItemIdContext } from "@/context/menu-item-context";

export default function SizeButton(props: { size: string; id: string }) {
  const size = props.size;
  const itemId = useId();

  const { selectedSize, setSelectedSize } = useSelectedSizeContext();
  const { setMenuItemId } = useMenuItemIdContext();

  const sizeSelected = () => {
    setSelectedSize(props.size);
    setMenuItemId(props.id);
  };

  useEffect(() => {
    setSelectedSize(selectedSize);
  });

  let checked: boolean = false;

  if (size === "small") {
    checked = true;
  }

  return (
    <>
      <input
        type="radio"
        className={classes.radioButton}
        name={props.id}
        value={size}
        id={itemId}
        defaultChecked={checked}
      />
      <label
        onClick={() => sizeSelected()}
        htmlFor={`${itemId}`}
        className={classes.radioButtonLabel}
      >
        {size.charAt(0)}
      </label>
    </>
  );
}
