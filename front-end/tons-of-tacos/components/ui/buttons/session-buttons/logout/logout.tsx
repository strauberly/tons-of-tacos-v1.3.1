"use client";

import { useDisplayContext } from "@/context/display-context";
import { useOwnerContext } from "@/context/owner-context";
import { IsAuthenticated } from "@/lib/ownerLogin/owners-login-client";
import classes from "./logout.module.css";
import {
  DeleteCookies,
  OwnerLogout,
} from "@/lib/ownerLogin/owner-login-server";

export default function LogoutButton() {
  const { setLoggedIn, login } = useOwnerContext();
  const { setShowLogin } = useDisplayContext();

  function LogOut() {
    setLoggedIn(IsAuthenticated());
    setShowLogin(true);
  }

  return (
    <button
      className={classes.logout}
      onClick={async () => [
        LogOut(),
        await OwnerLogout(login.accessToken),
        DeleteCookies(),
        setLoggedIn(false),
      ]}
    >
      Log Out
    </button>
  );
}
