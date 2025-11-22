"use client";

import { useActionState, useEffect, useRef } from "react";
import classes from "./owner-login-form.module.css";
import {
  GetLogin,
  OwnerLogin,
  StoreLogin,
} from "@/lib/ownerLogin/owner-login-server";
import LoginButton from "../buttons/login/login-button";
import { IsAuthenticated } from "@/lib/ownerLogin/owners-login-client";
import { useDisplayContext } from "@/context/display-context";
import { useOwnerContext } from "@/context/owner-context";

export default function OwnerLoginForm() {
  // const { setShowLogin } = useDisplayContext();

  const initialState = {
    status: 0,
    response: {},
  };

  // try setting here
  const [state, formAction] = useActionState(OwnerLogin, initialState);
  const { setLogin, setLoggedIn, login } = useOwnerContext();

  // useEffect(() => {
  // }, [setShowLogin]);

  const loginRef = useRef<OwnerLogin>({
    accessToken: "",
    refreshToken: "",
    ownerName: "",
  });

  useEffect(() => {
    async function LOGIN() {
      if (state.status === 200) {
        StoreLogin(state.response);
        setLogin(await GetLogin());
        setLoggedIn(true);
      }
      // set 403
    }
    LOGIN();
  }, [login, setLoggedIn, setLogin, state.response, state.status]);

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
        type="password"
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
