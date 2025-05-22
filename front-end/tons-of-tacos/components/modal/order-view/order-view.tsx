import { useModalContext } from "@/context/modal-context";
import Card from "../../ui/cards/card";
import classes from "./order-view.module.css";
import OrderItem from "../../owner-dashboard/order-item";
import { useDisplayContext } from "@/context/display-context";
import AddOrderItem from "../../owner-dashboard/add-order-item";
import EditableDetails from "./editable-details";
import { useEffect, useRef } from "react";
import { GetOrder } from "@/lib/owners-tools/owners-tools";
import { useOwnerContext } from "@/context/owner-context";
import { SourceTextModule } from "vm";

export default function OrderView() {
  const { orderToView } = useModalContext();
  const { setViewOrder } = useDisplayContext();
  const { login } = useOwnerContext();

  console.log(orderToView);
  const time: string = new Date(orderToView.created).toLocaleTimeString([], {
    timeStyle: "short",
  });

  const date: string = new Date(orderToView.created).toLocaleDateString();

  // const time = useRef<string>("");
  // const date = useRef<string>("");

  const orderItemArr: OrderItem[] = orderToView.orderItems;

  const itemTitles: string[] = ["Item", "Quantity", "Size", "Item Total"];

  return (
    <div className={classes.orderView}>
      <Card expand={true}>
        <div>
          <div className={classes.orderDetails}>
            <div className={classes.uneditableDetails}>
              <p>Order Id:</p>
              <p>{orderToView.orderUid}</p>
              <p>Created:</p>
              <p>{`${time + " " + date}`}</p>
              <p>Total:</p>
              <p>${orderToView.orderTotal.toFixed(2)}</p>
            </div>
            <EditableDetails />
          </div>
          <div>
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
                  <OrderItem
                    key={orderItem.orderItemId}
                    orderItem={orderItem}
                  />
                ))}
              </ul>
            </div>
            <AddOrderItem />
          </div>
          <button
            className={classes.button}
            onClick={() => setViewOrder(false)}
          >
            Close
          </button>
        </div>
      </Card>
    </div>
  );
}
