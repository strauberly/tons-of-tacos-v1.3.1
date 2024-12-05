import classes from "@/components/menu/menu-items/quantity-selector/quantity-selector.module.css";
import ArrowIcon from "./arrow-icon";

export default function QuantitySelector(props: {
  value: number;
  increment: () => void;
  decrement: () => void;
}) {
  return (
    <div className={classes.quantity}>
      <button
        className={`${classes.decrement}`}
        onClick={() => props.decrement()}
      >
        <ArrowIcon />
      </button>
      <input
        type="number"
        min="1"
        max="10"
        disabled={true}
        value={`${props.value}`}
      />
      <button
        className={`${classes.increment}`}
        onClick={() => props.increment()}
      >
        <ArrowIcon />
      </button>
    </div>
  );
}
