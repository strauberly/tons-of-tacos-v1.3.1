import Card from "@/components/ui/cards/card";
import { useDisplayContext } from "@/context/display-context";
import CustomerInfoForm from "@/components/ui/forms/customer-info-form";
import AddOrderItem from "@/components/ui/selectors/add-to-order/add-order-item";
import CartItems from "@/components/cart/cart-item-list";
import {
  GetOwnerOrder,
  RemoveOwnerOrder,
} from "@/lib/owners-tools/owners-tools-client";
import { useEffect, useRef } from "react";
import { useOwnerContext } from "@/context/owner-context";
import { CalcOrderTotal } from "@/lib/general/multi-use";
import { useCartContext } from "@/context/cart-context";
import classes from "./owner-order-creator.module.css";
// import AddOrderItemCopy from "@/components/owner-dashboard/add-order-item-copy";

export default function OwnerOrderCreator() {
  const { setShowOwnerOrderCreator } = useDisplayContext();

  const { setOrder, orderTotal, loggedIn, setOwnerOrder } = useOwnerContext();

  const { setCart } = useCartContext();

  const total = useRef<string>("");

  total.current = CalcOrderTotal(loggedIn);
  useEffect(() => {
    // change to set a cart
    setCart(GetOwnerOrder());
    async function GetTotal() {
      total.current = orderTotal;
    }
    GetTotal();
  }, [orderTotal, setCart, setOrder]);

  return (
    <div className={classes.ownerOrderCreator}>
      <Card expand={true}>
        <div className={classes.elements}>
          <AddOrderItem />
          <div>
            <h3 className={classes.itemsHeader}>Order Items:</h3>
            <CartItems />
          </div>
          <h3 className={classes.total}>Total: ${total.current}</h3>
          <CustomerInfoForm />

          <button
            className={classes.close}
            onClick={() => [
              setShowOwnerOrderCreator(false),
              RemoveOwnerOrder(),
              setOwnerOrder(false),
              setCart([]),
              // reset flag for owner order
            ]}
          >
            Close
          </button>
        </div>
      </Card>
    </div>
  );
}
