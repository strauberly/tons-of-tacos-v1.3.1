import { useDisplayContext } from "@/context/display-context";
import { useModalContext } from "@/context/modal-context";
import { useEditOrderContext } from "@/context/edit-order-context";
import classes from "../../../owner-dashboard/add-order-item.module.css";
import { useOwnerContext } from "@/context/owner-context";
import {
  AddToOwnerOrder,
  CalcOrderTotal,
  GetOwnerOrder,
} from "@/lib/owners-tools/owners-tools-client";
import { useCartContext } from "@/context/cart-context";
import { useEffect, useRef } from "react";
import { GetOrderByID } from "@/lib/owners-tools/owners-tools";

export default function AddToOrderButton(props: {
  orderUid: string;
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
  const { orderToView } = useModalContext();
  const { ownerOrder, setOrder, order, login } = useOwnerContext();
  const { setCart, cart } = useCartContext();
  const { setModal, setOrderToView } = useModalContext();
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
    // setOrder(GetOwnerOrder());
    console.log(order);
    // setOrderTotal(CalcOrderTotal());

    if (ownerOrder) {
      cart.forEach((cartItem) => {
        if (cartItem.itemName === props.menuItem.itemName) {
          setModal(
            "Item already in order. Update quantity, remove, or choose a different item."
          );
          setShowModal(true);
          itemInOrder.current = true;
          props.reset();
        }
      });
    } else {
      console.log(order);
      Array.from(orderToView.orderItems).forEach((orderItem) => {
        if (orderItem.itemName === props.menuItem.itemName) {
          setModal(
            "Item already in order. Update quantity, remove, or choose a different item."
          );
          setShowModal(true);
          itemInOrder.current = true;
          props.reset();
        }
      });
    }
  }

  function proceed() {
    if (!itemInOrder.current) {
      setShowConfirmation(true);
      setConfirmationTitle("Add To Order");
      props.reset();
    }
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
        setCart(GetOwnerOrder()),
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
        proceed(),
        // setShowConfirmation(true),
        // setConfirmationTitle("Add To Order"),
        // props.reset(),
      ];
    }
  }

  return (
    <button
      className={classes.addItemButton}
      disabled={props.menuItem.itemName === ""}
      onClick={async () => {
        setOrder(GetOwnerOrder());
        // setOrderToView(await GetOrderByID(orderToView.orderUid, login.token));
        orderCheck();
        checkOrderContext();
        if (!ownerOrder) {
          setOrderToView(await GetOrderByID(props.orderUid, login.token));
        }
      }}
    >
      Add Item
    </button>
  );
}
