"use client";

// import classes from "@/app/page.module.css";
import { useEffect } from "react";

// try create styling in global error css and if not importing from folder outside of root layout

import classes from "./global-error.module.css";

// import classes from "./global-error.module.css";

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
      <body className={classes.body}>
        <div className={classes.error}>
          <h1 className={classes.h1}>Whoops! {error.message}.</h1>
          <p className={classes.instructions}>
            Give us a shout and we&apos;ll get it worked out. Thanks!
          </p>
          {/* <p>{Error.toString()}</p> */}
          <p className={classes.contact}>Tons Of Tacos: contact info</p>
          <button className={classes.button} onClick={resetHandler}>
            Retry
          </button>
        </div>
      </body>
    </html>
  );
}
