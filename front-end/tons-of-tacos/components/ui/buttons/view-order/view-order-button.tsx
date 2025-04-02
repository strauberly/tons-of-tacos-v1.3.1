import { useDisplayContext } from "@/context/display-context";
import { useModalContext } from "@/context/modal-context";

export default function ViewOrderButton(order: { order: Order }) {
  const { setOrderToView } = useModalContext();
  const { setViewOrder } = useDisplayContext();

  return (
    <button onClick={() => [setOrderToView(order.order), setViewOrder(true)]}>
      View
    </button>
  );
}
