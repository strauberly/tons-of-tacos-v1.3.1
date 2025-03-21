import { useOwnerContext } from "@/context/owner-context";
import { useEffect, useState } from "react";
import classes from "./owner-header.module.css";

export default function OwnerHeader() {
  const { ownerName } = useOwnerContext();
  //   const time = new Date().toLocaleTimeString();
  //   const date = new Date().toDateString();

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  return (
    <div className={classes.ownerHeader}>
      <p> Hola, Jim!</p>
      <p>{date.toLocaleTimeString([], { timeStyle: "short" })}</p>
      <p>{date.toLocaleDateString()}</p>
      <button className={classes.logout}>Logout</button>
    </div>
  );
}
