"use client";
import { useOwnerContext } from "@/context/owner-context";
import classes from "./login-button.module.css";
import { useFormStatus } from "react-dom";
import { useEffect } from "react";
import {
  getLogin,
  IsAuthenticated,
  storeLogin,
} from "@/lib/ownerLogin/owners-login-client";
import { useDisplayContext } from "@/context/display-context";
import { useModalContext } from "@/context/modal-context";

export default function LoginButton(response: {
  status: number;
  response: object;
}) {
  const status = useFormStatus();
  const { setLogin, setLoggedIn } = useOwnerContext();
  const { setShowModal } = useDisplayContext();
  const { setModal } = useModalContext();

  // let receivedLogin: OwnerLogin;

  useEffect(() => {
    // let receivedLogin: OwnerLogin;
    let statusCode = response.status;
    try {
      if (statusCode === 200) {
        console.log("response: " + JSON.stringify(response.response));
        storeLogin(JSON.stringify(response.response));
        // receivedLogin.accessToken = response.accessToken;
        setLoggedIn(IsAuthenticated);
        // setLogin(response.response as OwnerLogin);
        setLogin(getLogin());
      } else if (statusCode === 403) {
        setModal(
          JSON.stringify(response.response) +
            " Please try again or give us a call."
        );
        setShowModal(true);
      }
      statusCode = response.status;
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }, [
    response.response,
    response.status,
    setLoggedIn,
    setLogin,
    setModal,
    setShowModal,
  ]);

  return (
    <button className={classes.login} type="submit" disabled={status.pending}>
      {status.pending ? "Logging In..." : "Log In"}
    </button>
  );
}
