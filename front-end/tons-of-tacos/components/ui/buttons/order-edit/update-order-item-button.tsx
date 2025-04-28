import { useDisplayContext } from "@/context/display-context";
import { useEditOrderContext } from "@/context/edit-order-context";
import { useModalContext } from "@/context/modal-context";

export default function UpdateOrderItemButton(props: {
  orderItem: OrderItem;
  newQuantity: number;
  setCanEdit: (canEdit: boolean) => void;
}) {
  const { setQuantity, setOrderItem } = useEditOrderContext();
  const { setShowConfirmation } = useDisplayContext();
  const { setConfirmationTitle } = useModalContext();
  return (
    <button
      onClick={() => [
        setQuantity(props.newQuantity),
        setOrderItem(props.orderItem),
        setShowConfirmation(true),
        setConfirmationTitle("Update Order Item"),
        props.setCanEdit(false),
      ]}
    >
      Update
    </button>
  );
}
