import { useEffect, useState } from "react";
import RemoveFromOrderButton from "../ui/buttons/order-edit/remove-from-order-button";
import ArrowIcon from "../menu/menu-items/quantity-selector/arrow-icon";
import UpdateOrderItemButton from "../ui/buttons/order-edit/update-order-item-button";
import SizeSelector from "./size-selector";
import classes from "./order-item.module.css";
import { calcPrice } from "@/lib/owners-tools/owners-tools-client";

export default function OrderItem(orderItem: { orderItem: OrderItem }) {
  const [canEdit, setCanEdit] = useState(false);
  const [newQuantity, setNewQuantity] = useState<number>(
    orderItem.orderItem.quantity
  );
  // const [newSize, setNewSize] = useState<string>("");
  const [newSize, setNewSize] = useState<string>(orderItem.orderItem.size);
  // console.log(newSize);
  const [showSizeError, setShowSizeError] = useState<boolean>(false);
  const sizeError: string =
    "Enter 'S' for small, 'M' for medium or 'L' for large.";
  const [newPrice, setNewPrice] = useState<number>(orderItem.orderItem.total);

  function checkQuantity(number: number) {
    console.log(number);
    if (number.toString() === "NaN") {
      setNewQuantity(number);
    } else if (number < 1) {
      setNewQuantity(1);
    } else if (number > 10) {
      setNewQuantity(10);
    } else {
      setNewQuantity(number);
    }
  }

  function sizeDisplay() {
    if (
      orderItem.orderItem.size.toUpperCase() !== "S" &&
      orderItem.orderItem.size.toUpperCase() !== "M" &&
      orderItem.orderItem.size.toUpperCase() !== "L"
    ) {
      return "";
    } else {
      return orderItem.orderItem.size.toUpperCase();
    }
  }

  function calcSurcharge(size: string) {
    let surcharge: number = 0.0;
    if (size === "M") {
      surcharge = 0.5;
    } else if (size === "L") {
      surcharge = 1.0;
    }
    return surcharge;
  }

  // const size: string = sizeDisplay();

  const decrement = () => {
    setNewQuantity(newQuantity - 1);
    if (newQuantity <= 1) {
      setNewQuantity(1);
    }
    // setNewPrice(
    //   calcPrice(
    //     orderItem.orderItem.total / orderItem.orderItem.quantity -
    //       calcSurcharge(orderItem.orderItem.size),
    //     newSize,
    //     newQuantity
    //   )
    // );
  };

  const increment = () => {
    setNewQuantity(newQuantity + 1);
    if (newQuantity >= 10) {
      setNewQuantity(10);
    }
  };

  useEffect(() => {
    setNewPrice(
      calcPrice(
        orderItem.orderItem.total / orderItem.orderItem.quantity -
          calcSurcharge(orderItem.orderItem.size),
        newSize,
        newQuantity
      )
    );
  }, [
    newQuantity,
    newSize,
    orderItem.orderItem.quantity,
    orderItem.orderItem.size,
    orderItem.orderItem.total,
  ]);

  return (
    <div>
      <li>
        <p>{`${orderItem.orderItem.itemName}`}</p>
        {canEdit && (
          <>
            <div className={classes.quantity}>
              <button
                className={`${classes.decrement}`}
                onClick={() => decrement()}
              >
                <ArrowIcon />
              </button>
              <input
                name="quantity"
                id="quantity"
                type="number"
                min="1"
                max={1}
                disabled={true}
                value={newQuantity}
                onChange={(e) => checkQuantity(parseInt(e.target.value))}
              />
              <button
                className={`${classes.increment}`}
                onClick={() => increment()}
              >
                <ArrowIcon />
              </button>
            </div>

            <div>
              {orderItem.orderItem.size !== " " && (
                <SizeSelector
                  itemSize={orderItem.orderItem.size}
                  setShowSizeError={setShowSizeError}
                  setNewSize={setNewSize}
                />
              )}
            </div>
          </>
        )}
        {!canEdit && <p>{`${orderItem.orderItem.quantity}`}</p>}
        {!canEdit && <p>{`${sizeDisplay()}`}</p>}
        {/* <p> {`$${orderItem.orderItem.total.toFixed(2)}`}</p> */}
        <p> {`$${newPrice.toFixed(2)}`}</p>
        {/* <p>{`$${newPrice.toFixed(2)}`}</p> */}
        {/* <p>{`$${calcPrice(
          orderItem.orderItem.total / orderItem.orderItem.quantity -
            calcSurcharge(orderItem.orderItem.size),
          newSize,
          newQuantity
        )}`}</p> */}
        {/* {canEdit == false ? (
          <p>{`$${orderItem.orderItem.total.toFixed(2)}`}</p>
        ) : (
          <p>{`$${adjTotal.toFixed(2)}`}</p>
          // <p>{`$${(
          //   (Number(orderItem.orderItem.total.toFixed(2)) /
          //     orderItem.orderItem.quantity) *
          //   Number(newQuantity)
          // ).toFixed(2)}`}</p>
        )} */}
        {!canEdit && (
          <button
            className={classes.button}
            onClick={() => setCanEdit(!canEdit)}
          >
            Edit
          </button>
        )}
        {!canEdit && <RemoveFromOrderButton orderItem={orderItem.orderItem} />}
      </li>
      {showSizeError === true && (
        <p className={classes.sizeWarning}>{sizeError}</p>
      )}
      {canEdit && (
        <div className={classes.update}>
          <UpdateOrderItemButton
            orderItem={orderItem.orderItem}
            newQuantity={newQuantity}
            newSize={newSize}
            setCanEdit={setCanEdit}
          />
          <button onClick={() => setCanEdit(!canEdit)}>Cancel</button>
        </div>
      )}
    </div>
  );
}
