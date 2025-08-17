import { useOwnerContext } from "@/context/owner-context";
import { Suspense, useEffect, useState } from "react";
import classes from "./owner-header.module.css";
import LogoutButton from "../../ui/buttons/logout/logout";
import FadeOnLoad from "@/components/ui/animations/fade-on-load";

export default function OwnerHeader() {
  const { login } = useOwnerContext();

  const [date, setDate] = useState(new Date());
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);

    return function cleanup() {
      clearInterval(timer);
    };
  });

  return (
    <Suspense>
      <FadeOnLoad>
        <div className={classes.ownerHeader}>
          <p> Hola, {login.ownerName}!</p>
          <p>{date.toLocaleTimeString([], { timeStyle: "short" })}</p>
          <p>{date.toLocaleDateString(undefined, options)}</p>
          <LogoutButton />
        </div>
      </FadeOnLoad>
    </Suspense>
  );
}
