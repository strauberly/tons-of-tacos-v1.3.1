"use client";

// import classes from "@/app/page.module.css";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

// try create styling in global error css and if not importing from folder outside of root layout

import classes from "./global-error.module.css";

// import classes from "./global-error.module.css";

export default function GlobalError({
  error,
}: // reset,
{
  error: Error & { digest?: string };
  // reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    console.log("GlobalError mounted");
    return () => {
      console.log("GlobalError unmounted");
    };
  }, []);

  // const resetHandler = () => {
  //   console.log("Attempting to recover from error");
  // };
  return (
    <html>
      <body className={classes.body}>
        <div className={classes.error}>
          <h1 className={classes.h1}>Whoops! {error.message}.</h1>
          <p className={classes.instructions}>
            That&apos;s odd. Try a refresh, give it a go. If that doesn&apos;t
            work, give us a shout and we&apos;ll get it worked out. Thanks!
          </p>

          <p className={classes.contact}>
            Tons Of Tacos Dev Team: contact info
          </p>
          <button
            className={classes.button}
            onClick={() => (window.location.href = "/")}
          >
            Refresh
          </button>
        </div>
      </body>
    </html>
  );
}
