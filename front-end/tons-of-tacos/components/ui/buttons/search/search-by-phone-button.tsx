import { useDisplayContext } from "@/context/display-context";
import SearchIcon from "./search-icon";
import classes from "./search.module.css";
import { useRef } from "react";
import { useModalContext } from "@/context/modal-context";
import { GetOrdersByCustomerPhone } from "@/lib/owners-tools/owners-tools";
import { useOrdersContext } from "@/context/orders-context";

export default function SearchByPhoneButton(props: {
  customerName: string;
  token: string;
}) {
  const { setShowCustomerOrders, setShowModal } = useDisplayContext();
  const { customerOrders, setCustomerOrders } = useOrdersContext();
  const { setModal } = useModalContext();

  const response = useRef<CustomerOrdersResponse>({
    status: 0,
    body: "",
  });

  function ordersFound() {
    console.log(response.current.status);
    console.log(response.current.body);
    if (response.current.status === 200) {
      setCustomerOrders(response.current.body as Order[]);
      console.log(customerOrders);
      setShowCustomerOrders(true);
    } else {
      setModal(response.current.body as string);
      setShowModal(true);
    }
  }

  return (
    <button
      className={classes.searchButton}
      onClick={async () => [
        (response.current = await GetOrdersByCustomerPhone(
          props.customerName,
          props.token
        )),
        ordersFound(),
      ]}
    >
      <SearchIcon />
    </button>
  );
}
