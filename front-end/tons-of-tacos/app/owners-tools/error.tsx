"use client";

import classes from "@/app/page.module.css";

export default function Error(error: { message: string }) {
  return (
    <div className={classes.error}>
      <h1>Whoops! {error.message}</h1>
      <p className={classes.errorContact}>
        Tons Of Tacos Dev Team: contact info
      </p>
    </div>
  );
}
