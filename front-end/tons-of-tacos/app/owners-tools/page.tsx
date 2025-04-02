"use client";

import OwnerDashboard from "@/components/owner-dashboard/owner-dashboard";
import { useDisplayContext } from "@/context/display-context";
import { useOwnerContext } from "@/context/owner-context";
import { useEffect } from "react";

import Splash from "../splash";

export default function OwnersTools() {
  const { setShowLogin } = useDisplayContext();
  const { loggedIn } = useOwnerContext();

  useEffect(() => {
    setShowLogin(true);
  });

  return <div>{loggedIn ? <OwnerDashboard /> : <Splash />}</div>;
}
