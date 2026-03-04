import { useRef } from "react";

export default function CustomerEditConfirmationButton(props: {
  title: string;
}) {
  const action = useRef<string>("");
  return (
    <button
      onClick={async () => {
        action.current = await ExecuteConfirm(props.title, orderEdit);
        setShowConfirmation(false);
        setModal(action.current);
        setShowModal(true);
        setItemSize("NA");
        orders.current = await GetAllOrders(login.accessToken);
        setOrders(orders.current);
        orderReqResRef.current = await GetOrderByID(
          orderToView.orderUid,
          login.accessToken
        );

        if (orderReqResRef.current.status === 200) {
          setOrderToView(orderReqResRef.current.body as Order);
        }
        setOrderChanged(true);
      }}
    >
      yes
    </button>
  );
}
