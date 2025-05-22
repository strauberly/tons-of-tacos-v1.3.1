import { useOrdersContext } from "@/context/orders-context";
import { GetAllOrders, MarkOrderClosed } from "@/lib/owners-tools/owners-tools";
import { useRef } from "react";

export default function MarkClosedButton(props: {
  orderUid: string;
  token: string | undefined;
}) {
  const orders = useRef<Order[] | undefined>();
  const { setOrders } = useOrdersContext();
  return (
    <button
      onClick={async () => [
        MarkOrderClosed(props.orderUid, props.token),
        (orders.current = await GetAllOrders(props.token)),
        setOrders(orders.current),
      ]}
    >
      Mark Closed
    </button>
  );
}
