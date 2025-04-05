import { useModalContext } from "@/context/modal-context";
import Card from "../ui/cards/card";
import classes from "./order-view.module.css";
import OrderItem from "../owner-dashboard/order-item";
import {
  DisplayContextProvider,
  useDisplayContext,
} from "@/context/display-context";
import { p } from "framer-motion/client";
export default function OrderView() {
  const { orderToView } = useModalContext();
  const { setViewOrder } = useDisplayContext();

  const time: string = new Date(orderToView.created).toLocaleTimeString([], {
    timeStyle: "short",
  });
  const date: string = new Date(orderToView.created).toLocaleDateString();

  const orderItemArr: OrderItem[] = orderToView.orderItems;

  const itemTitles: string[] = ["Item", "Quantity", "Size", "Item Total"];

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
        <div>
          <ul className={classes.itemTitles}>
            {itemTitles.map((title) => (
              <p key={title}>{`${title.toString()}`}</p>
            ))}
          </ul>
        </div>

        <div className={classes.orderItems}>
          <ul>
            {orderItemArr.map((orderItem) => (
              <OrderItem key={orderItem.orderItemId} orderItem={orderItem} />
            ))}
            <button
              className={classes.button}
              onClick={() => setViewOrder(false)}
            >
              Close
            </button>
          </ul>
        </div>
      </Card>
    </div>
  );
}
