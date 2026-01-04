import classes from "@/components/ui/cards/card.module.css";
import { ReactNode } from "react";

export default function Card(props: { children: ReactNode; expand: boolean }) {
  return (
    <div
      className={`${classes.menuCard} ${
        props.expand === true ? classes.expand : " "
      }`}
    >
      <div className={classes.background}>{props.children}</div>
    </div>
  );
}
