import { useDisplayContext } from "@/context/display-context";
import { useModalContext } from "@/context/modal-context";

export default function ViewOrderButton(order: { order: Order }) {
  const { setOrderToView } = useModalContext();
  const { setViewOrder, setShowCustomerOrders } = useDisplayContext();

  return (
    <button
      onClick={() => [
        setOrderToView(order.order),
        setViewOrder(true),
        setShowCustomerOrders(false),
      ]}
    >
      View
    </button>
  );
}
