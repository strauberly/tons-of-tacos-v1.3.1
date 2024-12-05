import classes from "./radio-buttons.module.css";
import { useId } from "react";

export default function RadioButton(props: {
  size: string;
  sizeSetter: (selectedSize: string) => void;
}) {
  const size = props.size;
  const itemId = useId();

  return (
    <>
      <input
        type="radio"
        className={classes.radioButton}
        name="size"
        value={size}
        id={itemId}
      />
      <label
        onClick={() => props.sizeSetter(props.size)}
        htmlFor={`${itemId}`}
        className={classes.radioButtonLabel}
      >
        {size.charAt(0)}
      </label>
    </>
  );
}
