import classes from "./owner-dashboard.module.css";
import { useDisplayContext } from "@/context/display-context";
import Orders from "./orders";
import { useModalContext } from "@/context/modal-context";
import OrderView from "../modal/order-view/order-view";
import OrderActionConfirmation from "../modal/order-action-confirmation";
import React, { useEffect, useState } from "react";
import { useOwnerContext } from "@/context/owner-context";
import { DailySales } from "@/lib/owners-tools/owners-tools";

import OrdersByCustomerPhone from "../modal/orders-by-customer-phone";
import ActionBar from "./action-bar/action-bar";
import OwnerOrderCreator from "../modal/ownerOrderCreator/owner-order-creator";
import DailySalesDisplay from "./daily-sales/daily-sales";

export default function OwnerDashboard() {
  const {
    viewOrder,
    showConfirmation,
    showCustomerOrders,
    showOwnerOrderCreator,
  } = useDisplayContext();

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
  ];

  const [sortState, setSortState] = useState<string>("open");

  const [sales, setSales] = useState<Sales>();

  useEffect(() => {
    async function Sales() {
      setSales(await DailySales(login.token));
    }
    Sales();

    // setInterval(Sales, 3000);
  }, [login.token, sales?.numberOfSales, sales?.total]);

  return (
    <div>
      {showCustomerOrders && <OrdersByCustomerPhone />}
      {showOwnerOrderCreator && <OwnerOrderCreator />}
      {viewOrder && <OrderView />}
      {showConfirmation && (
        <OrderActionConfirmation
          title={confirmationTitle}
          order={orderToView}
        />
      )}
      <ActionBar />
      <div>
        <ul className={classes.displayCategories}>
          {displayCategories.map((category) => (
            <p key={category}>{`${category.toString()}`}</p>
          ))}

          <button
            className={classes.sortButtons}
            onClick={() => setSortState("ready")}
          >
            {" "}
            Ready
          </button>
          <button
            onClick={() => setSortState("closed")}
            className={classes.sortButtons}
          >
            {" "}
            Closed
          </button>
          <button
            onClick={() => setSortState("open")}
            className={classes.sortButtons}
          >
            Open
          </button>
        </ul>
        <Orders sortState={sortState} />
        <div className={classes.sales}>
          {/* <DailySalesDisplay /> */}
          {/* <h1>Sales For Today: {sales?.numberOfSales}</h1>
          <h1>Total: ${sales?.total.toFixed(2)}</h1> */}
        </div>
      </div>
    </div>
  );
}
