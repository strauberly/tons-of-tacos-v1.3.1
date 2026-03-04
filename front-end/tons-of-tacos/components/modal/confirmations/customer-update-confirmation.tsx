import { useOwnerContext } from "@/context/session-context/owner-context";
import classes from "./customer-update.module.css";
import { useRef } from "react";
import Card from "@/components/ui/cards/card";
import ActionConfirmationButton from "@/components/ui/buttons/order-edit/action-confirmation-button";
import { useDisplayContext } from "@/context/display-context";
import { useModalContext } from "@/context/menu-context/modal-context";

export default function CustomerUpdateConfirmation(props: {
  title: string;
  customer: Customer;
}) {
  const { login } = useOwnerContext();
  const { setShowCustomerUpdateConfirmation } = useDisplayContext();
  const { orderToView } = useModalContext();

  //   const message = useRef<string>("");
  return (
    <div className={classes.actionConfirmation}>
      <Card expand={true}>
        <div className={classes.messageContents}>
          <h2>{`${props.title}` + " Confirmation"}</h2>
          <p>{message.current}</p>
          <div className={classes.buttons}>
            <ActionConfirmationButton title={props.title} />
            <button
              onClick={async () => {
                setShowCustomerUpdateConfirmation(false);
              }}
            >
              no
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
