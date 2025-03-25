import { useOwnerContext } from "@/context/owner-context";
import { useEffect, useState } from "react";
import classes from "./owner-header.module.css";
import LogoutButton from "../../ui/buttons/logout/logout";

export default function OwnerHeader() {
  const { login } = useOwnerContext();

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  return (
    <div className={classes.ownerHeader}>
      <p> Hola, {login.ownerName}!</p>
      <p>{date.toLocaleTimeString([], { timeStyle: "short" })}</p>
      <p>{date.toLocaleDateString()}</p>
      <LogoutButton />
    </div>
  );
}
