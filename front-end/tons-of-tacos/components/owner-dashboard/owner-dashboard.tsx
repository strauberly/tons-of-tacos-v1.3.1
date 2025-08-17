import classes from "./owner-dashboard.module.css";
import { useDisplayContext } from "@/context/display-context";
import Orders from "./orders";
import { useModalContext } from "@/context/modal-context";
import OrderView from "../modal/order-view/order-view";
import OrderActionConfirmation from "../modal/order-action-confirmation";
import React, { useEffect, useRef, useState } from "react";
import { useOwnerContext } from "@/context/owner-context";
import { DailySales } from "@/lib/owners-tools/owners-tools";
import SearchByIdButton from "../ui/buttons/search/search-by-id-button";
import SearchByPhoneButton from "../ui/buttons/search/search-by-phone-button";
import OrdersByCustomerPhone from "../modal/orders-by-customer-phone";

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
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [searchError, setSearchError] = useState<string>("");
  const [numberValid, setNumberValid] = useState<boolean>(true);
  const [idValid, SetIdValid] = useState<boolean>(true);

  const orderIdRef = useRef<string>("");
  const phoneNumberRef = useRef<string>("");

  function captureOrderID(e: React.ChangeEvent<HTMLInputElement>) {
    setOrderID(e.target.value.toUpperCase());
    orderIdRef.current = orderId;
    if (
      // orderIdRef.current.length !== 5 ||
      // !orderIdRef.current.match(/([A-Z+0-9])/g)

      e.target.value.length !== 6 ||
      !e.target.value.toUpperCase().match(/([A-Z+0-9])/g)
    ) {
      SetIdValid(false);
    } else {
      SetIdValid(true);
    }
    handleSearchError();
  }

  function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
    if (e.target.id === "phone") {
      SetIdValid(true);
    } else {
      setNumberValid(true);
    }
  }

  function handleSearchError() {
    if (!numberValid) {
      setSearchError("Valid phone number is ten digits only.");
    } else if (!idValid) {
      setSearchError(
        "Order ID must be 6 characters long and not contain any special characters ."
      );
    } else {
      setSearchError("");
    }
  }

  //  search by customer phone number

  function captureCustomerPhone(e: React.ChangeEvent<HTMLInputElement>) {
    const formattedNumber = formatNumber(e.target.value);

    setCustomerPhone(formattedNumber as string);

    if (!e.target.value.match(/([0-9||.]+)/g) || e.target.value.length != 12) {
      setNumberValid(false);
    } else {
      setNumberValid(true);
    }
    handleSearchError();
    phoneNumberRef.current = formattedNumber;
  }

  function formatNumber(input: string) {
    if (!input) return input;
    const numberInput: string = input.replace(/[^\d]/g, "");
    const inputLength: number = numberInput.length;

    if (inputLength < 4) {
      return numberInput;
    } else if (inputLength < 7) {
      return `${numberInput.slice(0, 3)}.${numberInput.slice(3)}`;
    } else {
      return `${numberInput.slice(0, 3)}.${numberInput.slice(
        3,
        6
      )}.${numberInput.slice(6)}`;
    }
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
      {showCustomerOrders && <OrdersByCustomerPhone />}
      {showConfirmation && (
        <OrderActionConfirmation
          title={confirmationTitle}
          order={orderToView}
        />
      )}
      <div className={classes.search}>
        <label>Find by Order ID:</label>
        <input
          id="orderId"
          className={idValid ? classes.valid : classes.invalid}
          placeholder="Enter Order ID"
          type="text"
          maxLength={6}
          style={{ textTransform: "uppercase" }}
          onFocus={handleFocus}
          onChange={captureOrderID}
        />
        <SearchByIdButton orderUid={orderId} token={login.token} />
        <label>Find by Customer Phone :</label>
        <input
          id="phone"
          className={numberValid ? classes.valid : classes.invalid}
          // className={classes.phone}
          placeholder="ENTER CUSTOMER PHONE #"
          type="text"
          maxLength={12}
          onFocus={handleFocus}
          onChange={captureCustomerPhone}
          // onChange={(e) => captureCustomerPhone(e)}
          value={phoneNumberRef.current}
          // value={customerPhone}
        />
        <SearchByPhoneButton customerName={customerPhone} token={login.token} />
      </div>
      {/* change all references to customer phone number */}
      {/* <p>{orderIdRef.current.length}</p> */}
      {!numberValid && <p className={classes.searchError}>{searchError}</p>}
      {!idValid && <p className={classes.searchError}>{searchError}</p>}

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
