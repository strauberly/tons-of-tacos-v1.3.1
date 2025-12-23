import classes from "@/components/menu/menu-items/quantity-selector/quantity-selector.module.css";
import ArrowIcon from "./arrow-icon";
import { useOwnerContext } from "@/context/owner-context";

export default function QuantitySelector(props: {
  value: number;
  increment: () => void;
  decrement: () => void;
  setEdited: (edited: boolean) => void;
}) {
  const { ownerOrder } = useOwnerContext();

  return (
    <div className={ownerOrder ? classes.ownerOrderQuantity : classes.quantity}>
      <button
        className={`${classes.decrement}`}
        onClick={() => [props.decrement(), props.setEdited(true)]}
      >
        <ArrowIcon scale={"scale(.75)"} />
      </button>
      <input
        type="number"
        min="1"
        max={`${props.value}`}
        disabled={true}
        value={`${props.value}`}
      />
      <button
        className={`${classes.increment}`}
        onClick={() => [props.increment(), props.setEdited(true)]}
      >
        <ArrowIcon scale={"scale(.75)"} />
      </button>
    </div>
  );
}
