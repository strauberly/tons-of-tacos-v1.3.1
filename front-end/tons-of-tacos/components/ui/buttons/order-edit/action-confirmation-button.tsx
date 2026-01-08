"use client";
import { useDisplayContext } from "@/context/display-context";
import { useEditOrderContext } from "@/context/order-context/edit-order-context";
import { useModalContext } from "@/context/menu-context/modal-context";
import { useOrdersContext } from "@/context/order-context/orders-context";
import { useOwnerContext } from "@/context/order-context/owner-context";
import {
  ExecuteConfirm,
  GetAllOrders,
  GetOrderByID,
} from "@/lib/owners-tools/owners-tools-server";
import { useRef } from "react";

export default function ActionConfirmationButton(props: { title: string }) {
  const { setShowConfirmation, setShowModal } = useDisplayContext();
  const { setOrders } = useOrdersContext();
  const { login } = useOwnerContext();
  const {
    menuItem,
    quantity,
    orderItem,
    itemSize,
    setItemSize,
    customer,
    setOrderChanged,
  } = useEditOrderContext();
  const { orderToView, setModal, setOrderToView } = useModalContext();

  const orders = useRef<Order[]>([]);
  const action = useRef<string>("");
  const orderEdit: OrderEdit = {
    orderUid: orderToView.orderUid,
    customer: customer,
    menuItemId: menuItem.id,
    quantity: quantity,
    itemSize: itemSize,
    login: login.accessToken,
    orderItem: orderItem,
  };

  const orderReqResRef = useRef<OrderRequestResponse>({
    status: 0,
    body: "",
  });

  return (
    <button
      onClick={async () => {
        action.current = await ExecuteConfirm(props.title, orderEdit);
        setShowConfirmation(false);
        setModal(action.current);
        setShowModal(true);
        setItemSize("NA");
        orders.current = await GetAllOrders(login.accessToken);
        setOrders(orders.current);
        orderReqResRef.current = await GetOrderByID(
          orderToView.orderUid,
          login.accessToken
        );

        if (orderReqResRef.current.status === 200) {
          setOrderToView(orderReqResRef.current.body as Order);
        }
        setOrderChanged(true);
      }}
    >
      yes
    </button>
  );
}
