import classes from "@/components/ui/cards/card.module.css";
import { ReactNode } from "react";

// just encapsulates the actual meal item details styled as a li
export default function Card(props: { children: ReactNode; expand: boolean }) {
  return (
    <div
      className={`${classes.menuCard} ${
        props.expand === true ? classes.expand : " "
      }`}
    >
      {props.children}
    </div>
  );
}
