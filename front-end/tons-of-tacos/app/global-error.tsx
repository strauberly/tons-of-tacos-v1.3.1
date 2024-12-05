"use client";

import classes from "@/app/page.module.css";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.log("GlobalError mounted");
    return () => {
      console.log("GlobalError unmounted");
    };
  }, []);

  const resetHandler = () => {
    console.log("Attempting to recover from error");
    reset();
  };
  return (
    <html>
      <body>
        <div className={classes.error}>
          <h1>Whoops! {error.message}.</h1>
          <p>Give us a shout and we&apos;ll get it worked out. Thanks!</p>
          <button onClick={resetHandler}>hi</button>
          <p></p>
          <p className={classes.errorContact}>Tons Of Tacos: contact info</p>
        </div>
      </body>
    </html>
  );
}
