import { useDisplayContext } from "@/context/display-context";
import { useModalContext } from "@/context/modal-context";
import { useEditOrderContext } from "@/context/edit-order-context";
import classes from "../../../owner-dashboard/add-order-item.module.css";
import { useOwnerContext } from "@/context/owner-context";
import {
  AddToOwnerOrder,
  GetOwnerOrder,
} from "@/lib/owners-tools/owners-tools-client";
import { useCartContext } from "@/context/cart-context";
import { useRef } from "react";

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
  const { ownerOrder, setOrder, order } = useOwnerContext();
  const { setCart } = useCartContext();
  const { setModal } = useModalContext();
  const { setShowModal } = useDisplayContext();
  const {
    setMenuItem,
    setQuantity,
    setCustomerName,
    setMenuItemSize,
    setItemSize,
  } = useEditOrderContext();
  console.log(props.quantity);
  console.log("item size: " + `${props.size}`);

  const itemInOrder = useRef<boolean>(false);

  function orderCheck() {
    setOrder(GetOwnerOrder());
    order.forEach((orderItem) => {
      if (orderItem.menuId === props.menuItem.id) {
        setModal(
          "Item already in order. Update quantity, remove, or choose a different item."
        );
        setShowModal(true);
        itemInOrder.current = true;
        props.reset();
      }
    });
  }

  function checkOrderContext() {
    orderCheck();
    if (ownerOrder && itemInOrder.current === false) {
      return [
        AddToOwnerOrder(
          `${props.menuItem.itemName}_${props.menuItem.itemSize}`,
          props.menuItem.id,
          props.menuItem.itemName,
          props.quantity,
          props.menuItem.itemSize,
          props.menuItem.unitPrice.toString()
        ),
        props.reset(),
      ];
    } else if (!ownerOrder) {
      return [
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
      ];
    }
  }

  return (
    <button
      className={classes.addItemButton}
      disabled={props.menuItem.itemName === ""}
      onClick={() => {
        checkOrderContext();
      }}
    >
      Add Item
    </button>
  );
}
