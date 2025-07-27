import classes from "./order-view.module.css";
import { useModalContext } from "@/context/modal-context";
import Card from "../../ui/cards/card";
import OrderItem from "../../owner-dashboard/order-item";
import { useDisplayContext } from "@/context/display-context";
import AddOrderItem from "../../owner-dashboard/add-order-item";
import EditableDetails from "./editable-details";
import { useEffect } from "react";

export default function OrderView() {
  const { orderToView } = useModalContext();
  const { setViewOrder } = useDisplayContext();

  console.log("order to view: " + orderToView);
  const time: string = new Date(orderToView.created).toLocaleTimeString([], {
    timeStyle: "short",
  });

  // order total should be a const 0 and then if order to View doesnt == undefined or a string the set the order total.
  const date: string = new Date(orderToView.created).toLocaleDateString();

  const orderItemArr: OrderItem[] = orderToView.orderItems;

  const itemTitles: string[] = ["Item", "Quantity", "Size", "Item Total"];
  // useEffect(() => {
  // if (orderToView.orderTotal == undefined) {
  //   orderToView.orderTotal = 0;
  // }
  console.log("order to view: " + orderToView);
  // });
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
          <button className={classes.close} onClick={() => setViewOrder(false)}>
            Close
          </button>
          {orderToView.ready !== "no" && (
            <h3 className={classes.editWarning}>
              Order has been prepared and can not be edited!
            </h3>
          )}
        </div>
      </Card>
    </div>
  );
}
