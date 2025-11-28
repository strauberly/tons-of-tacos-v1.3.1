"use client";
import classes from "./main-header.module.css";
import Link from "next/link";

import NavButtons from "@/components/ui/buttons/nav-buttons/nav-buttons";
import OwnerLoginForm from "../../ui/forms/owner-login-form";
import { useDisplayContext } from "@/context/display-context";
import OwnerHeader from "../owner-header/owner-header";
import { Suspense, useEffect } from "react";
import {
  getLogin,
  IsAuthenticated,
} from "@/lib/ownerLogin/owners-login-client";
import { useOwnerContext } from "@/context/owner-context";
import FadeOnLoad from "@/components/ui/animations/fade-on-load";
import { CookieCheck, GetLogin } from "@/lib/ownerLogin/owner-login-server";
import { cookies } from "next/headers";

export default function MainHeader() {
  const { showLogin } = useDisplayContext();
  const { loggedIn, setLoggedIn, setLogin, login } = useOwnerContext();

  useEffect(() => {
    async function LoginCheck() {
      // setLoggedIn(await GetLogin())
      console.log("check cook: " + (await CookieCheck()));
      console.log("logged in: " + loggedIn);
      console.log("login: " + login.ownerName);
      if ((await CookieCheck()) === false && loggedIn === false) {
        setLogin(await GetLogin());
        setLoggedIn(true);
      }
    }

    LoginCheck();
  }, [loggedIn, login.ownerName, setLoggedIn, setLogin]);

  return (
    <>
      <div className={classes.headerAlignment}>
        <header className={classes.header}>
          <Link className={classes.home} href="/">
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
