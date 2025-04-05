export default function OrderItem(orderItem: { orderItem: OrderItem }) {
  return (
    <li>
      <p>{`${orderItem.orderItem.itemName}`}</p>
      <p>{`${orderItem.orderItem.quantity}`}</p>
      <p>{`${orderItem.orderItem.size.toUpperCase()}`}</p>
      <p>{`$${orderItem.orderItem.total.toFixed(2)}`}</p>
      <button>Edit</button>
      <button>Remove</button>
    </li>
  );
}
