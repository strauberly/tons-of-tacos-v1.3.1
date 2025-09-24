import { useDisplayContext } from "@/context/display-context";
import Card from "../ui/cards/card";
import classes from "./order-action-confirmation.module.css";

import { useModalContext } from "@/context/modal-context";
import { useRef } from "react";

import {
  AddToOrderMessage,
  CustomerUpdateMessage,
  DeleteMessage,
  RemoveFromOrderMessage,
  UpdateOrderItemMessage,
} from "@/lib/owners-tools/confirmation-messages";
import { useEditOrderContext } from "@/context/edit-order-context";
import ActionConfirmationButton from "../ui/buttons/order-edit/action-confirmation-button";
import { GetOrderByID } from "@/lib/owners-tools/owners-tools";
import { useOwnerContext } from "@/context/owner-context";

export default function OrderActionConfirmation(props: {
  title: string;
  order: Order;
}) {
  const { setShowConfirmation } = useDisplayContext();
  const { orderToView, setOrderToView } = useModalContext();

  const { menuItem, quantity, orderItem, itemSize, customer, setOrderChanged } =
    useEditOrderContext();

  const { login } = useOwnerContext();

  console.log(itemSize);

  const message = useRef<string>("");

  if (props.title === "Add To Order") {
    message.current = AddToOrderMessage({
      itemName: menuItem.itemName,
      quantity: quantity,
      orderUid: orderToView.orderUid,
      name: props.order.name,
      size: itemSize,
    });
  } else if (props.title === "Delete") {
    message.current = DeleteMessage(orderToView.orderUid, orderToView.name);
  } else if (props.title === "Remove From Order") {
    message.current = RemoveFromOrderMessage({
      orderItem: orderItem,
      orderUid: orderToView.orderUid,
      name: orderToView.name,
    });
  } else if (props.title === "Update Order Item") {
    message.current = UpdateOrderItemMessage({
      orderItem: orderItem,
      newQuantity: quantity,
      newSize: itemSize,
    });
    // setOrderChanged(true);
  } else if (props.title === "Update Customer") {
    message.current = CustomerUpdateMessage(customer);
  }

  return (
    <div className={classes.actionConfirmation}>
      <Card expand={true}>
        <div className={classes.messageContents}>
          <h2>{`${props.title}` + " Confirmation"}</h2>
          <p>{message.current}</p>
          <div className={classes.buttons}>
            <ActionConfirmationButton title={props.title} />
            <button
              onClick={async () => [
                setShowConfirmation(false),
                setOrderChanged(false),
                setOrderToView(
                  await GetOrderByID(orderToView.orderUid, login.token)
                ),
              ]}
            >
              no
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
