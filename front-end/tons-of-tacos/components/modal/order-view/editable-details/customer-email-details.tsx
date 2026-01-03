import classes from "../order-view.module.css";
import { useModalContext } from "@/context/modal-context";
import { checkEmail } from "@/lib/customer-form";
import { useRef, useState } from "react";

export default function CustomerEmailDetails() {
  const { orderToView, setOrderToView } = useModalContext();
  const [currentEmail, setCurrentEmail] = useState<string>(orderToView.email);
  const [update, setUpdate] = useState<boolean>(false);
  const [editEmail, setEditEmail] = useState<boolean>(false);
  const [emailValid, setEmailValid] = useState<boolean>(false);
  const email = useRef("false");

  const [errors, setErrors] = useState({
    emailError: "Email must not be blank",
  });

  function validateEmail(event: React.ChangeEvent<HTMLInputElement>) {
    email.current = event.target.value;

    setEmailValid(checkEmail(email.current).valid);
    setErrors({
      ...errors,
      emailError: checkEmail(email.current).message,
    });
  }

  function updateEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setCurrentEmail(e.target.value);
    validateEmail(e);
  }

  const customerEmailRef = useRef<string>(orderToView.email);

  return (
    <div className={classes.editableDetails}>
      <p className={classes.editableDetailsTitle}>Email:</p>
      <p>{currentEmail}</p>

      {editEmail && (
        <div>
          <input
            className={` ${emailValid ? classes.valid : classes.invalid}`}
            placeholder={`${currentEmail}`}
            type="text"
            id="email"
            name="email"
            required
            maxLength={32}
            onChange={updateEmail}
          ></input>
          {!emailValid && <p className={classes.error}>{errors.emailError}</p>}
        </div>
      )}
      {editEmail == false && (
        <button
          disabled={orderToView.ready !== "no" || orderToView.closed !== "no"}
          onClick={() => setEditEmail(!editEmail)}
        >
          Edit Email
        </button>
      )}
      {editEmail == true && (
        <button
          onClick={() => [
            setCurrentEmail(orderToView.email),
            setEditEmail(!editEmail),
          ]}
        >
          Cancel
        </button>
      )}
      {emailValid && (
        <button
          onClick={() => [
            setOrderToView({
              orderUid: orderToView.orderUid,
              customerUid: orderToView.customerUid,
              name: orderToView.name,
              email: currentEmail,
              phone: orderToView.phone,
              orderTotal: orderToView.orderTotal,
              orderItems: orderToView.orderItems,
              created: orderToView.created,
              ready: orderToView.ready,
              closed: orderToView.closed,
            }),
            setEditEmail(!editEmail),
            setEmailValid(!emailValid),
            setUpdate(!update),
            (customerEmailRef.current = currentEmail),
          ]}
        >
          Done
        </button>
      )}
    </div>
  );
}
