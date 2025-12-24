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

  const scrollToTop = () => {
    document.getElementById("orders-list")?.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

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
      <div>
        <ActionBar />
        <div className={classes.completeDash}>
          <div className={classes.ordersDash}>
            <ul className={classes.displayCategories}>
              {displayCategories.map((category) => (
                <p key={category}>{`${category.toString()}`}</p>
              ))}
            </ul>
            <div className={classes.buttonGroup}>
              <button
                className={classes.sortButtons}
                onClick={() => [setSortState("ready"), scrollToTop()]}
              >
                {" "}
                Ready
              </button>
              <button
                onClick={() => [setSortState("closed"), scrollToTop()]}
                className={classes.sortButtons}
              >
                {" "}
                Closed
              </button>
              <button
                onClick={() => [setSortState("open"), scrollToTop()]}
                className={classes.sortButtons}
              >
                Open
              </button>
            </div>
          </div>
          <Orders sortState={sortState} />
        </div>
        <div className={classes.sales}>
          <DailySalesDisplay />
          {/* <h1>Sales For Today: {sales?.numberOfSales}</h1>
          <h1>Total: ${sales?.total.toFixed(2)}</h1> */}
        </div>
      </div>
    </div>
  );
}
