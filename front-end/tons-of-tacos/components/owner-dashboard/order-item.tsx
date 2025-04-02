export default function OrderItem(orderItem: { orderItem: OrderItem }) {
  const total: number = +orderItem.orderItem.total;
  return (
    <li>
      <p>{`${orderItem.orderItem.itemName}`}</p>
      <div>
        <p>{`${orderItem.orderItem.quantity}`}</p>
        <p>quantity selector placeholder</p>
      </div>
      <p>{`${orderItem.orderItem.size}`}</p>
      <p>{`$${orderItem.orderItem.total.toFixed(2)}`}</p>
    </li>
  );
}
