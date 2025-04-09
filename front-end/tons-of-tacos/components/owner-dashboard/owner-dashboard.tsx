import classes from "./owner-dashboard.module.css";
import { getLogin } from "@/lib/ownerLogin/owners-login-client";
import { GetAllOrders } from "@/lib/owners-tools/owners-tools";
import { useEffect, useRef } from "react";
import Order from "./order";
import OrderView from "../modal/order-view";
import { useDisplayContext } from "@/context/display-context";
import OrderActionConfirmation from "../modal/order-action-confirmation";
import { useModalContext } from "@/context/modal-context";
import { useOrdersContext } from "@/context/orders-context";

export default function OwnerDashboard() {
  const { viewOrder, showConfirmation } = useDisplayContext();
  const { confirmationTitle, orderToView } = useModalContext();
  const { orders, setOrders } = useOrdersContext();
  const ownerLogin: OwnerLogin = getLogin();
  const token: string | undefined = ownerLogin.token;
  const ordersRef = useRef<Order[] | undefined>();

  useEffect(() => {
    async function GetOrders() {
      ordersRef.current = await GetAllOrders(token);
      setOrders(ordersRef.current);
    }

    GetOrders();
  }, [setOrders, token]);

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

  return (
    <>
      {showConfirmation && (
        <OrderActionConfirmation
          title={confirmationTitle}
          order={orderToView}
        />
      )}
      {viewOrder ? (
        <>
          <OrderView />

          <div>
            <ul className={classes.displayCategories}>
              {displayCategories.map((category) => (
                <p key={category}>{`${category.toString()}`}</p>
              ))}
            </ul>
          </div>
          <div className={classes.dashboard}>
            <ul>
              {orders?.map(
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
      ) : (
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
              {orders?.map(
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
      )}
    </>
  );
}
