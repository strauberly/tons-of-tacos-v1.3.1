import { useOwnerContext } from "@/context/session-context/owner-context";
import classes from "./editables.module.css";
import { useModalContext } from "@/context/modal-context";
import { checkPhone } from "@/lib/customer-form";
import { formatPhone } from "@/lib/multi-use/multi-use";
import { useRef, useState } from "react";
import { useOrdersContext } from "@/context/order-context/orders-context";
import { useDisplayContext } from "@/context/display-context";
import { GetAllOrders } from "@/lib/owners-tools/owners-tools-server";
import { UpdateCustomerPhone } from "@/lib/owners-tools/owners-tools-customers/edit-customer-server";

export default function CustomerPhoneDetails() {
  const { orderToView, setOrderToView, setModalMessage } = useModalContext();
  const { login } = useOwnerContext();
  const { setOrders } = useOrdersContext();
  const { setShowModal } = useDisplayContext();

  const customerPhoneRef = useRef<string>(orderToView.phone);
  const response = useRef<UpdateCustomerResponse>({ status: 0, body: "" });

  const [currentPhone, setCurrentPhone] = useState<string>(orderToView.phone);
  const [update, setUpdate] = useState<boolean>(false);
  const [phoneEdited, setPhoneEdited] = useState<boolean>(false);
  const [editPhone, setEditPhone] = useState<boolean>(false);
  const [phoneValid, setPhoneValid] = useState<boolean>(true);
  const [errors, setErrors] = useState({
    phoneError: "Phone Number must not be blank",
  });

  function validatePhoneNumber(event: React.ChangeEvent<HTMLInputElement>) {
    customerPhoneRef.current = formatPhone(event.target.value);

    setPhoneValid(checkPhone(customerPhoneRef.current).valid);
    setErrors({
      ...errors,
      phoneError: checkPhone(customerPhoneRef.current).message,
    });
  }

  function updatePhone(e: React.ChangeEvent<HTMLInputElement>) {
    setCurrentPhone(e.target.value);
    validatePhoneNumber(e);
    setPhoneEdited(true);
  }

  function updateCustomerPhone(resp: UpdateCustomerResponse) {
    setModalMessage(resp.body);
    setShowModal(true);
  }

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
            value={currentPhone}
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
      {editPhone && phoneEdited && phoneValid && (
        <button
          onClick={async () => [
            (response.current = await UpdateCustomerPhone(
              orderToView.customerUid,
              currentPhone,
              login.accessToken
            )),
            updateCustomerPhone(response.current),
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
            setPhoneEdited(false),
            setPhoneValid(true),
            setUpdate(!update),
            (customerPhoneRef.current = currentPhone),
            setOrders(await GetAllOrders(login.accessToken)),
          ]}
        >
          Done
        </button>
      )}
    </div>
  );
}
