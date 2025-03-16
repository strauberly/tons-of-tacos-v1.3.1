"use client";
import classes from "./main-header.module.css";
import Link from "next/link";

import NavButtons from "@/components/ui/buttons/nav-buttons/nav-buttons";
import OwnerLoginForm from "../ui/forms/owner-login-form";
import { useDisplayContext } from "@/context/display-context";
// import { useEffect, useRef } from "react";
// import CategoriesSource from "@/lib/menu";

export default function MainHeader() {
  // export default async function MainHeader() {
  // let categories;
  // const categories = await CategoriesSource();

  // const categories = useRef<Category[]>([]);

  const { showLogin } = useDisplayContext();

  //  move to nav buttons

  // useEffect(() => {
  //   async function getCategories() {
  //     categories.current = await CategoriesSource();
  //   }
  //   getCategories();
  // });

  return (
    <>
      <div className={classes.headerAlignment}>
        <header className={classes.header}>
          <Link className={classes.home} href="/">
            Tons Of Tacos
          </Link>
          {showLogin ? (
            <OwnerLoginForm />
          ) : (
            <NavButtons />
            // <NavButtons menuOptions={categories.current} />
          )}

          {/* <OwnerLoginForm /> */}
          {/* <NavButtons menuOptions={categories} /> */}
        </header>
      </div>
    </>
  );
}
