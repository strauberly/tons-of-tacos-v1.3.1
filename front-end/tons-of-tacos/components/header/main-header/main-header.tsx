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

export default function MainHeader() {
  const { showLogin } = useDisplayContext();
  const { loggedIn, setLoggedIn, setLogin, login } = useOwnerContext();

  // useEffect(() => {
  //   setLoggedIn(IsAuthenticated());
  //   setLogin(getLogin());
  // }, [loggedIn, setLoggedIn, setLogin]);

  useEffect(() => {
    console.log(login);
    console.log(login.ownerName);
  });

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
