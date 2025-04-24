"use client";

import MenuItemSelector from "./menu-item-selector";
import { useState } from "react";
import ArrowIcon from "../menu/menu-items/quantity-selector/arrow-icon";
import { useModalContext } from "@/context/modal-context";
import AddToOrderButton from "../ui/buttons/order-edit/add-to-order-button";
import classes from "./add-order-item.module.css";

export default function AddOrderItem() {
  const { orderToView } = useModalContext();
  const [itemSelector, setItemSelector] = useState(false);
  const [itemName, setItemName] = useState<string>("Item");
  const [quantity, setQuantity] = useState<number>(1);
  const [readyToAdd, setReadyToAdd] = useState<boolean>(false);

  console.log(orderToView.name);

  const [item, setItem] = useState<MenuItem>({
    id: "",
    itemName: "",
    category: "",
    imageUrl: "",
    description: "",
    itemSize: "",
    unitPrice: 0,
  });

  function checkQuantity(number: number) {
    console.log(number);
    if (number.toString() === "NaN") {
      setQuantity(number);
    } else if (number < 1) {
      setQuantity(1);
    } else if (number > 10) {
      setQuantity(10);
    } else {
      setQuantity(number);
    }
  }

  const itemNameSetter = (name: string) => {
    setItemName(name);
  };

  const itemSetter = (item: MenuItem) => {
    setItem(item);
  };
  const unitPrice = item.unitPrice;
  const total: number = quantity * unitPrice;

  const decrement = () => {
    setQuantity(quantity - 1);
    if (quantity <= 1) {
      setQuantity(1);
    }
  };

  const increment = () => {
    setQuantity(quantity + 1);
    if (quantity >= 10) {
      setQuantity(10);
    }
  };

  return (
    <>
      <div className={classes.addItemToOrder}>
        <ul>
          <button onClick={() => setItemSelector(!itemSelector)}>
            Select Item
          </button>
          <h3>Quantity</h3>
          <h3>Size </h3>
          <h3>Total</h3>
        </ul>
        <ul>
          <p>{item?.itemName}</p>
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
              value={quantity}
              onChange={(e) => checkQuantity(parseInt(e.target.value))}
            />
            <button
              className={`${classes.increment}`}
              onClick={() => increment()}
            >
              <ArrowIcon />
            </button>
          </div>
          {`${item.itemSize}` === "a" && (
            <input className={classes.size}></input>
          )}
          <p className={classes.total}>{`${total.toFixed(2)}`}</p>
        </ul>
        {readyToAdd && (
          <AddToOrderButton
            menuItem={item}
            quantity={quantity}
            customerName={orderToView.name}
            setItemName={setItemName}
            setReadyToAdd={setReadyToAdd}
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
        />
      )}
    </>
  );
}
