"use client";

import classes from "./login-button.module.css";
import { useFormStatus } from "react-dom";

export default function LoginButton() {
  const status = useFormStatus();

  return (
    <button className={classes.login} type="submit" disabled={status.pending}>
      {status.pending ? "Logging In..." : "Log In"}
    </button>
  );
}
