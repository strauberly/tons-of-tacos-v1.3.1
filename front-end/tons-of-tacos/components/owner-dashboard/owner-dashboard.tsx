import classes from "./owner-dashboard.module.css";
import { useDisplayContext } from "@/context/display-context";
import Orders from "./orders";
import { useModalContext } from "@/context/modal-context";
import OrderView from "../modal/order-view/order-view";
import OrderActionConfirmation from "../modal/order-action-confirmation";

export default function OwnerDashboard() {
  const { viewOrder, showConfirmation } = useDisplayContext();
  const { confirmationTitle, orderToView } = useModalContext();
  const displayCategories: string[] = [
    "Order Id",
    "Customer",
    "Phone",
    "E-mail",
    "Total",
    "Time",
    "Date",
    "Ready",
    "Closed",
  ];

  return (
    <div>
      {viewOrder && <OrderView />}
      {showConfirmation && (
        <OrderActionConfirmation
          title={confirmationTitle}
          order={orderToView}
        />
      )}
      <div>
        <ul className={classes.displayCategories}>
          {displayCategories.map((category) => (
            <p key={category}>{`${category.toString()}`}</p>
          ))}
        </ul>
        <Orders />
      </div>
    </div>
  );
}
