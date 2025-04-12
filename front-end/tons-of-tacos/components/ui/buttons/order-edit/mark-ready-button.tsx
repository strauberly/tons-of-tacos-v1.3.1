import { useOrdersContext } from "@/context/orders-context";
import { GetAllOrders, MarkOrderReady } from "@/lib/owners-tools/owners-tools";
import { useRef } from "react";

export default function MarkReadyButton(props: {
  orderUid: string;
  token: string | undefined;
}) {
  const orders = useRef<Order[] | undefined>();
  const { setOrders } = useOrdersContext();
  return (
    <button
      onClick={async () => [
        MarkOrderReady(props.orderUid, props.token),
        (orders.current = await GetAllOrders(props.token)),
        setOrders(orders.current),
      ]}
    >
      Mark Ready
    </button>
  );
}
