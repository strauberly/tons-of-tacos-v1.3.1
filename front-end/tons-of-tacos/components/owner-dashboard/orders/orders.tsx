"use client";
import classes from "../../owner-dashboard/owner-dashboard.module.css";
import { useOrdersContext } from "@/context/order-context/orders-context";
import { useOwnerContext } from "@/context/session-context/owner-context";
import { GetAllOrders } from "@/lib/owners-tools/owners-tools-server";
import { useEffect, useRef } from "react";
import Order from "./order";
import { useErrorContext } from "@/context/error-context";

export default function Orders(props: { sortState: string }) {
  const { orders, setOrders } = useOrdersContext();
  const { login } = useOwnerContext();
  const { setError, setErrorMessage } = useErrorContext();

  console.log(orders);
  console.log(orders.length);
  const ordersRef = useRef<Order[]>(orders);

  if ((ordersRef.current.length = 0 && !login)) {
    setErrorMessage(
      "Try logging out, Grab a cup of coffee and giving it another go. Give us a shout if that doesn't work and we'll get you going again."
    );
    setError(true);
  }
  const readyOrders: Order[] = orders.filter(checkReady);
  const openOrders: Order[] = orders.filter(checkOpen);
  const closedOrders: Order[] = orders.filter(checkClosed);

  const sortedOpen: Order[] = openOrders
    .concat(readyOrders)
    .concat(closedOrders);
  const sortedReady: Order[] = readyOrders
    .concat(openOrders)
    .concat(closedOrders);
  const sortedClosed: Order[] = closedOrders
    .concat(readyOrders)
    .concat(openOrders);

  function checkReady(order: Order) {
    return order.ready !== "no" && order.closed === "no";
  }

  function checkOpen(order: Order) {
    return order.ready === "no" && order.closed === "no";
  }
  function checkClosed(order: Order) {
    return order.ready !== "no" && order.closed !== "no";
  }

  /* Dependency array left empty intentionally. Tis is a fail safe for losing connection to server */
  useEffect(() => {
    async function GetOrders() {
      ordersRef.current = orders;
      if ((ordersRef.current = [])) {
        setOrders(await GetAllOrders(login.accessToken));
        setErrorMessage("");
        setError(false);
      } else {
        setErrorMessage(
          "Bummer, looks like our systems are down. Give us a shout for more info or try again later."
        );
        setError(true);
      }
    }
    GetOrders();
  }, []);

  return (
    <div className={classes.dashboard}>
      <ul id={"orders-list"}>
        {props.sortState === "open" &&
          sortedOpen.map(
            (order: {
              orderUid: string;
              customerUid: string;
              name: string;
              email: string;
              phone: string;
              orderTotal: number;
              orderItems: OrderItem[];
              created: string;
              ready: string;
              closed: string;
            }) => <Order key={`${order.orderUid}`} order={order} />
          )}
        {props.sortState === "ready" &&
          sortedReady.map(
            (order: {
              orderUid: string;
              customerUid: string;
              name: string;
              email: string;
              phone: string;
              orderTotal: number;
              orderItems: OrderItem[];
              created: string;
              ready: string;
              closed: string;
            }) => <Order key={`${order.orderUid}`} order={order} />
          )}
        {props.sortState === "closed" &&
          sortedClosed.map(
            (order: {
              orderUid: string;
              customerUid: string;
              name: string;
              email: string;
              phone: string;
              orderTotal: number;
              orderItems: OrderItem[];
              created: string;
              ready: string;
              closed: string;
            }) => <Order key={`${order.orderUid}`} order={order} />
          )}
      </ul>
    </div>
  );
}
