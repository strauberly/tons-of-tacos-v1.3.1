import { useDisplayContext } from "@/context/display-context";
import { useModalContext } from "@/context/modal-context";

import classes from "../../../modal/order-summary.module.css";
import { useCartContext } from "@/context/cart-context";

export default function ViewOrderButton(order: { order: Order }) {
  const { setOrderToView } = useModalContext();
  const { setViewOrder } = useDisplayContext();
  const { setCart } = useCartContext();

  return (
    <div className={classes.orderSummary}>
      <button onClick={() => [setOrderToView(order.order), setViewOrder(true)]}>
        View
      </button>
    </div>
  );
}
