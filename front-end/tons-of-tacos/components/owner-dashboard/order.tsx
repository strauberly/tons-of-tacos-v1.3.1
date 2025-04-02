import { useModalContext } from "@/context/modal-context";
import ViewOrderButton from "../ui/buttons/view-order/view-order-button";

export default function Order(order: { order: Order }) {
  const { setOrderToView } = useModalContext();

  const time: string = new Date(order.order.created).toLocaleTimeString([], {
    timeStyle: "short",
  });
  const date: string = new Date(order.order.created).toLocaleDateString();

  const total: number = +order.order.orderTotal;

  return (
    <li>
      <p>{`${order.order.orderUid}`}</p>
      <p>{`${order.order.name}`}</p>
      <p>{`${order.order.phone}`}</p>
      <p>{`${order.order.email}`}</p>
      <p>{`$${total.toFixed(2)}`}</p>
      <p>{`${time}`}</p>
      <p>{`${date}`}</p>
      <p>{`${order.order.ready}`}</p>
      <p>{`${order.order.closed}`}</p>
      <ViewOrderButton order={order.order} />
    </li>
  );
}
