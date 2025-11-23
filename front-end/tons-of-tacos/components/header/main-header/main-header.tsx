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
    // const cookieStore = cookies();
    async function CheckLogin() {
      if ((await CookieCheck()) === true) {
        console.log("gotcha");
        setLoggedIn(false);
      } else {
        console.log("nope");
        setLogin(await GetLogin());
        setLoggedIn(true);
      }
      // setLoggedIn(IsAuthenticated());
      // setLogin(await GetLogin());
      // console.log(login);
      // if (cookieStore) {
      //   console.log("logged out");
      // } else {
      //   setLoggedIn(true);
      // }
      // const check = setInterval(() => CheckLogin(), 5000);
      // // setInterval(TokenExp, 1000 * 60 * 3);
      // return function cleanup() {
      //   clearInterval(check);
      // };
    }
    // CheckLogin();
    // const check = setInterval(() => CheckLogin(), 500);

    // // setInterval(TokenExp, 1000 * 60 * 3);
    // return function cleanup() {
    //   clearInterval(check);
    // };
  }, [loggedIn, login, setLoggedIn, setLogin]);

  return (
    <>
      <div className={classes.headerAlignment}>
        <header className={classes.header}>
          <Link className={classes.home} href="/">
            Tons Of Tacos
          </Link>
          <Suspense>
            <FadeOnLoad>
              {loggedIn && <OwnerHeader />}
              {showLogin && !loggedIn && <OwnerLoginForm />}
              {!showLogin && !loggedIn && <NavButtons />}
            </FadeOnLoad>
          </Suspense>
        </header>
      </div>
    </>
  );
}
