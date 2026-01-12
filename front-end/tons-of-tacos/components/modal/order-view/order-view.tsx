import classes from "./order-view.module.css";
import { useModalContext } from "@/context/menu-context/modal-context";
import Card from "../../ui/cards/card";
import OrderItem from "../../owner-dashboard/orders/order-item";
import { useDisplayContext } from "@/context/display-context";
import EditableDetails from "./editable-details/editable-details";
import AddOrderItem from "../../ui/selectors/add-to-order/add-order-item";

export default function OrderView() {
  const { orderToView } = useModalContext();
  const { setViewOrder } = useDisplayContext();

  const time: string = new Date(orderToView.created).toLocaleTimeString([], {
    timeStyle: "short",
  });
  const date: string = new Date(orderToView.created).toLocaleDateString();
  const itemTitles: string[] = ["Item", "Quantity", "Size", "Item Total"];

  return (
    <div className={classes.orderView}>
      <div className={classes.heightControl}>
        <Card expand={true}>
          {orderToView.ready !== "no" && (
            <h3 className={classes.editWarning}>
              Order has been prepared and can not be edited!
            </h3>
          )}
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
          <AddOrderItem />
          <div className={classes.orderItemView}>
            <div>
              <ul className={classes.itemTitles}>
                {itemTitles.map((title) => (
                  <p key={title}>{`${title.toString()}`}</p>
                ))}
              </ul>
            </div>

            <div className={classes.orderItems}>
              <ul>
                {orderToView.orderItems?.map((orderItem) => (
                  <OrderItem
                    key={orderItem.orderItemId}
                    orderItem={orderItem}
                  />
                ))}
              </ul>
            </div>
          </div>
          {/* <AddOrderItem /> */}
          <button className={classes.close} onClick={() => setViewOrder(false)}>
            Close
          </button>
        </Card>
      </div>
    </div>
  );
}
