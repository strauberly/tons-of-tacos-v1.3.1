import { GetAllOrders } from "@/lib/owners-tools/owners-tools";
import classes from "./owner-dashboard.module.css";
import { useEffect, useRef } from "react";
import { useOwnerContext } from "@/context/owner-context";
import Order from "./order";
import { useOrdersContext } from "@/context/orders-context";

export default function OwnerDashboard() {
  const { login } = useOwnerContext();
  const { orders, setOrders } = useOrdersContext();
  const displayCategories: string[] = [
    "Order Id",
    "Customer",
    "Phone",
    "E-mail",
    "Total",
    "Time",
    "Date",
    "Ready",
    "Closed",
  ];

  // const returnedOrders = useRef<Order[]>([]);

  useEffect(() => {
    async function GetOrders() {
      setOrders(await GetAllOrders(login.token));
    }
    GetOrders();
  }, [login.token, setOrders]);

  return (
    <>
      <div>
        <ul className={classes.displayCategories}>
          {displayCategories.map((category) => (
            <p key={category}>{`${category.toString()}`}</p>
          ))}
        </ul>
      </div>
      <div className={classes.dashboard}>
        <ul>
          {orders.map(
            (order: {
              orderUid: string;
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
    </>
  );
}
