"use client";
import { useOwnerContext } from "@/context/owner-context";
import classes from "./login-button.module.css";
import { useFormStatus } from "react-dom";
import { useEffect, useRef } from "react";
import {
  getLogin,
  IsAuthenticated,
  storeLogin,
} from "@/lib/ownerLogin/owners-login-client";
import { useDisplayContext } from "@/context/display-context";
import { useModalContext } from "@/context/modal-context";
import { cookies } from "next/headers";
import { StoreLogin } from "@/lib/ownerLogin/owner-login-server";

export default function LoginButton(response: {
  status: number;
  response: object;
}) {
  const status = useFormStatus();
  const { setLogin, setLoggedIn, login } = useOwnerContext();
  const { setShowModal } = useDisplayContext();
  const { setModal } = useModalContext();

  // let receivedLogin: OwnerLogin;
  // try setting again here both use effect and and click button

  const loginRef = useRef<OwnerLogin>({
    accessToken: "",
    refreshToken: "",
    ownerName: "",
  });
  // useEffect(() => {
  //   // let receivedLogin: OwnerLogin;
  //   let statusCode = response.status;

  //   try {
  //     if (statusCode === 200) {
  //       console.log("response: " + JSON.stringify(response.response));
  //       loginRef.current = response.response as OwnerLogin;
  //       // storeLogin(JSON.stringify(response.response));
  //       // receivedLogin.accessToken = response.accessToken;
  //       setLoggedIn(true);
  //       // setLogin(response.response as OwnerLogin);
  //       setLogin(loginRef.current);
  //       StoreToken(loginRef.current);
  //       // setLogin(getLogin());
  //     } else if (statusCode === 403) {
  //       setModal(
  //         JSON.stringify(response.response) +
  //           " Please try again or give us a call."
  //       );
  //       setShowModal(true);
  //     }
  //     statusCode = response.status;
  //   } catch (error) {
  //     throw new Error(JSON.stringify(error));
  //   }
  // }, [
  //   login,
  //   response.response,
  //   response.status,
  //   setLoggedIn,
  //   setLogin,
  //   setModal,
  //   setShowModal,
  // ]);

  return (
    <button className={classes.login} type="submit" disabled={status.pending}>
      {status.pending ? "Logging In..." : "Log In"}
    </button>
  );
}
