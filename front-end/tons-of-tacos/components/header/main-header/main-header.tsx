"use client";
import classes from "./main-header.module.css";
import Link from "next/link";

import NavButtons from "@/components/ui/buttons/nav-buttons/nav-buttons";
import OwnerLoginForm from "../../ui/forms/owner-login-form";
import { useDisplayContext } from "@/context/display-context";
import OwnerHeader from "../owner-header/owner-header";
import { Suspense, useEffect, useRef, useState } from "react";
import {
  GetLoggedInStatus,
  getLogin,
  IsAuthenticated,
} from "@/lib/ownerLogin/owners-login-client";
import { useOwnerContext } from "@/context/owner-context";
import FadeOnLoad from "@/components/ui/animations/fade-on-load";

export default function MainHeader() {
  const { showLogin } = useDisplayContext();
  const { loggedIn, setLoggedIn, setLogin } = useOwnerContext();

  useEffect(() => {
    setLoggedIn(IsAuthenticated());
    setLogin(getLogin());
  }, [setLoggedIn, setLogin]);

  return (
    <>
      <div className={classes.headerAlignment}>
        <header className={classes.header}>
          <Link className={classes.home} href="/">
            Tons Of Tacos
          </Link>
          <Suspense>
            <FadeOnLoad>
              {loggedIn ? (
                <OwnerHeader />
              ) : showLogin ? (
                <OwnerLoginForm />
              ) : (
                <NavButtons />
              )}
            </FadeOnLoad>
          </Suspense>
        </header>
      </div>
    </>
  );
}
