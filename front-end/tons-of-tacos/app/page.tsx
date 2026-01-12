"use client";
import classes from "./page.module.css";
import { useDisplayContext } from "@/context/display-context";
import { Suspense, useEffect } from "react";
import Splash from "./splash";
import FadeOnLoad from "@/components/ui/animations/fade-on-load";
import Loading from "./loading";
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
      <Suspense fallback={<Loading />}>
        <FadeOnLoad>
          {error ? (
            <Error message={errorMessage} />
          ) : (
            <main className={classes.page}>
              <Splash />
            </main>
          )}
        </FadeOnLoad>
      </Suspense>
    </>
  );
}
