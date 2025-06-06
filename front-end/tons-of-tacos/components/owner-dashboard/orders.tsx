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
  const sortedOpen: Order[] = [];
  const sortedReady: Order[] = [];
  const sortedClosed: Order[] = [];

  function checkReady(order: Order) {
    return order.ready !== "no" && order.closed === "no";
  }

  function checkOpen(order: Order) {
    return order.ready === "no" && order.closed === "no";
  }
  function checkClosed(order: Order) {
    return order.ready !== "no" && order.closed !== "no";
  }

  function sortOpen() {
    sortedOpen.concat(openOrders).concat(readyOrders).concat(closedOrders);
    setOrders(sortedOpen);
  }
  function sortReady() {
    sortedReady.concat(openOrders).concat(readyOrders).concat(closedOrders);
    setOrders(sortedReady);
  }
  function sortClosed() {
    sortedClosed.concat(openOrders).concat(readyOrders).concat(closedOrders);
    setOrders(sortedClosed);
  }

  useEffect(() => {
    async function GetOrders() {
      const orders: Order[] = await GetAllOrders(login.token);
      setOrders(orders);
    }
    setInterval(GetOrders, 5000);
    GetOrders();
  }, [login.token, setOrders]);

  return (
    <div className={classes.dashboard}>
      <ul>
        {orders.map(
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
          }) => (
            <Order key={`${order.orderUid}`} order={order} />
          )
        )}
      </ul>
    </div>
  );
}
