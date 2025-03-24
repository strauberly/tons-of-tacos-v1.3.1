"use client";

import { useActionState, useEffect, useRef } from "react";
import classes from "./owner-login-form.module.css";
import { OwnerLogin } from "@/lib/owner-login";
import LoginButton from "../buttons/login/login-button";
import { useOwnerContext } from "@/context/owner-context";
import { getLogin, IsAuthenticated, storeLogin } from "@/lib/owners-tools";

export default function OwnerLoginForm() {
  // const initialState = { token: "" };
  const responseObj = {
    status: 0,
    response: {},
  };

  const owner = useRef<OwnerLogin>();

  // let owner: OwnerLogin;

  const initialState = {
    status: 0,
    response: { token: "null", ownerName: "null" },
  };

  // const initialState = { responseObj};
  const [state, formAction] = useActionState(OwnerLogin, initialState);

  const { login, setLogin, setLoggedIn } = useOwnerContext();

  // useEffect(() => {
  //   console.log(state.response);
  //   if (state.status === 200) {
  //     storeLogin(JSON.stringify(state.response));
  //     setLoggedIn(IsAuthenticated());
  //     setLogin(getLogin());
  //   }
  //   // setLogin(state.response);
  //   // owner.current = state.response;
  //   owner.current = state.response;
  //   console.log(login);
  // });
  useEffect(() => {
    console.log(state.response);
    // if (state.status === 200) {
    //   storeLogin(JSON.stringify(state.response));
    //   setLoggedIn(IsAuthenticated());
    //   setLogin(getLogin());
    // }
    // // setLogin(state.response);
    // // owner.current = state.response;
    // owner.current = state.response;
    // console.log(login);
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
      {/* <LoginButton
        token={owner.current?.token}
        ownerName={owner.current?.ownerName}
      /> */}
      <LoginButton status={state.status} response={state.response} />
    </form>
  );
}
