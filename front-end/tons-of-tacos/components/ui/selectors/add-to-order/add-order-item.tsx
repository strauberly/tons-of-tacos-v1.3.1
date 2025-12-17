"use client";

import MenuItemSelector from "../menu-item-selector/menu-item-selector";
import { useEffect, useRef, useState } from "react";
import { useModalContext } from "@/context/modal-context";
import AddToOrderButton from "../../buttons/order-edit/add-to-order-button";
import { useOwnerContext } from "@/context/owner-context";
import QuantitySelector from "../quantity-selector/quantity-selector";
import SizeSelector from "../size-selector/size-selector";
import classes from "./add-order-item.module.css";

export default function AddOrderItem() {
  const { orderToView } = useModalContext();
  const { ownerOrder } = useOwnerContext();
  const [itemSelector, setItemSelector] = useState<boolean>(false);
  const [itemName, setItemName] = useState<string>("Item");
  const [quantity, setQuantity] = useState<number>(1);
  const [size, setSize] = useState<string>("NA");
  const [price, setPrice] = useState<number>(0);
  const [readyToAdd, setReadyToAdd] = useState<boolean>(false);
  // const sizeError: string =
  //   "Enter 'S' for small, 'M' for medium or 'L' for large.";
  const [showSizeError, setShowSizeError] = useState<boolean>(false);

  const [sizeError, setSizeError] = useState<string>("");
  const [sizeValid, setSizeValid] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [edited, setEdited] = useState<boolean>(false);
  const [canEdit, setCanEdit] = useState<boolean>(false);
  console.log(orderToView.name);

  const sizeRef = useRef<string>(size);

  const [item, setItem] = useState<MenuItem>({
    id: "",
    itemName: "",
    category: "",
    imageUrl: "",
    description: "",
    itemSize: "",
    unitPrice: 0,
  });

  const itemNameSetter = (name: string) => {
    setItemName(name);
  };

  const itemSetter = (item: MenuItem) => {
    setItem(item);
  };
  // call from lib
  function calcPrice() {
    let sizeSurcharge = 0;

    if (sizeRef.current === "M") {
      sizeSurcharge = 0.5;
    } else if (sizeRef.current === "L") {
      sizeSurcharge = 1.0;
    }

    const adjPrice = (sizeSurcharge + item?.unitPrice) * quantity;
    return adjPrice;
  }

  const decrement = () => {
    setQuantity(quantity - 1);
    if (quantity <= 1) {
      setQuantity(1);
    }
    setPrice(calcPrice());
  };

  const increment = () => {
    setQuantity(quantity + 1);
    setPrice(calcPrice());
  };

  function checkSize(event: React.ChangeEvent<HTMLInputElement>) {
    sizeRef.current = event.currentTarget.value.toUpperCase();
    setSize(event.target.value.toUpperCase());
    console.log("item size: " + item.itemSize);
    if (
      sizeRef.current !== "S" &&
      sizeRef.current !== "M" &&
      sizeRef.current !== "L"
    ) {
      setShowSizeError(true);
      setSizeValid(false);
    } else {
      setSizeValid(true);
      setShowSizeError(false);
      setSize(sizeRef.current);
    }
  }

  function sizeSwap() {
    if (size === "a") {
      setSize(" ");
    }
    return size;
  }

  function reset() {
    setQuantity(1);
    setItem({
      id: "",
      itemName: "",
      category: "",
      imageUrl: "",
      description: "",
      itemSize: "",
      unitPrice: 0,
    });
    setItemSelector(false);
    setSize("NA");
    setSubmitted(true);
    setShowSizeError(false);
    console.log("reset hit");
  }

  useEffect(() => {
    console.log(ownerOrder);
    function calcPrice() {
      let sizeSurcharge = 0;

      if (size === "M") {
        sizeSurcharge = 0.5;
      } else if (size === "L") {
        sizeSurcharge = 1.0;
      }
      const adjPrice = (sizeSurcharge + item?.unitPrice) * quantity;
      return adjPrice;
    }
    if (submitted) {
      setSubmitted(!submitted);
    }
    setPrice(calcPrice());
    setItemName(item.itemName);
  }, [
    item.itemName,
    item?.unitPrice,
    ownerOrder,
    price,
    quantity,
    size,
    submitted,
  ]);

  return (
    <>
      <div className={classes.addItemToOrder}>
        <div className={classes.titles}>
          <button
            disabled={
              (!ownerOrder && orderToView.closed !== "no") ||
              (!ownerOrder && orderToView.ready !== "no")
            }
            onClick={() => setItemSelector(!itemSelector)}
          >
            Select Item
          </button>
          <h3>Quantity</h3>
          <h3>Size </h3>
          <h3>Total</h3>
        </div>
        <div className={classes.values}>
          {/* <p>{item}</p> */}
          <p>{item?.itemName}</p>
          <QuantitySelector
            value={quantity}
            increment={increment}
            decrement={decrement}
            setEdited={setEdited}
            scale="scale(.75)"
          />
          {/* 
          <div className={classes.size}>
            {`${item.itemSize}` === "a" && (
              <input
                className={`${
                  sizeValid == false ? classes.invalid : classes.valid
                }`}
                name="size"
                id="size"
                type="text"
                maxLength={1}
                style={{ textTransform: "uppercase" }}
                onChange={checkSize}
              />
            )}
            {`${item.itemSize}` === "NA" && <p>{item.itemSize}</p>}
          </div> */}

          <SizeSelector
            itemSize={size}
            setShowSizeError={setShowSizeError}
            setNewSize={setSize}
            setSizeError={setSizeError}
            itemName={itemName}
            setEdited={setEdited}
            edited={edited}
            submitted={submitted}
            canEdit={canEdit}
            setCanEdit={setCanEdit}
            reset={reset}
          />

          <p className={classes.total}>${price.toFixed(2)}</p>
        </div>
      </div>
      <div className={classes.tail}>
        {showSizeError === true && (
          <p className={classes.sizeWarning}>{sizeError}</p>
        )}
        <div className={classes.addItemButton}>
          {readyToAdd && (
            <AddToOrderButton
              orderUid={orderToView.orderUid}
              menuItem={item}
              quantity={quantity}
              customerName={orderToView.name}
              size={size}
              price={price.toFixed(2)}
              setItemName={setItemName}
              setReadyToAdd={setReadyToAdd}
              reset={reset}
            />
          )}
        </div>

        {itemSelector && (
          <MenuItemSelector
            setItemName={itemNameSetter}
            setItem={itemSetter}
            itemName={itemName}
            setItemSelector={setItemSelector}
            setReadyToAdd={setReadyToAdd}
            setPrice={setPrice}
            setSize={setSize}
          />
        )}
      </div>
    </>
  );
}
