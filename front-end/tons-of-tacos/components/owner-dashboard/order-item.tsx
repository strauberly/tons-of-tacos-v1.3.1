import RemoveFromOrderButton from "../ui/buttons/order-edit/remove-from-order-button";
import classes from "./order-item.module.css";

export default function OrderItem(orderItem: { orderItem: OrderItem }) {
  return (
    <li>
      <p>{`${orderItem.orderItem.itemName}`}</p>
      <p>{`${orderItem.orderItem.quantity}`}</p>
      <p>{`${orderItem.orderItem.size.toUpperCase()}`}</p>
      <p>{`$${orderItem.orderItem.total.toFixed(2)}`}</p>
      <button className={classes.button}>Edit</button>
      <RemoveFromOrderButton orderItem={orderItem.orderItem} />
    </li>
  );
}
