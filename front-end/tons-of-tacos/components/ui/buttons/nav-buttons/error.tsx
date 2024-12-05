"use client";

import classes from "@/app/page.module.css";

export default function Error({ error }: { error: Error }) {
  return (
    <div className={classes.error}>
      <h1>Whoops! {error.message}.</h1>
      <p>
        An error has occurred. Give us a shout and we&apos;ll get it worked out.
        Thanks!
      </p>
      <p className={classes.errorContact}>Tons Of Tacos Phone and Email</p>
    </div>
  );
}
