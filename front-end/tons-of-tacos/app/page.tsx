"use client";
import classes from "./page.module.css";
import { useDisplayContext } from "@/context/display-context";
import { Suspense, useEffect } from "react";
import Splash from "./splash";
import FadeOnLoad from "@/components/ui/animations/fade-on-load";
import Loading from "./loading";

export default function Home() {
  const { setShowLogin } = useDisplayContext();

  useEffect(() => {
    setShowLogin(false);
  });

  return (
    <Suspense fallback={<Loading />}>
      <FadeOnLoad>
        <main className={classes.page}>
          <Splash />
        </main>
      </FadeOnLoad>
    </Suspense>
  );
}
