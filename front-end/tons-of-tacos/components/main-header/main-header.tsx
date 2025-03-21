"use client";
import classes from "./main-header.module.css";
import Link from "next/link";

import NavButtons from "@/components/ui/buttons/nav-buttons/nav-buttons";
import OwnerLoginForm from "../ui/forms/owner-login-form";
import { useDisplayContext } from "@/context/display-context";
import OwnerHeader from "../owner-header/owner-header";
import { useEffect, useRef, useState } from "react";
import { GetLoggedInStatus, IsAuthenticated } from "@/lib/owners-tools";
import { useOwnerContext } from "@/context/owner-context";

export default function MainHeader() {
  const { showLogin } = useDisplayContext();
  const { loggedIn, setLoggedIn } = useOwnerContext();

  useEffect(() => {
    setLoggedIn(IsAuthenticated());
  }, []);


  return (
    <>
      <div className={classes.headerAlignment}>
        <header className={classes.header}>
          <Link className={classes.home} href="/">
            Tons Of Tacos
          </Link>
          {loggedIn ? (
            <OwnerHeader />
          ) : showLogin ? (
            <OwnerLoginForm />
          ) : (
            <NavButtons />
          )}
        </header>
      </div>
    </>
  );
}
