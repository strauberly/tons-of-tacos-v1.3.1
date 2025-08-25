import Card from "@/components/ui/cards/card";
import classes from "./owner-order-creator.module.css";
import { useDisplayContext } from "@/context/display-context";
import CustomerInfoForm from "@/components/ui/forms/customer-info-form";
import AddOrderItem from "@/components/owner-dashboard/add-order-item";
import CartItems from "@/components/cart/cart-item-list";
import { useCartContext } from "@/context/cart-context";
import {
  GetOwnerOrder,
  RemoveOwnerOrder,
} from "@/lib/owners-tools/owners-tools-client";
import { useEffect } from "react";

export default function OwnerOrderCreator() {
  const { setShowOwnerOrderCreator } = useDisplayContext();

  const { setCart } = useCartContext();

  useEffect(() => {
    setCart(GetOwnerOrder());
  }, [setCart]);

  return (
    <div className={classes.ownerOrderCreator}>
      <Card expand={true}>
        <div className={classes.elements}>
          <AddOrderItem />
          <div>
            <h3>Order Items:</h3>
            <CartItems />
          </div>
          <h3>Total:</h3>
          <CustomerInfoForm />

          <button
            className={classes.close}
            onClick={() => [
              setShowOwnerOrderCreator(false),
              RemoveOwnerOrder(),
            ]}
          >
            Close
          </button>
        </div>
      </Card>
    </div>
  );
}
