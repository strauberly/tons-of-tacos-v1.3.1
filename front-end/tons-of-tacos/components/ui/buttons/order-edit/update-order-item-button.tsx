import { useDisplayContext } from "@/context/display-context";
import { useEditOrderContext } from "@/context/edit-order-context";
import { useModalContext } from "@/context/modal-context";

export default function UpdateOrderItemButton(props: {
  orderItem: OrderItem;
  newQuantity: number;
  newSize: string;
  setEdited: (edited: boolean) => void;
  setCanEdit: (canEdit: boolean) => void;
  setNewSize: (newSize: string) => void;
}) {
  const { setQuantity, setOrderItem, setItemSize } = useEditOrderContext();
  const { setShowConfirmation } = useDisplayContext();
  const { setConfirmationTitle } = useModalContext();
  // console.log("new size" + props.newSize);
  return (
    <>
      <button
        disabled={
          props.newSize !== "S" &&
          props.newSize !== "M" &&
          props.newSize !== "L" &&
          props.newSize !== "NA"
        }
        onClick={() => [
          setQuantity(props.newQuantity),
          setItemSize(props.newSize),
          setOrderItem(props.orderItem),
          setShowConfirmation(true),
          setConfirmationTitle("Update Order Item"),
          props.setEdited(false),
          props.setCanEdit(false),
          props.setNewSize("NA"),
        ]}
      >
        Update
      </button>
    </>
  );
}
