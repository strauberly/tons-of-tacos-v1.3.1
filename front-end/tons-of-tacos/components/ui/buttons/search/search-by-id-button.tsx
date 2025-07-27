import { GetOrderByID } from "@/lib/owners-tools/owners-tools";
import SearchIcon from "./search-icon";
import classes from "./search.module.css";
import { useRef } from "react";
import { useModalContext } from "@/context/modal-context";
import { useDisplayContext } from "@/context/display-context";

export default function SearchByIdButton(props: {
  orderUid: string;
  token: string;
}) {
  const { setOrderToView } = useModalContext();
  const { setViewOrder, setShowModal } = useDisplayContext();
  const { setModal } = useModalContext();

  const response = useRef<OrderRequestResponse>({
    status: 0,
    body: "",
  });

  function orderFound() {
    console.log(response.current.status);
    console.log(response.current.body);
    if (response.current.status === 200) {
      setOrderToView(response.current.body as Order);
      setViewOrder(true);
    } else {
      setModal(response.current.body as string);
      setShowModal(true);
    }
  }
  // try catch on click?
  return (
    <button
      className={classes.search}
      onClick={async () => [
        (response.current = await GetOrderByID(props.orderUid, props.token)),
        orderFound(),
      ]}
    >
      <SearchIcon />
    </button>
  );
}
