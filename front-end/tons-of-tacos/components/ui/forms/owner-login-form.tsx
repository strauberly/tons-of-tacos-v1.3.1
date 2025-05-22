"use client";

import { useActionState, useEffect } from "react";
import classes from "./owner-login-form.module.css";
import { OwnerLogin } from "@/lib/ownerLogin/owner-login-server";
import LoginButton from "../buttons/login/login-button";
import { IsAuthenticated } from "@/lib/ownerLogin/owners-login-client";
import { useDisplayContext } from "@/context/display-context";

export default function OwnerLoginForm() {
  const { setShowLogin } = useDisplayContext();

  const initialState = {
    status: 0,
    response: {},
  };

  const [state, formAction] = useActionState(OwnerLogin, initialState);

  // useEffect(() => {
  // }, [setShowLogin]);

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
      <LoginButton status={state.status} response={state.response} />
    </form>
  );
}
