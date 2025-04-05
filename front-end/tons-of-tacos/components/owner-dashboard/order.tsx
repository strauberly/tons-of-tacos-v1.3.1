import { useModalContext } from "@/context/modal-context";
import ViewOrderButton from "../ui/buttons/view-order/view-order-button";
import { useState } from "react";
import classes from "../owner-dashboard/owner-dashboard.module.css";

export default function Order(order: { order: Order }) {
  const { setOrderToView } = useModalContext();

  const time: string = new Date(order.order.created).toLocaleTimeString([], {
    timeStyle: "short",
  });
  const date: string = new Date(order.order.created).toLocaleDateString();

  const total: number = +order.order.orderTotal;

  const [editName, setEditName] = useState<boolean>(false);
  const [editPhone, setEditPhone] = useState<boolean>(false);
  const [editEmail, setEditEmail] = useState<boolean>(false);
  // const [editPhone, setEditPhone] = useState<boolean>(false);
  // const [editPhone, setEditPhone] = useState<boolean>(false);

  return (
    <li>
      <p>{`${order.order.orderUid}`}</p>
      <div>
        {!editName ? <p>{`${order.order.name}`}</p> : <input></input>}
        <button onClick={() => setEditName(!editName)}>Edit Name</button>
      </div>
      <div>
        {!editPhone ? <p>{`${order.order.phone}`}</p> : <input></input>}
        <button onClick={() => setEditPhone(!editPhone)}>Edit Phone</button>
      </div>
      <div>
        {!editEmail ? <p>{`${order.order.email}`}</p> : <input></input>}
        <button onClick={() => setEditEmail(!editEmail)}>Edit Email</button>
      </div>
      <p>{`$${total.toFixed(2)}`}</p>
      <p>{`${time}`}</p>
      <p>{`${date}`}</p>
      <div>
        <p>{`${order.order.ready}`}</p>
        <button>Mark Ready</button>
      </div>
      <div>
        <p>{`${order.order.closed}`}</p>
        <button>Close Order</button>
      </div>
      <div className={classes.viewUpdateDelete}>
        <ViewOrderButton order={order.order} />
        <button>Update</button>
        <button>Delete</button>
      </div>
    </li>
  );
}
