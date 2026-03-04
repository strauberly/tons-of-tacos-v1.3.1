import classes from "../../../modal/order-summary/order-summary.module.css";
import { useDisplayContext } from "@/context/display-context";
import { useModalContext } from "@/context/modal-context";

export default function ViewOrderButton(order: { order: Order }) {
  const { setOrderToView } = useModalContext();
  const { setViewOrder } = useDisplayContext();

  return (
    <div className={classes.orderSummary}>
      <button onClick={() => [setOrderToView(order.order), setViewOrder(true)]}>
        View
      </button>
    </div>
  );
}
