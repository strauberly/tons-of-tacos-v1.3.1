"use client";
import { useOwnerTokenContext } from "@/context/owner-context";
import classes from "./login-button.module.css";

import { useFormStatus } from "react-dom";

export default function LoginButton(token: { state: string }) {
  const status = useFormStatus();
  const { setOwnerToken } = useOwnerTokenContext();

  return (
    <button
      className={classes.login}
      type="submit"
      onClick={async () => {
        try {
          setOwnerToken(token.state);
        } catch (error) {
          throw new Error("whups..." + { error });
        }
      }}
    >
      {status.pending ? "Logging In..." : "Log In"}
    </button>
  );
}
