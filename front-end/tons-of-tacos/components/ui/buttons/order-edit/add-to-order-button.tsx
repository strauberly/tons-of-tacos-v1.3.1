import { useDisplayContext } from "@/context/display-context";
import { useModalContext } from "@/context/modal-context";
import { useEditOrderContext } from "@/context/edit-order-context";
import classes from "../../../owner-dashboard/add-order-item.module.css";

export default function AddToOrderButton(props: {
  menuItem: MenuItem;
  quantity: number;
  customerName: string;
  size: string;
  setItemName: (item: string) => void;
  setReadyToAdd: (readyToAdd: boolean) => void;
  reset: () => void;
}) {
  const { setShowConfirmation } = useDisplayContext();
  const { setConfirmationTitle } = useModalContext();
  const {
    setMenuItem,
    setQuantity,
    setCustomerName,
    setMenuItemSize,
    setItemSize,
  } = useEditOrderContext();
  console.log(props.quantity);
  console.log("item size: " + `${props.size}`);

  return (
    <button
      className={classes.addItemButton}
      onClick={() => [
        setMenuItem(props.menuItem),
        setQuantity(props.quantity),
        setCustomerName(props.customerName),
        setMenuItemSize(props.menuItem.itemSize),
        setItemSize(props.size),
        props.setReadyToAdd(false),
        props.setItemName("Item"),
        setShowConfirmation(true),
        setConfirmationTitle("Add To Order"),
        props.reset(),
      ]}
    >
      Add Item
    </button>
  );
}
