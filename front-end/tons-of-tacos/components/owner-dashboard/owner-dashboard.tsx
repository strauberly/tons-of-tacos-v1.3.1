import classes from "./owner-dashboard.module.css";
import { useDisplayContext } from "@/context/display-context";
import Orders from "./orders";
import { useModalContext } from "@/context/modal-context";
import OrderView from "../modal/order-view/order-view";
import OrderActionConfirmation from "../modal/order-action-confirmation";
import React, { useEffect, useState } from "react";
import { useOwnerContext } from "@/context/owner-context";
import { DailySales } from "@/lib/owners-tools/owners-tools";
import SearchByIdButton from "../ui/buttons/search/search-by-id-button";
import SearchByPhoneButton from "../ui/buttons/search/search-by-phone-button";
import OrdersByCustomer from "../modal/orders-by-customer";

export default function OwnerDashboard() {
  const { viewOrder, showConfirmation, showCustomerOrders } =
    useDisplayContext();

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
  const [orderId, setOrderID] = useState<string>("");
  const [customerName, setCustomerName] = useState<string>("");

  function captureOrderID(e: React.ChangeEvent<HTMLInputElement>) {
    setOrderID(e.target.value.toUpperCase());
  }

  function captureCustomerName(e: React.ChangeEvent<HTMLInputElement>) {
    setCustomerName(e.target.value);
  }

  useEffect(() => {
    async function Sales() {
      setSales(await DailySales(login.token));
    }
    Sales();
    // setInterval(Sales, 5000);
  }, [login.token, sales?.numberOfSales, sales?.total]);

  return (
    <div>
      {viewOrder && <OrderView />}
      {showCustomerOrders && <OrdersByCustomer />}
      {showConfirmation && (
        <OrderActionConfirmation
          title={confirmationTitle}
          order={orderToView}
        />
      )}
      <div className={classes.search}>
        <label>Find by Order ID:</label>
        <input
          placeholder="Enter Order ID"
          type="text"
          maxLength={6}
          style={{ textTransform: "uppercase" }}
          onChange={captureOrderID}
        />
        <SearchByIdButton orderUid={orderId} token={login.token} />
        <label>Find by Customer Phone :</label>
        <input
          placeholder="ENTER CUSTOMER PHONE #"
          type="text"
          maxLength={24}
          onChange={captureCustomerName}
        />
        <SearchByPhoneButton customerName={customerName} token={login.token} />
      </div>
      {/* <p>order id: {orderId}</p> */}
      <p>{customerName}</p>

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
          <h1>Sales For Today: {sales?.numberOfSales}</h1>
          <h1>Total: ${sales?.total.toFixed(2)}</h1>
        </div>
      </div>
    </div>
  );
}
