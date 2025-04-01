import classes from "./owner-dashboard.module.css";
import { getLogin } from "@/lib/ownerLogin/owners-login-client";
import { getAllOrders } from "@/lib/owners-tools/owners-tools";
import { useEffect, useRef, useState } from "react";
import Order from "./order";

export default function OwnerDashboard() {
  const ownerLogin: OwnerLogin = getLogin();
  const token: string | undefined = ownerLogin.token;

  const ordersRef = useRef<Order[] | undefined>();

  const [orders, setOrders] = useState<Order[]>();

  useEffect(() => {
    async function GetOrders() {
      ordersRef.current = await getAllOrders(token);
      setOrders(ordersRef.current);
    }
    GetOrders();
  }, [token]);
  // orders will be an array of type order, return as list
  // work on conversion of order object

  return (
    <div className={classes.dashboard}>
      <ul>
        {orders?.map(
          (order: {
            orderUid: string;
            name: string;
            email: string;
            phone: string;
            orderTotal: number;
            created: string;
            ready: string;
            closed: string;
          }) => (
            <Order
              orderUid={`${order.orderUid}`}
              key={`${order.orderUid}`}
              name={`${order.name}`}
              email={`${order.email}`}
              phone={`${order.phone}`}
              orderTotal={`${order.orderTotal}`}
              created={`${order.created}`}
              ready={`${order.ready}`}
              closed={`${order.closed}`}
            />
          )
        )}
      </ul>
    </div>
  );
}
