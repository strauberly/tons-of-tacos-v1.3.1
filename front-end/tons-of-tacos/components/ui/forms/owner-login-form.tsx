"use client";

import { useActionState, useEffect } from "react";
import classes from "./owner-login-form.module.css";
import { OwnerLogin } from "@/lib/owner-login";
import LoginButton from "../buttons/login/login";
import { useOwnerTokenContext } from "@/context/owner-context";

export default function OwnerLoginForm() {
  const initialState = { token: "" };
  const [state, formAction] = useActionState(OwnerLogin, initialState);
  // const { setOwnerToken } = useOwnerTokenContext();

  // useEffect(() => {
  //   setOwnerToken(state.token);
  // });

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
      <LoginButton state={initialState} />
    </form>
  );
}
