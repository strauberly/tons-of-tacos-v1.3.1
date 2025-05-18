import { useOrdersContext } from "@/context/orders-context";
import { useOwnerContext } from "@/context/owner-context";
import { GetAllOrders } from "@/lib/owners-tools/owners-tools";
import { useEffect } from "react";
import Order from "./order";
import classes from "./owner-dashboard.module.css";

export default function Orders() {
  const { orders, setOrders } = useOrdersContext();
  const { login } = useOwnerContext();

  useEffect(() => {
    async function GetOrders() {
      const orders: Order[] = await GetAllOrders(login.token);
      setOrders(orders);
    }
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
