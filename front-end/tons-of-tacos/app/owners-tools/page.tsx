"use client";

import OwnerDashboard from "@/components/owner-dashboard/owner-dashboard";
import { useDisplayContext } from "@/context/display-context";
import { useOwnerContext } from "@/context/owner-context";
import { Suspense, useEffect } from "react";

import Splash from "../splash";
import FadeOnLoad from "@/components/ui/animations/fade-on-load";
import Loading from "../loading";

export default function OwnersTools() {
  const { setShowLogin } = useDisplayContext();
  const { loggedIn } = useOwnerContext();

  useEffect(() => {
    setShowLogin(true);
  });

  return (
    <Suspense fallback={<Loading />}>
      <FadeOnLoad>{loggedIn ? <OwnerDashboard /> : <Splash />}</FadeOnLoad>
    </Suspense>
  );
}
