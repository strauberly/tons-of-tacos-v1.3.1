"use client";
import classes from "./page.module.css";
import { useDisplayContext } from "@/context/display-context";
import { useEffect } from "react";
import Splash from "./splash";

import { useErrorContext } from "@/context/error-context";
import Error from "./error";

export default function Home() {
  const { setShowLogin } = useDisplayContext();
  const { error, errorMessage } = useErrorContext();

  useEffect(() => {
    setShowLogin(false);
  });

  return (
    <>
      {error ? (
        <Error message={errorMessage} />
      ) : (
        <main className={classes.page}>
          <Splash />
        </main>
      )}
    </>
  );
}
