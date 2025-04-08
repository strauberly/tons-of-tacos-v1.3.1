// import { useState } from "react";
import Card from "../ui/cards/card";
import classes from "./order-action-confirmation.module.css";

export default function OrderActionConfirmation(props: {
  title: string;
  order: Order;
}) {
  //   const [confirmationMessage, setConfirmationMessage] = useState<string>();
  const deleteMessage: string =
    "Are you sure you want to delete order " +
    `${props.order.orderUid}` +
    " for customer  " +
    `${props.order.name}` +
    "?";

  return (
    <div className={classes.actionConfirmation}>
      <Card expand={true}>
        <h2>{`${props.title}` + " Confirmation"}</h2>
        <p>{deleteMessage}</p>
        <div>
          <button>yes</button>
          <button>no</button>
        </div>
      </Card>
    </div>
  );
}
