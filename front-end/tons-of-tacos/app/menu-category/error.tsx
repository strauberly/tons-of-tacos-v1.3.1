"use client";

import classes from "@/app/page.module.css";
import FadeOnLoad from "@/components/ui/animations/fade-on-load";
import { Suspense } from "react";
import Loading from "../loading";

export default function Error({ error }: { error: Error }) {
  return (
    <Suspense fallback={<Loading />}>
      <FadeOnLoad>
        <div className={classes.error}>
          <h1>Whoops! {error.message}</h1>
          <p className={classes.errorContact}>
            Tons Of Tacos Dev Team: contact info
          </p>
        </div>
      </FadeOnLoad>
    </Suspense>
  );
}
