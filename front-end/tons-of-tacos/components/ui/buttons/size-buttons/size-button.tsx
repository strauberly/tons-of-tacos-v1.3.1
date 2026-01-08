import classes from "./size-buttons.module.css";
import { useSelectedSizeContext } from "@/context/size-context";
import { useId } from "react";
import { useMenuItemIdContext } from "@/context/menu-context/menu-item-context";

export default function SizeButton(props: { size: string; id: string }) {
  const itemId = useId();

  const { selectedSize, setSelectedSize } = useSelectedSizeContext();
  const { menuItemId, setMenuItemId } = useMenuItemIdContext();

  const sizeChangeHandler = () => {
    setMenuItemId(props.id);
    setSelectedSize(props.size);
  };

  return (
    <>
      <input
        type="radio"
        className={classes.radioButton}
        name={props.id}
        value={props.size}
        id={itemId}
        onChange={sizeChangeHandler}
        checked={
          (menuItemId != props.id && props.size === "small") ||
          props.size === "small" ||
          (selectedSize === props.size && menuItemId == props.id)
        }
      />
      <label htmlFor={`${itemId}`} className={classes.radioButtonLabel}>
        {props.size.charAt(0)}
      </label>
    </>
  );
}
