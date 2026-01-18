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

export default function OwnerDashboard() {
  const {
    viewOrder,
    showConfirmation,
    showCustomerOrders,
    showOwnerOrderCreator,
  } = useDisplayContext();

  const { confirmationTitle, orderToView } = useModalContext();

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
  const scrollToBeginning = () => {
    if (window.innerWidth < 1900) {
      document.getElementById("orders-list")?.scrollTo({
        left: 0,
        behavior: "instant",
      });
    } else {
      document.getElementById("orders-list")?.scrollTo({
        left: 0,
        behavior: "instant",
      });
    }
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
                    onClick={() => [setSortState("ready"), scrollToBeginning()]}
                  >
                    {" "}
                    Ready
                  </button>
                  <button
                    onClick={() => [
                      setSortState("closed"),
                      scrollToBeginning(),
                    ]}
                    className={classes.sortButtons}
                  >
                    {" "}
                    Closed
                  </button>
                  <button
                    onClick={() => [setSortState("open"), scrollToBeginning()]}
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
