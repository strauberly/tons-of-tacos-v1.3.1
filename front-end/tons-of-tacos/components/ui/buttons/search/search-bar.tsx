// import classes from "../../../owner-dashboard/owner-dashboard.module.css";

import { useRef, useState } from "react";
import SearchByIdButton from "../search/search-by-id-button";
import SearchByPhoneButton from "../search/search-by-phone-button";
import { useOwnerContext } from "@/context/owner-context";
import { formatPhone } from "@/lib/general/multi-use";
import classes from "../search/search.module.css";

export default function SearchBar() {
  const [orderId, setOrderID] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [searchError, setSearchError] = useState<string>("");
  const [numberValid, setNumberValid] = useState<boolean>(true);
  const [idValid, SetIdValid] = useState<boolean>(true);

  const orderIdRef = useRef<string>("");
  const phoneNumberRef = useRef<string>("");

  const { login } = useOwnerContext();

  function captureOrderID(e: React.ChangeEvent<HTMLInputElement>) {
    setOrderID(e.target.value.toUpperCase());
    orderIdRef.current = orderId;
    if (
      e.target.value.length !== 5 ||
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
      setSearchError("Valid phone number is ten digits.");
    } else if (!idValid) {
      setSearchError(
        "Order ID must be 5 characters long and not contain any special characters ."
      );
    } else {
      setSearchError("");
    }
  }

  //  search by customer phone number

  function captureCustomerPhone(e: React.ChangeEvent<HTMLInputElement>) {
    const formattedNumber = formatPhone(e.target.value);

    setCustomerPhone(formattedNumber as string);

    if (!e.target.value.match(/([0-9||.]+)/g) || e.target.value.length != 12) {
      setNumberValid(false);
    } else {
      setNumberValid(true);
    }
    handleSearchError();
    phoneNumberRef.current = formattedNumber;
  }

  // function formatNumber(input: string) {
  //   if (!input) return input;
  //   const numberInput: string = input.replace(/[^\d]/g, "");
  //   const inputLength: number = numberInput.length;

  //   if (inputLength < 4) {
  //     return numberInput;
  //   } else if (inputLength < 7) {
  //     return `${numberInput.slice(0, 3)}.${numberInput.slice(3)}`;
  //   } else {
  //     return `${numberInput.slice(0, 3)}.${numberInput.slice(
  //       3,
  //       6
  //     )}.${numberInput.slice(6)}`;
  //   }
  // }

  return (
    <div className={classes.searchBar}>
      <div className={classes.search}>
        <label>Find by Order ID:</label>
        <input
          id="orderId"
          className={idValid ? classes.valid : classes.invalid}
          placeholder="Enter Order ID"
          type="text"
          maxLength={5}
          style={{ textTransform: "uppercase" }}
          onFocus={handleFocus}
          onChange={captureOrderID}
        />
        <SearchByIdButton orderUid={orderId} token={login.token} />
        <label>Find by Customer Phone :</label>
        <input
          id="phone"
          className={numberValid ? classes.valid : classes.invalid}
          placeholder="ENTER CUSTOMER PHONE #"
          type="text"
          maxLength={12}
          onFocus={handleFocus}
          onChange={captureCustomerPhone}
          value={phoneNumberRef.current}
        />
        <SearchByPhoneButton customerName={customerPhone} token={login.token} />
      </div>
      {!numberValid && <p className={classes.searchError}>{searchError}</p>}
      {!idValid && <p className={classes.searchError}>{searchError}</p>}
    </div>
  );
}
