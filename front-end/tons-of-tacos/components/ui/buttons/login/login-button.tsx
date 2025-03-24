"use client";
import { useOwnerContext } from "@/context/owner-context";
import classes from "./login-button.module.css";

import { useFormStatus } from "react-dom";
import { useEffect } from "react";
import { getLogin, IsAuthenticated, storeLogin } from "@/lib/owners-tools";
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

  useEffect(() => {
    let statusCode = response.status;
    if (statusCode === 200) {
      storeLogin(JSON.stringify(response.response));
      setLoggedIn(IsAuthenticated());
      setLogin(getLogin());
    } else if (statusCode === 403) {
      setModal(JSON.stringify(response.response));
      setShowModal(true);
    }
    statusCode = response.status;
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
