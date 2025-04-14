import { useState } from "react";
import classes from "./order-item.module.css";

export default function OrderItem(orderItem: { orderItem: OrderItem }) {
  const [editItem, setEditItem] = useState<boolean>(false);

  // on server get all the order items by category and store the names
  // create dropdown of buttons that sets the order item
  // use quantity selector and size selector if available
  // ensure price is updated.
  // created updated item order to manipulate and submit on clicking update

  // const tacos: string[];
  // const sides: string[];
  // const toppings: string[];
  // const drinks: string[];

  const updatedOrderItem: OrderItem = orderItem;

  return (
    <li>
      <p>{`${orderItem.orderItem.itemName}`}</p>
      <p>{`${orderItem.orderItem.quantity}`}</p>
      <p>{`${orderItem.orderItem.size.toUpperCase()}`}</p>
      <p>{`$${orderItem.orderItem.total.toFixed(2)}`}</p>
      <button className={classes.button}>Edit</button>
      <button className={classes.button}>Remove</button>
    </li>
  );
}
