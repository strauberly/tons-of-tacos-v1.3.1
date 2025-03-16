"use client";

import { useActionState } from "react";
import classes from "./owner-login-form.module.css";
import { OwnerLogin } from "@/lib/owner-login";
import LoginButton from "../buttons/login/login-button";

export default function OwnerLoginForm() {
  const initialState = { token: "" };
  const [state, formAction] = useActionState(OwnerLogin, initialState);

  console.log(state.token);
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
      <LoginButton state={state.token} />
    </form>
  );
}
