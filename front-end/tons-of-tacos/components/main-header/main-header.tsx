"use client";
import classes from "./main-header.module.css";
import Link from "next/link";

import NavButtons from "@/components/ui/buttons/nav-buttons/nav-buttons";
import OwnerLoginForm from "../ui/forms/owner-login-form";
import { useDisplayContext } from "@/context/display-context";

export default function MainHeader() {
  const { showLogin } = useDisplayContext();

  return (
    <>
      <div className={classes.headerAlignment}>
        <header className={classes.header}>
          <Link className={classes.home} href="/">
            Tons Of Tacos
          </Link>
          {showLogin ? <OwnerLoginForm /> : <NavButtons />}
        </header>
      </div>
    </>
  );
}
