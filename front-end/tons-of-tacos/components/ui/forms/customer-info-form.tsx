"use client";

import React, { useRef, useState, useActionState } from "react";
import SubmitButton from "../buttons/checkout/checkout-button";
import classes from "./customer-info-form.module.css";
import { checkEmail, checkName, checkPhone } from "@/lib/customer-form";
import { SendOrder } from "@/lib/cart";
import { useOrderConfirmationContext } from "@/context/order-confirmation-context";

export default function CustomerInfoForm() {
  const { setOrderConfirmation } = useOrderConfirmationContext();
  const initialState = { message: "" };
  const [state, formAction] = useActionState(SendOrder, initialState);

  const [firstNameValid, setFirstNameValid] = useState<boolean>(false);
  const [lastNameValid, setLastNameValid] = useState<boolean>(false);
  const [phoneValid, setPhoneValid] = useState<boolean>(false);
  const [emailValid, setEmailValid] = useState<boolean>(false);
  const [errors, setErrors] = useState({
    firstNameError: "First Name must not be blank",
    lastNameError: "Last Name must not be blank",
    phoneError: "Phone Number must not be blank",
    emailError: "Email must not be blank",
  });

  const firstName = useRef("false");
  const lastName = useRef("false");
  const phoneNumber = useRef("false");
  const email = useRef("false");

  function validateFirstName(event: React.ChangeEvent<HTMLInputElement>) {
    firstName.current = event.target.value;

    setFirstNameValid(checkName(firstName.current).valid);
    setErrors({
      ...errors,
      firstNameError: `${"First " + checkName(firstName.current).message}`,
    });
  }

  function validateLastName(event: React.ChangeEvent<HTMLInputElement>) {
    lastName.current = event.target.value;
    setLastNameValid(checkName(lastName.current).valid);
    setErrors({
      ...errors,
      lastNameError: `${"Last " + checkName(lastName.current).message}`,
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

  setOrderConfirmation(state.message);

  return (
    <form className={classes.form} action={formAction}>
      <div>
        <label className={classes.name}>Name</label>
        <input
          className={` 
            ${firstNameValid ? classes.valid : classes.invalid}

              `}
          type="text"
          id="first_name"
          name="first_name"
          placeholder="Enter First Name"
          maxLength={17}
          required
          onChange={validateFirstName}
        />
        <input
          className={` 
                ${lastNameValid ? classes.valid : classes.invalid}
                  `}
          type="text"
          id="last_name"
          name="last_name"
          placeholder="Enter Last Name"
          maxLength={17}
          required
          onChange={validateLastName}
        />
      </div>
      <div>
        {!firstNameValid && (
          <p className={classes.firstNameError}>{errors.firstNameError}</p>
        )}
        {!lastNameValid && (
          <p className={classes.lastNameError}>{errors.lastNameError}</p>
        )}
      </div>
      <div>
        <label>Phone</label>
        <input
          className={`${classes.phone} ${
            phoneValid ? classes.valid : classes.invalid
          }`}
          type="text"
          id="phone"
          name="phone"
          placeholder="Enter Phone Number (ie 555.555.5555)"
          required
          onChange={validatePhoneNumber}
        />
      </div>
      <div className={classes.errors}>
        {!phoneValid && (
          <p className={classes.phoneError}>{errors.phoneError}</p>
        )}
      </div>
      <div>
        <label>E-mail</label>
        <input
          className={`${classes.email}
            ${emailValid ? classes.valid : classes.invalid}
              `}
          type="text"
          id="email"
          name="email"
          placeholder="Enter E-Mail Address"
          required
          onChange={validateEmail}
        />
      </div>

      <div>
        {!emailValid && (
          <p className={classes.emailError}>{errors.emailError}</p>
        )}
      </div>
      <SubmitButton
        firstName={firstNameValid}
        lastName={lastNameValid}
        phone={phoneValid}
        email={emailValid}
        state={state.message}
      />
    </form>
  );
}
