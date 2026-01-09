import classes from "../../../owner-dashboard/orders/order-item.module.css";
import { useDisplayContext } from "@/context/display-context";
import { useModalContext } from "@/context/menu-context/modal-context";
import { useEditOrderContext } from "@/context/order-context/edit-order-context";

export default function RemoveFromOrderButton(props: {
  orderItem: OrderItem;
  orderToView: Order;
}) {
  const { setShowConfirmation } = useDisplayContext();
  const { setConfirmationTitle } = useModalContext();

  const { setOrderItem } = useEditOrderContext();

  return (
    <button
      disabled={
        props.orderToView.ready !== "no" || props.orderToView.closed !== "no"
      }
      className={classes.button}
      onClick={() => [
        setShowConfirmation(true),
        setConfirmationTitle("Remove From Order"),
        setOrderItem(props.orderItem),
      ]}
    >
      Remove
    </button>
  );
}
