("use state");
// import { useState } from "react";
import { useDisplayContext } from "@/context/display-context";
import Card from "../ui/cards/card";
import classes from "./order-action-confirmation.module.css";
import { DeleteOrder, GetAllOrders } from "@/lib/owners-tools/owners-tools";
import { useOwnerContext } from "@/context/owner-context";
import { useModalContext } from "@/context/modal-context";
import { useRef } from "react";
import { useOrdersContext } from "@/context/orders-context";

export default function OrderActionConfirmation(props: {
  title: string;
  order: Order;
}) {
  const { setShowConfirmation, setShowModal } = useDisplayContext();
  const { setModal } = useModalContext();
  const { login } = useOwnerContext();
  const { setOrders } = useOrdersContext();

  const deleteMessage: string =
    "Are you sure you want to delete order " +
    `${props.order.orderUid}` +
    " for customer  " +
    `${props.order.name}` +
    "?";

  const confirmation = useRef<string>();
  const orders = useRef<Order[] | undefined>();
  return (
    <div className={classes.actionConfirmation}>
      <Card expand={true}>
        <div className={classes.messageContents}>
          <h2>{`${props.title}` + " Confirmation"}</h2>
          <p>{deleteMessage}</p>
          <div className={classes.buttons}>
            <button
              onClick={async () => [
                (confirmation.current = await DeleteOrder(
                  props.order.orderUid,
                  login.token
                )),
                (orders.current = await GetAllOrders(login.token)),
                setModal(`${confirmation.current}`),
                setShowConfirmation(false),
                setOrders(orders.current),
                setShowModal(true),
              ]}
            >
              yes
            </button>
            <button onClick={() => setShowConfirmation(false)}>no</button>
          </div>
        </div>
      </Card>
    </div>
  );
}
