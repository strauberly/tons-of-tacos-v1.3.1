import classes from "./order-view.module.css";
import { useModalContext } from "@/context/modal-context";
import { checkPhone } from "@/lib/customer-form";
import { useRef, useState } from "react";

export default function CustomerPhoneDetails() {
  const { orderToView, setOrderToView } = useModalContext();
  const [currentPhone, setCurrentPhone] = useState<string>(orderToView.phone);

  const [editPhone, setEditPhone] = useState<boolean>(false);
  const [phoneValid, setPhoneValid] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);
  const phoneNumber = useRef("false");

  const [errors, setErrors] = useState({
    phoneError: "Phone Number must not be blank",
  });

  function validatePhoneNumber(event: React.ChangeEvent<HTMLInputElement>) {
    phoneNumber.current = event.target.value;
    setPhoneValid(checkPhone(phoneNumber.current).valid);
    setErrors({
      ...errors,
      phoneError: checkPhone(phoneNumber.current).message,
    });
  }

  function updatePhone(e: React.ChangeEvent<HTMLInputElement>) {
    setCurrentPhone(e.target.value);
    validatePhoneNumber(e);
  }

  const customerPhoneRef = useRef<string>(orderToView.phone);

  return (
    <div className={classes.editableDetails}>
      <p className={classes.editableDetailsTitle}>Phone:</p>
      <p>{currentPhone}</p>
      {editPhone && (
        <div>
          <input
            className={` ${phoneValid ? classes.valid : classes.invalid}`}
            placeholder={`${currentPhone}`}
            type="text"
            id="phone"
            name="phone"
            required
            maxLength={12}
            onChange={updatePhone}
          />
          {!phoneValid && <p className={classes.error}>{errors.phoneError}</p>}
        </div>
      )}
      {editPhone == false && (
        <button
          disabled={orderToView.ready !== "no" || orderToView.closed !== "no"}
          onClick={() => setEditPhone(!editPhone)}
        >
          Edit Phone
        </button>
      )}
      {editPhone == true && (
        <button
          onClick={() => [
            setCurrentPhone(orderToView.phone),
            setEditPhone(!editPhone),
          ]}
        >
          Cancel
        </button>
      )}
      {phoneValid && (
        <button
          onClick={() => [
            setOrderToView({
              orderUid: orderToView.orderUid,
              customerUid: orderToView.customerUid,
              name: orderToView.name,
              email: orderToView.email,
              phone: currentPhone,
              orderTotal: orderToView.orderTotal,
              orderItems: orderToView.orderItems,
              created: orderToView.created,
              ready: orderToView.ready,
              closed: orderToView.closed,
            }),
            setEditPhone(!editPhone),
            setPhoneValid(!phoneValid),
            setUpdate(!update),
            (customerPhoneRef.current = currentPhone),
          ]}
        >
          Done
        </button>
      )}
    </div>
  );
}
