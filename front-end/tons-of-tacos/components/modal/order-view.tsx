import { useModalContext } from "@/context/modal-context";
import Card from "../ui/cards/card";
import classes from "./order-view.module.css";
import OrderItem from "../owner-dashboard/order-item";
import {
  // DisplayContextProvider,
  useDisplayContext,
} from "@/context/display-context";
import { p } from "framer-motion/client";
import { useRef, useState } from "react";
import { checkEmail, checkName, checkPhone } from "@/lib/customer-form";
// import { useRef, useState } from "react";
export default function OrderView() {
  const { orderToView } = useModalContext();
  const { setViewOrder } = useDisplayContext();

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

  // // validation functions
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

  // const firstName: string = order.order.name.substring(
  //   0,
  //   order.order.name.indexOf(" ")
  // );

  // const lastName: string = order.order.name.substring(
  //   order.order.name.indexOf(" ") + 1,
  //   order.order.name.length
  // );

  const time: string = new Date(orderToView.created).toLocaleTimeString([], {
    timeStyle: "short",
  });
  const date: string = new Date(orderToView.created).toLocaleDateString();

  const orderItemArr: OrderItem[] = orderToView.orderItems;

  const itemTitles: string[] = ["Item", "Quantity", "Size", "Item Total"];

  const firstName: string = orderToView.name.substring(
    0,
    orderToView.name.indexOf(" ")
  );

  const lastName: string = orderToView.name.substring(
    orderToView.name.indexOf(" ") + 1,
    orderToView.name.length
  );

  const displayCategories: string[] = [
    "Order Id: ",
    "Created: ",
    "Customer Name: ",
    "Phone: ",
    "E-mail: ",
  ];

  return (
    // main to demo card
    <div className={classes.orderView}>
      <Card expand={true}>
        <div>
          <div className={classes.orderDetails}>
            {/* uneditable grid */}
            <div className={classes.uneditableDetails}>
              <p>Order Id:</p>
              <p>{orderToView.orderUid}</p>
              <p>Created:</p>
              <p>{`${time + " " + date}`}</p>
            </div>
            {/* editable grid */}
            <div>
              <div className={classes.editableDetails}>
                <p>Name:</p>
                <p>{orderToView.name}</p>
                {editName && (
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
                    <div className={classes.errorContainer}></div>
                    {!firstNameValid && (
                      <p className={classes.error}>{errors.firstNameError}</p>
                    )}
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
                <button onClick={() => setEditName(!editName)}>
                  Edit Name
                </button>
              </div>
              <div className={classes.editableDetails}>
                <p>Phone:</p>
                <p>{orderToView.phone}</p>
                {editPhone && (
                  <div>
                    <input
                      className={` ${
                        phoneValid ? classes.valid : classes.invalid
                      }`}
                      placeholder={`${orderToView.phone}`}
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
                <button onClick={() => setEditPhone(!editPhone)}>
                  Edit Phone
                </button>
              </div>
              <div className={classes.editableDetails}>
                <p>Email:</p>
                <p>{orderToView.email}</p>
                {editEmail && (
                  <div>
                    <input
                      className={` ${
                        emailValid ? classes.valid : classes.invalid
                      }`}
                      placeholder={`${orderToView.email}`}
                      type="text"
                      id="email"
                      name="email"
                      required
                      maxLength={12}
                      onChange={validateEmail}
                    ></input>
                    {!phoneValid && (
                      <p className={classes.error}>{errors.emailError}</p>
                    )}
                  </div>
                )}
                <button onClick={() => setEditEmail(!editEmail)}>
                  Edit Email
                </button>
              </div>
            </div>
          </div>
          <div>
            <div>
              <ul className={classes.itemTitles}>
                {itemTitles.map((title) => (
                  <p key={title}>{`${title.toString()}`}</p>
                ))}
              </ul>
            </div>

            <div className={classes.orderItems}>
              <ul>
                {orderItemArr.map((orderItem) => (
                  <OrderItem
                    key={orderItem.orderItemId}
                    orderItem={orderItem}
                  />
                ))}
              </ul>
              <button
                className={classes.button}
                onClick={() => setViewOrder(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
