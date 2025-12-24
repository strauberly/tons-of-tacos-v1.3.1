import ViewOrderButton from "@/components/ui/buttons/view-order/view-order-button";
import { useEffect, useState } from "react";
// import classes from "../owner-dashboard/owner-dashboard.module.css";
import classes from "./order-summary.module.css";

export default function OrderSummary(props: { order: Order }) {
  const [status, setStatus] = useState<string>("");

  const date: string = new Date(props.order.created).toLocaleDateString();

  useEffect(() => {
    if (props.order.closed === "no" && props.order.ready === "no") {
      setStatus("open");
    } else if (props.order.ready !== "no" && props.order.closed === "no") {
      setStatus("ready");
    } else {
      setStatus("closed");
    }
  }, [props.order.closed, props.order.ready]);

  return (
    <div className={classes.orderSummary}>
      <li
        className={`${
          (status === "closed" && classes.closed) ||
          (status === "ready" && classes.ready)
        }`}
      >
        <p>{props.order.name}</p>
        <p>{props.order.orderUid}</p>
        <p>{`${date}`}</p>
        <p className={classes.status}>{status}</p>
        <ViewOrderButton order={props.order} />
      </li>
    </div>
  );
}
