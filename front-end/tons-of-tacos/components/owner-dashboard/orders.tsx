import { useOrdersContext } from "@/context/orders-context";
import { useOwnerContext } from "@/context/owner-context";
import { GetAllOrders } from "@/lib/owners-tools/owners-tools";
import { useEffect } from "react";
import Order from "./order";
import classes from "./owner-dashboard.module.css";

export default function Orders(props: { sortState: string }) {
  const { orders, setOrders } = useOrdersContext();
  const { login } = useOwnerContext();

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

  useEffect(() => {
    async function GetOrders() {
      const orders: Order[] = await GetAllOrders(login.accessToken);
      setOrders(orders);
    }

    GetOrders();
    // setInterval(GetOrders, 5000);
  }, [login.accessToken, setOrders]);

  return (
    <div className={classes.dashboard}>
      <ul>
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
