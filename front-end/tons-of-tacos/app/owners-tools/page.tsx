"use client";

import { useDisplayContext } from "@/context/display-context";
import { useEffect } from "react";

export default function OwnersTools() {
  const { setShowLogin } = useDisplayContext();

  useEffect(() => {
    setShowLogin(true);
  });

  return (
    // <div></div>
    <div>
      <p>Owners Tools</p>
    </div>
  );
}
