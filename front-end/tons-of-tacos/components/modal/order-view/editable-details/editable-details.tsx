import classes from "./editables.module.css";
import { useModalContext } from "@/context/menu-context/modal-context";
import CustomerNameDetails from "./customer-name-details";
import CustomerPhoneDetails from "./customer-phone-details";
import CustomerEmailDetails from "./customer-email-details";
import { useDisplayContext } from "@/context/display-context";
import { useEditOrderContext } from "@/context/order-context/edit-order-context";

export default function EditableDetails() {
  const { orderToView } = useModalContext();
  const { setShowConfirmation } = useDisplayContext();
  const { setConfirmationTitle } = useModalContext();
  const { setCustomer } = useEditOrderContext();

  return (
    <>
      <CustomerNameDetails />
      <CustomerPhoneDetails />
      <CustomerEmailDetails />
      <div className={classes.contactUpdate}>
        <button
          disabled={orderToView.ready !== "no" || orderToView.closed !== "no"}
          onClick={() => [
            setConfirmationTitle("Update Customer"),
            setShowConfirmation(true),
            setCustomer({
              customerUid: orderToView.customerUid,
              name: orderToView.name,
              phone: orderToView.phone,
              email: orderToView.email,
            }),
          ]}
        >
          Update
        </button>
      </div>
    </>
  );
}
