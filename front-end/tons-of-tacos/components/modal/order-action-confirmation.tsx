("use state");
// import { useState } from "react";
import { useDisplayContext } from "@/context/display-context";
import Card from "../ui/cards/card";
import classes from "./order-action-confirmation.module.css";
import { DeleteOrder } from "@/lib/owners-tools/owners-tools";
import { useOwnerContext } from "@/context/owner-context";
import { useModalContext } from "@/context/modal-context";
import { useRef, useState } from "react";

export default function OrderActionConfirmation(props: {
  title: string;
  order: Order;
}) {
  const { setShowConfirmation, setShowModal } = useDisplayContext();
  const { setModal } = useModalContext();
  const { login } = useOwnerContext();
  const [confirmationMessage, setConfirmationMessage] = useState<string>("");
  const deleteMessage: string =
    "Are you sure you want to delete order " +
    `${props.order.orderUid}` +
    " for customer  " +
    `${props.order.name}` +
    "?";

  const confirmation = useRef<string>();

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
                setModal(`${confirmation.current}`),
                setShowConfirmation(false),
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
