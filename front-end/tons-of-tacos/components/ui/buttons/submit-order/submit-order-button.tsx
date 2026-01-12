"use client";
import classes from "./submit-order-button.module.css";
import { useDisplayContext } from "@/context/display-context";
import { useFormStatus } from "react-dom";
import { useEffect } from "react";
import { useOrderConfirmationContext } from "@/context/order-context/order-confirmation-context";
import { useErrorContext } from "@/context/error-context";
import { useOrdersContext } from "@/context/order-context/orders-context";

export default function SubmitButton(props: {
  firstName: boolean | undefined;
  lastName: boolean | undefined;
  phone: boolean | undefined;
  email: boolean | undefined;
  state: string;
}) {
  const status = useFormStatus();
  const { setShowOrderConfirmation } = useDisplayContext();
  const { setOrderConfirmation } = useOrderConfirmationContext();
  const { setOwnerOrder } = useOrdersContext();
  const { setError, setErrorMessage } = useErrorContext();

  useEffect(() => {
    setOrderConfirmation(props.state);
  }, [setOrderConfirmation, props.state]);

  return (
    <button
      className={classes.checkout_button}
      type="submit"
      disabled={
        !props.firstName ||
        !props.lastName ||
        !props.phone ||
        !props.email ||
        status.pending
      }
      onClick={async () => {
        try {
          // reset ownerOrder
          setOrderConfirmation(props.state);
          setOwnerOrder(false);

          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          setErrorMessage("Sorry we cant process your order right now.");
          setError(true);
        }
        await new Promise((resolve) => setTimeout(resolve, 250));
        setShowOrderConfirmation(true);
      }}
    >
      {status.pending ? "Sending Order... " : "Submit Order"}
    </button>
  );
}
