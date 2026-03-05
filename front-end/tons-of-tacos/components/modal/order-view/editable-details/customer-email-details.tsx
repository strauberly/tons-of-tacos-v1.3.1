import { useOrdersContext } from "@/context/order-context/orders-context";
import { useModalContext } from "@/context/modal-context";
import { useOwnerContext } from "@/context/session-context/owner-context";
import { checkEmail } from "@/lib/customer-form";
import { useRef, useState } from "react";
import classes from "./editables.module.css";
import { useDisplayContext } from "@/context/display-context";
import { GetAllOrders } from "@/lib/owners-tools/owners-tools-server";
import { UpdateCustomerEmail } from "@/lib/owners-tools/owners-tools-customers/edit-customer-server";

export default function CustomerEmailDetails() {
  const { orderToView, setOrderToView, setModalMessage } = useModalContext();
  const { login } = useOwnerContext();
  const { setOrders } = useOrdersContext();
  const { setShowModal } = useDisplayContext();

  const customerEmailRef = useRef<string>(orderToView.email);
  const email = useRef("true");
  const response = useRef<UpdateCustomerResponse>({ status: 0, body: "" });

  const [currentEmail, setCurrentEmail] = useState<string>(orderToView.email);
  const [update, setUpdate] = useState<boolean>(false);
  const [emailEdited, setEmailEdited] = useState<boolean>(false);
  const [editEmail, setEditEmail] = useState<boolean>(false);
  const [emailValid, setEmailValid] = useState<boolean>(true);
  const [errors, setErrors] = useState({
    emailError: "Email must not be blank",
  });

  function validateEmail(event: React.ChangeEvent<HTMLInputElement>) {
    customerEmailRef.current = event.target.value;

    setEmailValid(checkEmail(customerEmailRef.current).valid);
    setErrors({
      ...errors,
      emailError: checkEmail(customerEmailRef.current).message,
    });
  }

  function updateEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setCurrentEmail(e.target.value);
    validateEmail(e);
    setEmailEdited(true);
  }

  function updateCustomerEmail(resp: UpdateCustomerResponse) {
    setModalMessage(resp.body);
    setShowModal(true);
  }

  return (
    <div className={classes.editableDetails}>
      <p className={classes.editableDetailsTitle}>Email:</p>
      <p>{currentEmail}</p>

      {editEmail && (
        <div>
          <input
            className={` ${emailValid ? classes.valid : classes.invalid}`}
            placeholder={`${email.current}`}
            type="text"
            id="email"
            name="email"
            required
            maxLength={32}
            value={currentEmail}
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
      {editEmail  && emailEdited  && emailValid && (
        <button
          onClick={async () => [
            (response.current = await UpdateCustomerEmail(
              orderToView.customerUid,
              currentEmail,
              login.accessToken
            )),
            updateCustomerEmail(response.current),
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
            setEmailValid(true),
            setEmailEdited(false),
            setUpdate(!update),
            (customerEmailRef.current = currentEmail),
            setOrders(await GetAllOrders(login.accessToken)),
          ]}
        >
          Done
        </button>
      )}
    </div>
  );
}
