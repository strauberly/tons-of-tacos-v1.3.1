import { useModalContext } from "@/context/modal-context";
import Card from "../ui/cards/card";
import classes from "./order-view.module.css";
import OrderItem from "../owner-dashboard/order-item";
import { useDisplayContext } from "@/context/display-context";

import React, { useRef, useState } from "react";
import { checkEmail, checkName, checkPhone } from "@/lib/customer-form";
import AddOrderItem from "../owner-dashboard/add-order-item";
import { useEditOrderContext } from "@/context/edit-order-context";

export default function OrderView() {
  const { orderToView } = useModalContext();
  const { setViewOrder } = useDisplayContext();
  const { setShowConfirmation } = useDisplayContext();
  const { setConfirmationTitle } = useModalContext();
  const { setCustomer } = useEditOrderContext();

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

  const [currentFirstName, setCurrentFirstName] = useState<string>(firstName);
  const [currentLastName, setCurrentLastName] = useState<string>(lastName);
  const [currentPhone, setCurrentPhone] = useState<string>(orderToView.phone);
  const [currentEmail, setCurrentEmail] = useState<string>(orderToView.email);

  const [editName, setEditName] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);
  const [editPhone, setEditPhone] = useState<boolean>(false);
  const [editEmail, setEditEmail] = useState<boolean>(false);

  const [firstNameValid, setFirstNameValid] = useState<boolean>(false);
  const [lastNameValid, setLastNameValid] = useState<boolean>(false);
  const [phoneValid, setPhoneValid] = useState<boolean>(false);
  const [emailValid, setEmailValid] = useState<boolean>(false);
  const firstNameValidRef = useRef("true");
  const lastNameValidRef = useRef("false");
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
    firstNameValidRef.current = event.target.value;
    setFirstNameValid(checkName(firstNameValidRef.current).valid);
    setErrors({
      ...errors,
      firstNameError: `${
        "First " + checkName(firstNameValidRef.current).message
      }`,
    });
  }

  function validateLastName(event: React.ChangeEvent<HTMLInputElement>) {
    lastNameValidRef.current = event.target.value;
    setLastNameValid(checkName(lastNameValidRef.current).valid);
    setErrors({
      ...errors,
      lastNameError: `${"Last " + checkName(lastNameValidRef.current).message}`,
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

  function updateFirstName(e: React.ChangeEvent<HTMLInputElement>) {
    setCurrentFirstName(e.target.value);
    validateFirstName(e);
  }
  function updateLastName(e: React.ChangeEvent<HTMLInputElement>) {
    setCurrentLastName(e.target.value);
    validateLastName(e);
  }
  function updatePhone(e: React.ChangeEvent<HTMLInputElement>) {
    setCurrentPhone(e.target.value);
    validatePhoneNumber(e);
  }
  function updateEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setCurrentEmail(e.target.value);
    validateEmail(e);
  }

  const customerNameRef = useRef<string>(orderToView.name);
  const customerPhoneRef = useRef<string>(orderToView.phone);
  const customerEmailRef = useRef<string>(orderToView.email);

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
              <p>Customer Id:</p>
              <p>{orderToView.customerUid}</p>
              <p>Created:</p>
              <p>{`${time + " " + date}`}</p>
              <p>Total:</p>
              <p>${orderToView.orderTotal.toFixed(2)}</p>
            </div>
            {/* editable grid */}
            <div>
              <div className={classes.editableDetails}>
                <p className={classes.editableDetailsTitle}>Name:</p>
                <p>
                  {`${
                    currentFirstName.charAt(0).toUpperCase() +
                    currentFirstName
                      .substring(1, currentEmail.length)
                      .toLowerCase()
                  }` +
                    " " +
                    `${
                      currentLastName.charAt(0).toUpperCase() +
                      currentLastName
                        .substring(1, currentEmail.length)
                        .toLowerCase()
                    }`}
                </p>
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
                      onChange={updateFirstName}
                    />

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
                      onChange={updateLastName}
                    />
                    {!lastNameValid && (
                      <p className={classes.error}>{errors.lastNameError}</p>
                    )}
                  </div>
                )}
                {editName == false && (
                  <button onClick={() => setEditName(!editName)}>
                    Edit Name
                  </button>
                )}
                {editName == true &&
                  firstNameValid == false &&
                  lastNameValid == false && (
                    <button onClick={() => setEditName(!editName)}>
                      Cancel
                    </button>
                  )}
                {firstNameValid === true && lastNameValid === true && (
                  <button
                    onClick={() => [
                      setEditName(!editName),
                      setFirstNameValid(false),
                      setLastNameValid(false),
                      setUpdate(!update),
                      (customerNameRef.current =
                        `${
                          currentFirstName.charAt(0).toUpperCase() +
                          currentFirstName
                            .substring(1, currentEmail.length)
                            .toLowerCase()
                        }` +
                        " " +
                        `${
                          currentLastName.charAt(0).toUpperCase() +
                          currentLastName
                            .substring(1, currentEmail.length)
                            .toLowerCase()
                        }`),
                    ]}
                  >
                    Done
                  </button>
                )}
              </div>
              <div className={classes.editableDetails}>
                <p className={classes.editableDetailsTitle}>Phone:</p>
                <p>{currentPhone}</p>
                {editPhone && (
                  <div>
                    <input
                      className={` ${
                        phoneValid ? classes.valid : classes.invalid
                      }`}
                      placeholder={`${currentPhone}`}
                      type="text"
                      id="phone"
                      name="phone"
                      required
                      maxLength={12}
                      onChange={updatePhone}
                    />
                    {!phoneValid && (
                      <p className={classes.error}>{errors.phoneError}</p>
                    )}
                  </div>
                )}
                {editPhone == false && (
                  <button onClick={() => setEditPhone(!editPhone)}>
                    Edit Phone
                  </button>
                )}
                {editPhone == true && phoneValid == false && (
                  <button onClick={() => setEditPhone(!editPhone)}>
                    Cancel
                  </button>
                )}
                {phoneValid && (
                  <button
                    onClick={() => [
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
              <div className={classes.editableDetails}>
                <p className={classes.editableDetailsTitle}>Email:</p>
                <p>{currentEmail}</p>

                {editEmail && (
                  <div>
                    <input
                      className={` ${
                        emailValid ? classes.valid : classes.invalid
                      }`}
                      placeholder={`${currentEmail}`}
                      type="text"
                      id="email"
                      name="email"
                      required
                      maxLength={32}
                      onChange={updateEmail}
                    ></input>
                    {!emailValid && (
                      <p className={classes.error}>{errors.emailError}</p>
                    )}
                  </div>
                )}
                {editEmail == false && (
                  <button onClick={() => setEditEmail(!editEmail)}>
                    Edit Email
                  </button>
                )}
                {editEmail == true && emailValid == false && (
                  <button onClick={() => setEditEmail(!editEmail)}>
                    Cancel
                  </button>
                )}
                {emailValid && (
                  <button
                    onClick={() => [
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
            </div>

            <div className={classes.contactUpdate}>
              <button
                onClick={() => [
                  setConfirmationTitle("Update Customer"),
                  setShowConfirmation(true),
                  setCustomer({
                    customerUid: orderToView.customerUid,
                    name:
                      `${
                        currentFirstName.charAt(0).toUpperCase() +
                        currentFirstName
                          .substring(1, currentEmail.length)
                          .toLowerCase()
                      }` +
                      " " +
                      `${
                        currentLastName.charAt(0).toUpperCase() +
                        currentLastName
                          .substring(1, currentEmail.length)
                          .toLowerCase()
                      }`,
                    phone: currentPhone,
                    email: currentEmail,
                  }),
                ]}
              >
                Update
              </button>
              <button
                onClick={() => [
                  setCurrentFirstName(firstName),
                  setCurrentLastName(lastName),
                  setCurrentEmail(orderToView.email),
                  setCurrentPhone(orderToView.phone),
                  setUpdate(!update),
                ]}
              >
                Cancel
              </button>
            </div>
          </div>
          <div>
            {/* orderitems and titles */}
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
            </div>
            <AddOrderItem />
          </div>
          <button
            className={classes.button}
            onClick={() => setViewOrder(false)}
          >
            Close
          </button>
        </div>
      </Card>
    </div>
  );
}
