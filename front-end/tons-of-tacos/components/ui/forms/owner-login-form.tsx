"use client";
import classes from "./owner-login-form.module.css";
import { useActionState, useEffect, useRef, useState } from "react";
import {
  GetLogin,
  OwnerLogin,
  StoreLogin,
} from "@/lib/owner-session/owner-session-server";
import LoginButton from "../buttons/session-buttons/login/login-button";
import { useOwnerContext } from "@/context/session-context/owner-context";
import { useErrorContext } from "@/context/error-context";
import { useOrdersContext } from "@/context/order-context/orders-context";
import {
  checkID,
  checkPassword,
} from "@/lib/owner-session/credential-validation";

export default function OwnerLoginForm() {
  const initialState = {
    status: 0,
    response: {},
  };

  const [state, formAction] = useActionState(OwnerLogin, initialState);
  const { setLogin, setLoggedIn, login } = useOwnerContext();
  const { setError, setErrorMessage } = useErrorContext();
  const { setOrders } = useOrdersContext();

  const [idValid, setIdValid] = useState<boolean>(false);
  const idRef = useRef<string>("");
  const [passwordValid, setPasswordValid] = useState<boolean>(false);
  const passwordRef = useRef<string>("");

  function validateID(event: React.ChangeEvent<HTMLInputElement>) {
    idRef.current = event.target.value;
    setIdValid(checkID(idRef.current));
  }
  function validatePassword(event: React.ChangeEvent<HTMLInputElement>) {
    passwordRef.current = event.target.value;
    setPasswordValid(checkPassword(passwordRef.current));
  }

  useEffect(() => {
    async function Login() {
      if (state.status === 200) {
        StoreLogin(state.response);
        setLogin(await GetLogin());
        setLoggedIn(true);
        setError(false);
        setErrorMessage("");
      } else if (state.status != 0) {
        setErrorMessage(`${state.response} ` + "Please try again.");
        setError(true);
      }
    }
    Login();
  }, [
    login,
    setError,
    setErrorMessage,
    setLoggedIn,
    setLogin,
    setOrders,
    state.response,
    state.status,
  ]);

  return (
    <form className={classes.ownerLogin} action={formAction}>
      <input
        className={idValid ? classes.valid : classes.invalid}
        type="text"
        id="owner_id"
        name="owner_id"
        placeholder="Enter ID"
        maxLength={7}
        required
        onChange={validateID}
      />

      <input
        className={passwordValid ? classes.valid : classes.invalid}
        type="password"
        id="password"
        name="password"
        placeholder="Enter Password"
        maxLength={8}
        required
        onChange={validatePassword}
      />
      <LoginButton />
    </form>
  );
}
