import { useState } from "react";
import RemoveFromOrderButton from "../ui/buttons/order-edit/remove-from-order-button";
import classes from "./order-item.module.css";
import ArrowIcon from "../menu/menu-items/quantity-selector/arrow-icon";
import UpdateOrderItemButton from "../ui/buttons/order-edit/update-order-item-button";

export default function OrderItem(orderItem: { orderItem: OrderItem }) {
  const [canEdit, setCanEdit] = useState(false);
  const [newQuantity, setNewQuantity] = useState<number>(
    orderItem.orderItem.quantity
  );

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

  // const size: string = sizeDisplay();

  const decrement = () => {
    setNewQuantity(newQuantity - 1);
    if (newQuantity <= 1) {
      setNewQuantity(1);
    }
  };

  const increment = () => {
    setNewQuantity(newQuantity + 1);
    if (newQuantity >= 10) {
      setNewQuantity(10);
    }
  };

  return (
    <div>
      <li>
        <p>{`${orderItem.orderItem.itemName}`}</p>
        {canEdit && (
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
        )}
        {!canEdit && <p>{`${orderItem.orderItem.quantity}`}</p>}
        <p>{`${sizeDisplay()}`}</p>
        {canEdit == false ? (
          <p>{`$${orderItem.orderItem.total.toFixed(2)}`}</p>
        ) : (
          <p>{`$${(
            (Number(orderItem.orderItem.total.toFixed(2)) /
              orderItem.orderItem.quantity) *
            Number(newQuantity)
          ).toFixed(2)}`}</p>
        )}
        <button className={classes.button} onClick={() => setCanEdit(!canEdit)}>
          Edit
        </button>
        <RemoveFromOrderButton orderItem={orderItem.orderItem} />
      </li>
      {canEdit && (
        <div className={classes.update}>
          <UpdateOrderItemButton
            orderItem={orderItem.orderItem}
            newQuantity={newQuantity}
            setCanEdit={setCanEdit}
          />
          <button onClick={() => setCanEdit(!canEdit)}>Cancel</button>
        </div>
      )}
    </div>
  );
}
