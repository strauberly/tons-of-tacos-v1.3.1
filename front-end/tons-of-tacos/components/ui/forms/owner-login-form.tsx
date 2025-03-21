"use client";

import { useActionState, useEffect } from "react";
import classes from "./owner-login-form.module.css";
import { OwnerLogin } from "@/lib/owner-login";
import LoginButton from "../buttons/login/login-button";
import { useOwnerContext } from "@/context/owner-context";

export default function OwnerLoginForm() {
  // const initialState = { token: "" };
  const responseObj = {
    status: 0,
    response: {},
  };
  const initialState = {
    status: 0,
    response: { token: "null", ownerName: "null" },
  };
  // const initialState = { responseObj};
  const [state, formAction] = useActionState(OwnerLogin, initialState);

  const { login, setLogin } = useOwnerContext();

  useEffect(() => {
    console.log(state.response);
    setLogin(state.response);
    console.log(login);
  });

  return (
    <form className={classes.ownerLogin} action={formAction}>
      <input
        type="text"
        id="owner_id"
        name="owner_id"
        placeholder="Enter ID"
        maxLength={7}
        required
      />

      <input
        type="text"
        id="password"
        name="password"
        placeholder="Enter Password"
        maxLength={8}
        required
      />
      {/* <LoginButton login={login} /> */}
      <LoginButton />
    </form>
  );
}
