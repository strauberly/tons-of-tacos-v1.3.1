import classes from "../owner-dashboard/owner-dashboard.module.css";

export default function OrderItem(orderItem: { orderItem: OrderItem }) {
  return (
    <li>
      <p>{`${orderItem.orderItem.itemName}`}</p>
      <p>{`${orderItem.orderItem.quantity}`}</p>
      <p>{`${orderItem.orderItem.size}`}</p>
      <p>{`$${orderItem.orderItem.total.toFixed(2)}`}</p>
      <button>edit</button>
      <button>remove</button>
    </li>
  );
}
