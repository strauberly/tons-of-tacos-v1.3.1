import { useModalContext } from "@/context/modal-context";
import Card from "../ui/cards/card";
import classes from "./order-view.module.css";
export default function OrderView() {
  const { orderToView } = useModalContext();

  const time: string = new Date(orderToView.created).toLocaleTimeString([], {
    timeStyle: "short",
  });
  const date: string = new Date(orderToView.created).toLocaleDateString();

  return (
    <div className={classes.orderView}>
      <Card expand={true}>
        <div className={classes.orderDetails}>
          <p>Order Id: </p>
          <p>{`${orderToView.orderUid}`}</p>
          <p>Customer Name: </p>
          <p>{`${orderToView.name}`}</p>
          <p>Phone: </p>
          <p>{`${orderToView.phone}`}</p>
          <p>Email: </p>
          <p>{`${orderToView.email}`}</p>
          <p>Order Total: </p>
          <p>{`$${orderToView.orderTotal}`}</p>
          <p>Created: </p>
          <p>{`${time + " " + date}`}</p>
          <p>Ready: </p>
          <p>{`${orderToView.ready}`}</p>
          <p>Closed: </p>
          <p>{`${orderToView.closed}`}</p>
        </div>
      </Card>
    </div>
  );
}
