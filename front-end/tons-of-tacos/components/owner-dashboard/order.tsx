// import { useModalContext } from "@/context/modal-context";
import ViewOrderButton from "../ui/buttons/view-order/view-order-button";
import { useRef, useState } from "react";
import classes from "../owner-dashboard/owner-dashboard.module.css";
import { checkEmail, checkName, checkPhone } from "@/lib/customer-form";
import DeleteOrderButton from "../ui/buttons/order-edit/delete-order-button";
// import { DeleteOrder } from "@/lib/owners-tools/owners-tools";

export default function Order(order: { order: Order }) {
  // const { setOrderToView } = useModalContext();

  const time: string = new Date(order.order.created).toLocaleTimeString([], {
    timeStyle: "short",
  });
  const date: string = new Date(order.order.created).toLocaleDateString();

  const total: number = +order.order.orderTotal;

  // const ownerLogin: OwnerLogin = getLogin();

  const [editName, setEditName] = useState<boolean>(false);
  const [editPhone, setEditPhone] = useState<boolean>(false);
  const [editEmail, setEditEmail] = useState<boolean>(false);

  const [firstNameValid, setFirstNameValid] = useState<boolean>(false);

  const [lastNameValid, setLastNameValid] = useState<boolean>(false);
  const [phoneValid, setPhoneValid] = useState<boolean>(false);
  const [emailValid, setEmailValid] = useState<boolean>(false);
  const firstNameRef = useRef("false");
  const lastNameRef = useRef("false");
  const phoneNumber = useRef("false");
  const email = useRef("false");

  const [errors, setErrors] = useState({
    firstNameError: "First Name must not be blank",
    lastNameError: "Last Name must not be blank",
    phoneError: "Phone Number must not be blank",
    emailError: "Email must not be blank",
  });

  // validation functions
  function validateFirstName(event: React.ChangeEvent<HTMLInputElement>) {
    firstNameRef.current = event.target.value;
    setFirstNameValid(checkName(firstNameRef.current).valid);
    setErrors({
      ...errors,
      firstNameError: `${"First " + checkName(firstNameRef.current).message}`,
    });
  }

  function validateLastName(event: React.ChangeEvent<HTMLInputElement>) {
    lastNameRef.current = event.target.value;
    setLastNameValid(checkName(lastNameRef.current).valid);
    setErrors({
      ...errors,
      lastNameError: `${"Last " + checkName(lastNameRef.current).message}`,
    });
  }

  function validatePhoneNumber(event: React.ChangeEvent<HTMLInputElement>) {
    phoneNumber.current = event.target.value;
    setPhoneValid(checkPhone(phoneNumber.current).valid);
    setErrors({
      ...errors,
      phoneError: checkPhone(phoneNumber.current).message,
    });
  }

  function validateEmail(event: React.ChangeEvent<HTMLInputElement>) {
    email.current = event.target.value;

    setEmailValid(checkEmail(email.current).valid);
    setErrors({
      ...errors,
      emailError: checkEmail(email.current).message,
    });
  }

  const firstName: string = order.order.name.substring(
    0,
    order.order.name.indexOf(" ")
  );

  const lastName: string = order.order.name.substring(
    order.order.name.indexOf(" ") + 1,
    order.order.name.length
  );

  return (
    <li>
      <p>{`${order.order.orderUid}`}</p>
      <div>
        {!editName ? (
          <p>{`${order.order.name}`}</p>
        ) : (
          <div>
            <input
              className={` 
            ${firstNameValid ? classes.valid : classes.invalid}`}
              placeholder={`${firstName}`}
              type="text"
              id="first_name"
              name="first_name"
              maxLength={17}
              required
              onChange={validateFirstName}
            ></input>
            <div className={classes.errorContainer}>
              {!firstNameValid && (
                <p className={classes.error}>{errors.firstNameError}</p>
              )}
            </div>
            <input
              className={` 
              ${lastNameValid ? classes.valid : classes.invalid}`}
              placeholder={`${lastName}`}
              type="text"
              id="last_name"
              name="last_name"
              maxLength={17}
              required
              onChange={validateLastName}
            ></input>
            {!lastNameValid && (
              <p className={classes.error}>{errors.lastNameError}</p>
            )}
          </div>
        )}
        <button onClick={() => setEditName(!editName)}>Edit Name</button>
      </div>
      <div>
        {!editPhone ? (
          <p>{`${order.order.phone}`}</p>
        ) : (
          <div>
            <input
              className={` ${phoneValid ? classes.valid : classes.invalid}`}
              placeholder={`${order.order.phone}`}
              type="text"
              id="phone"
              name="phone"
              required
              maxLength={12}
              onChange={validatePhoneNumber}
            ></input>
            {!phoneValid && (
              <p className={classes.error}>{errors.phoneError}</p>
            )}
          </div>
        )}
        <button onClick={() => setEditPhone(!editPhone)}>Edit Phone</button>
      </div>
      <div>
        {!editEmail ? (
          <p>{`${order.order.email}`}</p>
        ) : (
          <div>
            <input
              className={` 
              ${emailValid ? classes.valid : classes.invalid}`}
              placeholder={`${order.order.email}`}
              type="text"
              id="email"
              name="email"
              required
              maxLength={30}
              onChange={validateEmail}
            ></input>
            {!emailValid && (
              <p className={classes.error}>{errors.emailError}</p>
            )}
          </div>
        )}
        <button onClick={() => setEditEmail(!editEmail)}>Edit Email</button>
      </div>
      <p>{`$${total.toFixed(2)}`}</p>
      <p>{`${time}`}</p>
      <p>{`${date}`}</p>
      <div>
        <p>{`${order.order.ready}`}</p>
        <button>Mark Ready</button>
      </div>
      <div>
        <p>{`${order.order.closed}`}</p>
        <button>Close Order</button>
      </div>
      <div className={classes.viewUpdateDelete}>
        <ViewOrderButton order={order.order} />
        <button>Update</button>
        <DeleteOrderButton order={order.order} />
      </div>
    </li>
  );
}
