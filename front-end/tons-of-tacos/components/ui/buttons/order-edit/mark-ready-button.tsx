import { useOrdersContext } from "@/context/order-context/orders-context";
import {
  GetAllOrders,
  MarkOrderReady,
} from "@/lib/owners-tools/owners-tools-server";
import { useRef } from "react";

export default function MarkReadyButton(props: {
  orderUid: string;
  token: string;
}) {
  const orders = useRef<Order[]>([]);
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
