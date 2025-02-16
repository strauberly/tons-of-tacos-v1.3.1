import { useSelectedSizeContext } from "@/context/size-context";
import classes from "./radio-buttons.module.css";
import { useEffect, useId } from "react";

export default function SizeButton(props: { size: string }) {
  const size = props.size;
  const itemId = useId();

  const { selectedSize, setSelectedSize } = useSelectedSizeContext();

  const sizeSelected = () => {
    setSelectedSize(props.size);
  };

  useEffect(() => {
    setSelectedSize(selectedSize);
  });

  return (
    <>
      <input
        type="radio"
        className={classes.radioButton}
        name="size"
        value={size}
        id={itemId}
        defaultChecked={size === "small"}
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
