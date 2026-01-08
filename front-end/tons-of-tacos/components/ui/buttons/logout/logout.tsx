"use client";

import { useDisplayContext } from "@/context/display-context";
import { useOwnerContext } from "@/context/owner-context";

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
        LogOut(),
        await OwnerLogout(login.accessToken),
        DeleteCookies(),
        setLoggedIn(false),
        setLogin({
          accessToken: "",
          refreshToken: "",
          ownerName: "",
        }),
      ]}
    >
      Log Out
    </button>
  );
}
