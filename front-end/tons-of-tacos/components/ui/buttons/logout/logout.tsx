"use client";

import { useDisplayContext } from "@/context/display-context";
import { useOwnerContext } from "@/context/owner-context";
import { IsAuthenticated, logout } from "@/lib/owners-login-client";
import classes from "./logout.module.css";

export default function LogoutButton() {
  const { setLoggedIn } = useOwnerContext();
  const { setShowLogin } = useDisplayContext();

  function LogOut() {
    logout();
    setLoggedIn(IsAuthenticated());
    setShowLogin(true);
  }

  return (
    <button className={classes.logout} onClick={() => LogOut()}>
      Log Out
    </button>
  );
}
