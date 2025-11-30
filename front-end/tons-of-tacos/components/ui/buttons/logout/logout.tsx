"use client";

import { useDisplayContext } from "@/context/display-context";
import { useOwnerContext } from "@/context/owner-context";
import { IsAuthenticated, logout } from "@/lib/ownerLogin/owners-login-client";
import classes from "./logout.module.css";
import {
  DeleteCookies,
  OwnerLogout,
  RemoveCookies,
} from "@/lib/ownerLogin/owner-login-server";
import { useModalContext } from "@/context/modal-context";

export default function LogoutButton() {
  const { setLoggedIn, login } = useOwnerContext();
  const { setShowLogin, setShowModal } = useDisplayContext();
  const { setModal } = useModalContext();

  function LogOut() {
    // logout();
    setLoggedIn(IsAuthenticated());
    setShowLogin(true);
  }

  return (
    <button
      className={classes.logout}
      onClick={async () => [
        LogOut(),
        setModal(await OwnerLogout(login.accessToken)),
        setShowModal(true),
        DeleteCookies(),
        setLoggedIn(false),
      ]}
    >
      Log Out
    </button>
  );
}
