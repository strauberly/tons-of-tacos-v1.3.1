"use client";
import classes from "./owner-login-form.module.css";
import { useActionState, useEffect } from "react";
import {
  GetLogin,
  OwnerLogin,
  StoreLogin,
} from "@/lib/owner-session/owner-session-server";
import LoginButton from "../buttons/login/login-button";
import { useOwnerContext } from "@/context/owner-context";

export default function OwnerLoginForm() {
  const initialState = {
    status: 0,
    response: {},
  };

  const [state, formAction] = useActionState(OwnerLogin, initialState);
  const { setLogin, setLoggedIn, login } = useOwnerContext();

  useEffect(() => {
    async function Login() {
      // def get error message in here/try catch
      if (state.status === 200) {
        StoreLogin(state.response);
        setLogin(await GetLogin());
        console.log("login form: " + login.accessToken);
        console.log("login form: " + login.refreshToken);
        console.log("login form: " + login.ownerName);
        setLoggedIn(true);
      }
    }
    Login();
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
      <LoginButton />
    </form>
  );
}
