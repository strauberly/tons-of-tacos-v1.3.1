import ViewOrderButton from "../ui/buttons/view-order/view-order-button";
import classes from "../owner-dashboard/owner-dashboard.module.css";
import DeleteOrderButton from "../ui/buttons/order-edit/delete-order-button";
import MarkReadyButton from "../ui/buttons/order-edit/mark-ready-button";
import { useOwnerContext } from "@/context/owner-context";
import MarkClosedButton from "../ui/buttons/order-edit/mark-closed-button";

export default function Order(order: { order: Order }) {
  const { login } = useOwnerContext();

  const time: string = new Date(order.order.created).toLocaleTimeString([], {
    timeStyle: "short",
  });
  const date: string = new Date(order.order.created).toLocaleDateString();
  const total: number = +order.order.orderTotal;

  return (
    <li>
      <p>{`${order.order.orderUid}`}</p>
      <p>{`${order.order.name}`}</p>
      <p>{`${order.order.phone}`}</p>
      <p>{`${order.order.email}`}</p>
      <p>{`$${total.toFixed(2)}`}</p>
      <p>{`${time}`}</p>
      <p>{`${date}`}</p>
      <div>
        <p>{`${order.order.ready}`}</p>
        {order.order.ready === "no" && (
          <MarkReadyButton
            orderUid={order.order.orderUid}
            token={login.token}
          />
        )}
      </div>
      <div>
        <p>{`${order.order.closed}`}</p>
        {order.order.ready !== "no" && order.order.closed === "no" && (
          <MarkClosedButton
            orderUid={order.order.orderUid}
            token={login.token}
          />
        )}
      </div>
      <div className={classes.viewUpdateDelete}>
        <ViewOrderButton order={order.order} />
        {order.order.closed === "no" && (
          <DeleteOrderButton order={order.order} />
        )}
      </div>
    </li>
  );
}
