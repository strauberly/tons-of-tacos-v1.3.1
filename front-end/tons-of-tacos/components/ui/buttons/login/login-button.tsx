"use client";
import { useOwnerContext } from "@/context/owner-context";
import classes from "./login-button.module.css";

import { useFormStatus } from "react-dom";
import { useEffect, useRef } from "react";
import {
  ChangeLoggedInStatus,
  getLogin,
  logout,
  storeLogin,
} from "@/lib/owners-tools";

export default function LoginButton() {
  const status = useFormStatus();
  const { login, setLogin, setLoggedIn } = useOwnerContext();

  useEffect(() => {
    setLogin(login);
  }, []);

  return (
    <button
      className={classes.login}
      type="submit"
      onClick={async () => {
        try {
          storeLogin(JSON.stringify(login));
          setLoggedIn(true);
          sessionStorage.setItem("isAuthenticated", "true");
        } catch (error) {
          throw new Error("whups..." + error);
        }
      }}
    >
      {status.pending ? "Logging In..." : "Log In"}
    </button>
  );
}
