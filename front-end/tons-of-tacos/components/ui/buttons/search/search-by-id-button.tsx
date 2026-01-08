import { GetOrderByID } from "@/lib/owners-tools/owners-tools-server";
import SearchIcon from "./search-icon";
import { useRef } from "react";
import { useModalContext } from "@/context/modal-context";
import { useDisplayContext } from "@/context/display-context";

import classes from "./search.module.css";
export default function SearchByIdButton(props: {
  idValid: boolean;
  orderUid: string;
  token: string;
}) {
  const { setOrderToView, orderToView } = useModalContext();
  const { setViewOrder, setShowModal } = useDisplayContext();
  const { setModal } = useModalContext();

  const response = useRef<OrderRequestResponse>({
    status: 0,
    body: "",
  });

  function orderFound() {
    // console.log(response.current.);
    console.log(response.current.status);
    console.log(response.current.body);
    if (response.current.status === 200) {
      setOrderToView(response.current.body as Order);
      console.log(response.current.body);
      console.log(orderToView);
      setViewOrder(true);
    } else {
      setModal(response.current.body as string);
      setShowModal(true);
    }
  }
  return (
    <button
      disabled={!props.idValid}
      className={classes.searchButton}
      onClick={async () => [
        (response.current = await GetOrderByID(props.orderUid, props.token)),
        console.log(response.current),
        orderFound(),
      ]}
    >
      <SearchIcon />
    </button>
  );
}
