"use client";

import { useDisplayContext } from "@/context/display-context";
import { useOwnerContext } from "@/context/session-context/owner-context";

import classes from "./logout.module.css";
import {
  DeleteCookies,
  OwnerLogout,
} from "@/lib/owner-session/owner-session-server";

export default function LogoutButton() {
  const { setLoggedIn, login, setLogin } = useOwnerContext();
  const { setShowLogin } = useDisplayContext();

  function LogOut() {
    setLoggedIn(false);
    setShowLogin(true);
  }

  return (
    <button
      className={classes.logout}
      onClick={async () => [
        await OwnerLogout(login.accessToken),
        DeleteCookies(),
        setLogin({
          accessToken: "",
          refreshToken: "",
          ownerName: "",
        }),
        LogOut(),
      ]}
    >
      Log Out
    </button>
  );
}
