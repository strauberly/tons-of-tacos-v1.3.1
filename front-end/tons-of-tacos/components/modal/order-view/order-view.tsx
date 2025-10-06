import classes from "./order-view.module.css";
import { useModalContext } from "@/context/modal-context";
import Card from "../../ui/cards/card";
import OrderItem from "../../owner-dashboard/order-item";
import { useDisplayContext } from "@/context/display-context";
import AddOrderItem from "../../owner-dashboard/add-order-item";
import EditableDetails from "./editable-details";
import { useEffect, useRef } from "react";
import { GetOrderByID } from "@/lib/owners-tools/owners-tools";
import { useOwnerContext } from "@/context/owner-context";

export default function OrderView() {
  const { orderToView, setOrderToView } = useModalContext();
  const { setViewOrder } = useDisplayContext();
  const { login } = useOwnerContext();

  console.log("order to view: " + orderToView);
  const time: string = new Date(orderToView.created).toLocaleTimeString([], {
    timeStyle: "short",
  });

  // order total should be a const 0 and then if order to View doesnt == undefined or a string the set the order total.
  const date: string = new Date(orderToView.created).toLocaleDateString();
  // turn this into a ref and try assigning in use effect
  const orderItemArr: OrderItem[] = orderToView.orderItems;

  // let orderItemArr =(orderToView.orderItems);

  const itemTitles: string[] = ["Item", "Quantity", "Size", "Item Total"];
  // useEffect(() => {
  // if (orderToView.orderTotal == undefined) {
  //   orderToView.orderTotal = 0;
  // }
  console.log("order to view: " + orderToView);
  // });

  // useEffect(() => {
  //   async function OrderView() {
  //     setOrderToView(await GetOrderByID(orderToView.orderUid, login.token));
  //   }
  //   OrderView();
  // }, [
  //   login.token,
  //   orderToView.orderItems,
  //   orderToView.orderUid,
  //   setOrderToView,
  // ]);

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
          </div>
          <EditableDetails />
          <div className={classes.orderItemView}>
            {/* put titles and items in same div */}
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
          </div>
          <AddOrderItem />
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
