import { useDisplayContext } from "@/context/display-context";
import classes from "../add-to-cart/add-to-cart.module.css";
import { useModalContext } from "@/context/modal-context";
import { useEditOrderContext } from "@/context/edit-order-context";

export default function AddToOrderButton(props: {
  menuItem: MenuItem;
  quantity: number;
  customerName: string;
  setItemName: (item: string) => void;
  setReadyToAdd: (readyToAdd: boolean) => void;
}) {
  const { setShowConfirmation } = useDisplayContext();
  const { setConfirmationTitle } = useModalContext();
  const { setMenuItem, setQuantity, setCustomerName, setMenuItemSize } =
    useEditOrderContext();
  console.log(props.quantity);
  return (
    <button
      className={classes.addItemButton}
      onClick={() => [
        setMenuItem(props.menuItem),
        setQuantity(props.quantity),
        setCustomerName(props.customerName),
        setMenuItemSize(props.menuItem.itemSize),
        props.setReadyToAdd(false),
        props.setItemName("Item"),
        setShowConfirmation(true),
        setConfirmationTitle("Add To Order"),
      ]}
    >
      Add Item
    </button>
  );
}
