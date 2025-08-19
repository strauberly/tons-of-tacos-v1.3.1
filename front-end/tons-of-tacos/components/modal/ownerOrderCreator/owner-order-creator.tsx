import Card from "@/components/ui/cards/card";
import classes from "./owner-order-creator.module.css";
import { useDisplayContext } from "@/context/display-context";
import CustomerInfoForm from "@/components/ui/forms/customer-info-form";
import AddOrderItem from "@/components/owner-dashboard/add-order-item";

export default function OwnerOrderCreator() {
  const { setShowOwnerOrderCreator } = useDisplayContext();

  return (
    <div className={classes.ownerOrderCreator}>
      <Card expand={true}>
        <div className={classes.elements}>
          <AddOrderItem />
          <div>
            <h3>Order Items:</h3>
          </div>
          <h3>Total:</h3>
          <CustomerInfoForm />

          <button
            className={classes.close}
            onClick={() => setShowOwnerOrderCreator(false)}
          >
            Close
          </button>
        </div>
      </Card>
    </div>
  );
}
