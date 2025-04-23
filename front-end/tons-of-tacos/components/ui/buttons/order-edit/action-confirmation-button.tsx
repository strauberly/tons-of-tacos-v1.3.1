import { useDisplayContext } from "@/context/display-context";
import { useEditOrderContext } from "@/context/edit-order-context";
import { useModalContext } from "@/context/modal-context";
import { useOrdersContext } from "@/context/orders-context";
import { useOwnerContext } from "@/context/owner-context";
import { AddToOrder, GetAllOrders } from "@/lib/owners-tools/owners-tools";
import { useRef } from "react";

export default function ActionConfirmationButton(props: { title: string }) {
  const { setShowConfirmation, setShowModal } = useDisplayContext();
  const { setOrders } = useOrdersContext();
  const { login } = useOwnerContext();
  const { menuItem, quantity, menuItemSize } = useEditOrderContext();
  const { orderToView, setModal } = useModalContext();

  const orders = useRef<Order[]>([]);
  const action = useRef<string>("");
  return (
    <button
      onClick={async () => [
        props.title === "Add To Order"
          ? (action.current = await AddToOrder(
              orderToView.orderUid,
              Number(menuItem.id),
              quantity,
              menuItemSize,
              login.token
            ))
          : "",
        setShowConfirmation(false),
        setModal(action.current),
        setShowModal(true),
        (orders.current = await GetAllOrders(login.token)),
        setOrders(orders.current),
      ]}
    >
      yes
    </button>
  );
}
