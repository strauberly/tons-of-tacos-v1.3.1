import { useDisplayContext } from "@/context/display-context";
import { useModalContext } from "@/context/modal-context";
import classes from "../../../owner-dashboard/order-item.module.css";
import { useEditOrderContext } from "@/context/edit-order-context";

export default function RemoveFromOrderButton(props: { orderItem: OrderItem }) {
  const { setShowConfirmation } = useDisplayContext();
  const { setConfirmationTitle } = useModalContext();

  const { setOrderItem } = useEditOrderContext();

  return (
    <button
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
