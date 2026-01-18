"use-client";

import classes from "./owner-dashboard.module.css";
import { useDisplayContext } from "@/context/display-context";
import Orders from "./orders/orders";
import { useModalContext } from "@/context/menu-context/modal-context";
import OrderView from "../modal/order-view/order-view";
import OrderActionConfirmation from "../modal/confirmations/order-action-confirmation";
import React, { Suspense, useState } from "react";
import OrdersByCustomerPhone from "../modal/search-results/orders-by-customer-phone";
import ActionBar from "./action-bar/action-bar";
import OwnerOrderCreator from "../modal/owner-order-creator/owner-order-creator";
import DailySalesDisplay from "./daily-sales/daily-sales";
import FadeOnLoad from "../ui/animations/fade-on-load";
import Loading from "@/app/loading";
// import { useOwnerContext } from "@/context/session-context/owner-context";

export default function OwnerDashboard() {
  const {
    viewOrder,
    showConfirmation,
    showCustomerOrders,
    showOwnerOrderCreator,
  } = useDisplayContext();

  const { confirmationTitle, orderToView } = useModalContext();
  // const { login } = useOwnerContext();

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
    <Suspense fallback={<Loading />}>
      <FadeOnLoad>
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
            </div>
          </div>
        </div>
      </FadeOnLoad>
    </Suspense>
  );
}
