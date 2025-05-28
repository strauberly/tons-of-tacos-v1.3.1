import classes from "./owner-dashboard.module.css";
import { useDisplayContext } from "@/context/display-context";
import Orders from "./orders";
import { useModalContext } from "@/context/modal-context";
import OrderView from "../modal/order-view/order-view";
import OrderActionConfirmation from "../modal/order-action-confirmation";
import { useEffect, useRef, useState } from "react";
import { useOwnerContext } from "@/context/owner-context";
import { DailySales } from "@/lib/owners-tools/owners-tools";

export default function OwnerDashboard() {
  const { viewOrder, showConfirmation } = useDisplayContext();
  const { confirmationTitle, orderToView } = useModalContext();
  const { login } = useOwnerContext();
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

  const [sales, setSales] = useState<Sales>();

  const salesVolume = useRef<number>(sales?.numberOfSales);
  const salesTotal = useRef<number>(Number(sales?.total.toFixed(2)));

  // timeout to updates sales every 5 min

  useEffect(() => {
    async function Sales() {
      setSales(await DailySales(login.token));
      salesVolume.current = sales?.numberOfSales;
      salesTotal.current = Number(sales?.total.toFixed(2));
    }
    Sales();
  }, [login.token, sales?.numberOfSales, sales?.total]);

  return (
    <div>
      {viewOrder && <OrderView />}
      {showConfirmation && (
        <OrderActionConfirmation
          title={confirmationTitle}
          order={orderToView}
        />
      )}
      <div>
        <ul className={classes.displayCategories}>
          {displayCategories.map((category) => (
            <p key={category}>{`${category.toString()}`}</p>
          ))}
        </ul>
        <Orders />
        <div className={classes.sales}>
          <h1>Sales For Today: {salesVolume.current}</h1>
          <h1>Total: ${salesTotal.current.toFixed(2)}</h1>
        </div>
      </div>
    </div>
  );
}
