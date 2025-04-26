import { useDisplayContext } from "@/context/display-context";
import Card from "../ui/cards/card";
import classes from "./order-action-confirmation.module.css";

import { useModalContext } from "@/context/modal-context";
import { useRef } from "react";

import {
  AddToOrderMessage,
  DeleteMessage,
  RemoveFromOrderMessage,
} from "@/lib/owners-tools/confirmation-messages";
import { useEditOrderContext } from "@/context/edit-order-context";
import ActionConfirmationButton from "../ui/buttons/order-edit/action-confirmation-button";

export default function OrderActionConfirmation(props: {
  title: string;
  order: Order;
}) {
  const { setShowConfirmation } = useDisplayContext();
  const { orderToView } = useModalContext();

  const { menuItem, quantity, orderItem } = useEditOrderContext();

  const message = useRef<string>("");

  if (props.title === "Add To Order") {
    message.current = AddToOrderMessage({
      itemName: menuItem.itemName,
      quantity: quantity,
      orderUid: orderToView.orderUid,
      name: props.order.name,
    });
  } else if (props.title === "Delete") {
    message.current = DeleteMessage(orderToView.orderUid, orderToView.name);
  } else if (props.title === "Remove From Order") {
    message.current = RemoveFromOrderMessage({
      orderItem: orderItem,
      orderUid: orderToView.orderUid,
      name: orderToView.name,
    });
  }

  return (
    <div className={classes.actionConfirmation}>
      <Card expand={true}>
        <div className={classes.messageContents}>
          <h2>{`${props.title}` + " Confirmation"}</h2>
          <p>{message.current}</p>
          <div className={classes.buttons}>
            <ActionConfirmationButton title={props.title} />
            <button onClick={() => setShowConfirmation(false)}>no</button>
          </div>
        </div>
      </Card>
    </div>
  );
}
