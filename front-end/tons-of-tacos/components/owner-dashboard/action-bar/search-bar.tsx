// import classes from "../../../owner-dashboard/owner-dashboard.module.css";

import { useRef, useState } from "react";
import SearchByIdButton from "../../ui/buttons/search/search-by-id-button";
import SearchByPhoneButton from "../../ui/buttons/search/search-by-phone-button";
import { useOwnerContext } from "@/context/owner-context";
import { formatPhone } from "@/lib/general/multi-use";
import classes from "./search.module.css";

export default function SearchBar() {
  const [orderId, setOrderID] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [searchError, setSearchError] = useState<string>("");

  const orderIdRef = useRef<string>("");
  const phoneNumberRef = useRef<string>("");

  const { login } = useOwnerContext();

  const idValidRef = useRef<boolean>(false);
  const phoneValidRef = useRef<boolean>(false);

  function captureOrderID(e: React.ChangeEvent<HTMLInputElement>) {
    setOrderID(e.target.value.toUpperCase());
    orderIdRef.current = e.target.value;
    if (
      e.target.value.length !== 5 ||
      !e.target.value.toUpperCase().match(/(^[A-Z+0-9]+$)/g)
    ) {
      idValidRef.current = false;
    } else {
      idValidRef.current = true;
    }
    handleSearchError();
  }

  function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
    if (e.target.id === "phone") {
      idValidRef.current = true;
    } else {
      phoneValidRef.current = true;
    }
  }

  function handleSearchError() {
    if (phoneValidRef.current === false) {
      setSearchError("Valid phone number is ten digits.");
    } else if (idValidRef.current === false) {
      setSearchError(
        "Order ID must be 5 characters long and not contain any special characters ."
      );
    } else if (customerPhone === "" && orderId === "") {
      setSearchError("");
    }
  }

  //  search by customer phone number

  function captureCustomerPhone(e: React.ChangeEvent<HTMLInputElement>) {
    const formattedNumber = formatPhone(e.target.value);

    setCustomerPhone(formattedNumber as string);

    if (!e.target.value.match(/([0-9||.]+)/g) || e.target.value.length != 12) {
      phoneValidRef.current = false;
    } else {
      phoneValidRef.current = true;
    }
    handleSearchError();
    phoneNumberRef.current = formattedNumber;
  }

  return (
    <div className={classes.searchBar}>
      <div className={classes.search}>
        <label>Find by Order ID:</label>
        <input
          id="orderId"
          className={
            idValidRef.current === false ? classes.valid : classes.invalid
          }
          placeholder="Enter Order ID"
          type="text"
          maxLength={5}
          style={{ textTransform: "uppercase" }}
          onFocus={handleFocus}
          onChange={captureOrderID}
          value={orderIdRef.current}
        />
        <SearchByIdButton
          orderUid={orderId}
          token={login.accessToken}
          idValid={idValidRef.current}
        />
        <label>Find by Customer Phone :</label>
        <input
          id="phone"
          className={phoneValidRef.current ? classes.valid : classes.invalid}
          placeholder="ENTER CUSTOMER PHONE #"
          type="text"
          maxLength={12}
          onFocus={handleFocus}
          onChange={captureCustomerPhone}
          value={phoneNumberRef.current}
        />

        <SearchByPhoneButton
          customerName={customerPhone}
          token={login.accessToken}
          phoneValid={phoneValidRef.current}
        />
      </div>
      {idValidRef.current === false && (
        <p className={classes.searchError}>{searchError}</p>
      )}
      {phoneValidRef.current === false && (
        <p className={classes.searchError}>{searchError}</p>
      )}
    </div>
  );
}
