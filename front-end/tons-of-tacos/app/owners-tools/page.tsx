"use client";

import { useDisplayContext } from "@/context/display-context";
import { useOwnerContext } from "@/context/owner-context";
import { useEffect, useRef } from "react";

export default function OwnersTools() {
  const { setShowLogin } = useDisplayContext();
  const { ownerName } = useOwnerContext();

  console.log(ownerName);

  // const name = useRef<string>();

  useEffect(() => {
    setShowLogin(true);
    // name.current = ownerName;
  });

  return (
    <div>
      <p>Owners Tools</p>
      <p>{ownerName}</p>
    </div>
  );
}
