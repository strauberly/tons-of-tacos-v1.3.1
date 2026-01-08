import classes from "./quantity-selector.module.css";
import ArrowIcon from "./arrow-icon";
import { useOwnerContext } from "@/context/order-context/owner-context";

export default function QuantitySelector(props: {
  value: number;
  scale: string;
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
        <ArrowIcon scale={props.scale} />
      </button>
      <input
        type="number"
        min="1"
        max={`${props.value}`}
        disabled={true}
        value={`${props.value}`}
        placeholder={`${props.value}`}
      />
      <button
        className={`${classes.increment}`}
        onClick={() => [props.increment(), props.setEdited(true)]}
      >
        <ArrowIcon scale={props.scale} />
      </button>
    </div>
  );
}
