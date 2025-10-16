import classes from "@/components/menu/menu-items/quantity-selector/quantity-selector.module.css";
import ArrowIcon from "./arrow-icon";
import { useOwnerContext } from "@/context/owner-context";

export default function QuantitySelector(props: {
  value: number;
  increment: () => void;
  decrement: () => void;
}) {
  const { ownerOrder } = useOwnerContext();

  return (
    <div className={ownerOrder ? classes.ownerOrderQuantity : classes.quantity}>
      <button
        className={`${classes.decrement}`}
        onClick={() => props.decrement()}
      >
        <ArrowIcon scale={"scale(1)"} />
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
        <ArrowIcon scale={"scale(1)"} />
      </button>
    </div>
  );
}
