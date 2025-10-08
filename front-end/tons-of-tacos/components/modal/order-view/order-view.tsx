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
  // const orderRef = useRef<Order>({
  //   orderUid: "",
  //   customerUid: "",
  //   name: "",
  //   email: "",
  //   phone: "",
  //   orderItems: [],
  //   orderTotal: 0,
  //   created: "",
  //   ready: "",
  //   closed: "",
  // });

  // const orderRef = useRef<Order>(orderToView);

  console.log("order to view: " + orderToView);
  const time: string = new Date(orderToView.created).toLocaleTimeString([], {
    timeStyle: "short",
  });
  // const time: string = new Date(orderRef.current.created).toLocaleTimeString(
  //   [],
  //   {
  //     timeStyle: "short",
  //   }
  // );

  const date: string = new Date(orderToView.created).toLocaleDateString();
  // const date: string = new Date(orderRef.current.created).toLocaleDateString();

  const itemTitles: string[] = ["Item", "Quantity", "Size", "Item Total"];

  console.log("order to view: " + orderToView);

  const orderReqRes = useRef<OrderRequestResponse>({
    status: 0,
    body: "",
  });

  const orderItemArr = useRef<OrderItem[]>([]);

  // const ready = useRef<string>(orderRef.current.ready);

  // useEffect(() => {
  //   async function GetOrder() {
  //     // orderReqRes.current = await GetOrderByID(
  //     //   orderRef.current.orderUid,
  //     //   login.token
  //     // );

  //     setOrderToView(orderReqRes.current.body as Order);
  //     orderRef.current = orderToView;
  //   }
  //   GetOrder();
  //   // setOrderToView(orderRef.current);
  // }, [login.token, orderToView, setOrderToView]);

  // useEffect(() => {
  //   async function OrderUpdate() {
  //     orderReqRes.current = await GetOrderByID(
  //       orderToView.orderUid,
  //       login.token
  //     );

  //     orderRef.current = orderReqRes.current.body as Order;
  //     // orderItemArr.current = order;
  //     setOrderToView(orderRef.current);
  //   }
  //   OrderUpdate();
  // }, [login.token, orderToView.orderUid, setOrderToView]);

  return (
    <div className={classes.orderView}>
      <Card expand={true}>
        <div>
          <div className={classes.orderDetails}>
            <div className={classes.uneditableDetails}>
              <p>Order Id:</p>
              <p>{orderToView.orderUid}</p>
              {/* <p>{orderRef.current.orderUid}</p> */}
              <p>Created:</p>
              <p>{`${time + " " + date}`}</p>
              <p>Total:</p>
              {/* <p>${orderRef.current.orderTotal.toFixed(2)}</p> */}
              <p>${orderToView.orderTotal}</p>
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
                {/* {orderRef.current.orderItems?.map((orderItem) => ( */}
                {orderToView.orderItems?.map((orderItem) => (
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
          {/* <p>{`${orderToView.ready}`}</p> */}
          {orderToView.ready !== "no" && (
            // {orderRef.current.ready !== "no" && (
            <h3 className={classes.editWarning}>
              Order has been prepared and can not be edited!
            </h3>
          )}
        </div>
      </Card>
    </div>
  );
}
