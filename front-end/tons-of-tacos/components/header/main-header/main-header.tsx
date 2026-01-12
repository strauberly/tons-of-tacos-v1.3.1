"use client";
import classes from "./main-header.module.css";
import Link from "next/link";

import NavButtons from "@/components/ui/buttons/nav-buttons/nav-buttons";
import OwnerLoginForm from "../../ui/forms/owner-login-form";
import { useDisplayContext } from "@/context/display-context";
import OwnerHeader from "../owner-header/owner-header";
import { useEffect } from "react";

import { useOwnerContext } from "@/context/owner-context";

import {
  CookieCheck,
  DeleteCookies,
  GetLogin,
  nextCookiePresent,
} from "@/lib/owner-session/owner-session-server";

export default function MainHeader() {
  const { showLogin } = useDisplayContext();
  const { loggedIn, setLoggedIn, setLogin, login } = useOwnerContext();

  useEffect(() => {
    async function LoginCheck() {
      nextCookiePresent();
      if ((await CookieCheck()) === false && loggedIn === false) {
        setLogin(await GetLogin());
        // } else if ((await nextCookiePresent()) !== true) {
        //   DeleteCookies();
      }
      if (login.ownerName !== "") {
        setLoggedIn(true);
      }
    }

    LoginCheck();
  }, [loggedIn, login.ownerName, setLoggedIn, setLogin]);

  return (
    <>
      <div className={classes.headerAlignment}>
        <header className={classes.header}>
          <Link
            className={classes.home}
            onNavigate={() => [
              DeleteCookies,
              setLoggedIn(false),
              (window.location.href = "/"),
            ]}
            href="/"
          >
            Tons Of Tacos
          </Link>

          {loggedIn && <OwnerHeader />}
          {showLogin && !loggedIn && <OwnerLoginForm />}
          {!showLogin && !loggedIn && <NavButtons />}
        </header>
      </div>
    </>
  );
}
