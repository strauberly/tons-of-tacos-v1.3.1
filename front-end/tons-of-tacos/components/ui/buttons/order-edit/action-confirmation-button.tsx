"use client";
import { useDisplayContext } from "@/context/display-context";
import { useEditOrderContext } from "@/context/edit-order-context";
import { useModalContext } from "@/context/modal-context";
import { useOrdersContext } from "@/context/orders-context";
import { useOwnerContext } from "@/context/owner-context";
import {
  AddToOrder,
  DeleteOrder,
  ExecuteConfirm,
  GetAllOrders,
  GetOrder,
} from "@/lib/owners-tools/owners-tools";
import { useRef } from "react";

export default function ActionConfirmationButton(props: { title: string }) {
  const { setShowConfirmation, setShowModal } = useDisplayContext();
  const { setOrders } = useOrdersContext();
  const { login } = useOwnerContext();
  const { menuItem, quantity, menuItemSize } = useEditOrderContext();
  const { orderToView, setModal, setOrderToView } = useModalContext();

  const orders = useRef<Order[]>([]);
  const order = useRef<Order>({
    orderUid: "",
    name: "",
    email: "",
    phone: "",
    orderTotal: 0,
    orderItems: [],
    created: "",
    ready: "",
    closed: "",
  });

  const action = useRef<string>("");

  const orderEdit: OrderEdit = {
    orderUid: orderToView.orderUid,
    customerName: orderToView.name,
    menuItemId: menuItem.id,
    quantity: quantity,
    itemSize: menuItemSize,
    login: login.token,
  };

  return (
    <button
      onClick={async () => [
        ((action.current = await ExecuteConfirm(props.title, orderEdit)), // props.title === "Add To Order"
        //   ? (action.current = await AddToOrder(
        //       orderToView.orderUid,
        //       Number(menuItem.id),
        //       quantity,
        //       menuItemSize,
        //       login.token
        //     ))
        //   : props.title === "Delete"
        //   ? (action.current = await DeleteOrder(
        //       orderToView.orderUid,
        //       login.token
        //     ))
        //   : "",
        setShowConfirmation(false)),
        setModal(action.current),
        setShowModal(true),
        (orders.current = await GetAllOrders(login.token)),
        setOrders(orders.current),
        (order.current = await GetOrder(orderToView.orderUid, login.token)),
        setOrderToView(order.current),
      ]}
    >
      yes
    </button>
  );
}
