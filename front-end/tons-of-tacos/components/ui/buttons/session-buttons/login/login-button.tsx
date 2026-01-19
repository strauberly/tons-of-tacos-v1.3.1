"use client";

import classes from "./login-button.module.css";
import { useFormStatus } from "react-dom";

export default function LoginButton(props: {
  setIdValid: (idValid: boolean) => void;
  setPasswordValid: (passwordValid: boolean) => void;
}) {
  const status = useFormStatus();

  return (
    <button
      className={classes.login}
      type="submit"
      disabled={status.pending}
      onClick={() => [props.setIdValid(false), props.setPasswordValid(false)]}
    >
      {status.pending ? "Logging In..." : "Log In"}
    </button>
  );
}
