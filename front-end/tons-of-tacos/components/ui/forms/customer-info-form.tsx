"use client";
import classes from "./customer-info-form.module.css";

import React, { useRef, useState, useActionState, useEffect } from "react";
import SubmitButton from "../buttons/submit-order/submitOrder-button";
import { checkEmail, checkName, checkPhone } from "@/lib/customer-form";
import { SendOrder, setIsLoggedIn } from "@/lib/cart";
import { useOrderConfirmationContext } from "@/context/order-confirmation-context";
import { useOwnerContext } from "@/context/owner-context";
import { isLoggedIn } from "@/lib/owners-tools/owners-tools-client";
import { formatPhone } from "@/lib/general/multi-use";

export default function CustomerInfoForm() {
  const { setOrderConfirmation } = useOrderConfirmationContext();
  const { loggedIn } = useOwnerContext();
  const initialState = { message: "" };
  const [state, formAction] = useActionState(SendOrder, initialState);
  console.log(loggedIn);
  /*
  check if logged in, if so set user library function and call in send order
  in add item check if login create new order
  set the logic for if should use cart or new order from owner
  */

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
  const phoneNumber = useRef("");
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

  // function formatNumber(input: string) {
  //   if (!input) return input;
  //   const numberInput: string = input.replace(/[^\d]/g, "");
  //   const inputLength: number = numberInput.length;

  //   if (inputLength < 4) {
  //     return numberInput;
  //   } else if (inputLength < 7) {
  //     return `${numberInput.slice(0, 3)}.${numberInput.slice(3)}`;
  //   } else {
  //     return `${numberInput.slice(0, 3)}.${numberInput.slice(
  //       3,
  //       6
  //     )}.${numberInput.slice(6)}`;
  //   }
  // }

  function validatePhoneNumber(event: React.ChangeEvent<HTMLInputElement>) {
    const formattedNumber = formatPhone(event.target.value);

    phoneNumber.current = formattedNumber;

    console.log(phoneNumber.current);
    console.log(formattedNumber);

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
    async function CheckLogin() {
      setIsLoggedIn(loggedIn);
    }
    CheckLogin();
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
            placeholder="Enter Numbers Only (Auto Formatted)"
            required
            maxLength={12}
            onChange={validatePhoneNumber}
            value={phoneNumber.current}
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
            className={`
            ${emailValid ? classes.valid : classes.invalid}
            `}
            type="text"
            id="email"
            name="email"
            placeholder="Enter E-Mail Address"
            required
            maxLength={30}
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
