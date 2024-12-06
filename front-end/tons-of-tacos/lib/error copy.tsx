"use client";

import classes from "@/app/page.module.css";

export default function Error({ error }: { error: Error }) {
  return (
    <html>
      <body>
        <div className={classes.error}>
          <h1>Whoops! {error.message}.</h1>
          <p>Give us a shout and we&apos;ll get it worked out. Thanks!</p>
          <p className={classes.errorContact}>Tons Of Tacos: contact info</p>
        </div>
      </body>
    </html>
  );
}
