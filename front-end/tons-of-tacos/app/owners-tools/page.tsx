"use client";

import OwnerDashboard from "@/components/owner-dashboard/owner-dashboard";
import { useDisplayContext } from "@/context/display-context";
import { useOwnerContext } from "@/context/session-context/owner-context";
import { Suspense, useEffect } from "react";

import Splash from "../splash";
import FadeOnLoad from "@/components/ui/animations/fade-on-load";
import Loading from "../loading";
import Error from "./error";
import { useErrorContext } from "@/context/error-context";

export default function OwnersTools() {
  const { setShowLogin } = useDisplayContext();
  const { loggedIn } = useOwnerContext();
  const { error, errorMessage } = useErrorContext();

  useEffect(() => {
    setShowLogin(true);
  });

  return (
    <Suspense fallback={<Loading />}>
      <FadeOnLoad>
        {error && <Error message={errorMessage} />}
        {loggedIn && !error ? (
          <OwnerDashboard />
        ) : (
          !loggedIn && !error && <Splash />
        )}
      </FadeOnLoad>
    </Suspense>
  );
}
