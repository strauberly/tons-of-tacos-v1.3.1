"use client";

import React, { useRef, useState, useActionState, useEffect } from "react";
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

  useEffect(() => {
    setOrderConfirmation(state.message);
  });

  return (
    <form className={classes.form} action={formAction}>
      <div className={classes.names}>
        <label className={classes.name}>Name</label>
        <div className={classes.first}>
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
          {!firstNameValid && (
            <p className={classes.firstNameError}>{errors.firstNameError}</p>
          )}
          <div />
        </div>
        <div className={classes.last}>
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
          {!lastNameValid && (
            <p className={classes.lastNameError}>{errors.lastNameError}</p>
          )}
        </div>
      </div>
      <div className={classes.phone}>
        <label>Phone</label>
        <div className={classes.phoneColumn}>
          <input
            className={` ${phoneValid ? classes.valid : classes.invalid}`}
            type="text"
            id="phone"
            name="phone"
            placeholder="Enter Phone Number (ie 555.555.5555)"
            required
            onChange={validatePhoneNumber}
          />
          {!phoneValid && (
            <p className={classes.phoneError}>{errors.phoneError}</p>
          )}
        </div>
      </div>
      <div className={classes.email}>
        <label>E-mail</label>
        <div className={classes.emailColumn}>
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
          {!emailValid && (
            <p className={classes.emailError}>{errors.emailError}</p>
          )}
        </div>
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
