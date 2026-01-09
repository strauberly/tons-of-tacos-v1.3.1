import classes from "./owner-order-creator.module.css";
import Card from "@/components/ui/cards/card";
import { useDisplayContext } from "@/context/display-context";
import CustomerInfoForm from "@/components/ui/forms/customer-info-form";
import AddOrderItem from "@/components/ui/selectors/add-to-order/add-order-item";
import CartItems from "@/components/cart/cart-item-list";
import { DeleteOwnerOrder } from "@/lib/owners-tools/owners-tools-client";
import { useEffect, useRef } from "react";
import { useOwnerContext } from "@/context/owner-context";
import { CalcOrderTotal } from "@/lib/multi-use/multi-use";
import { useCartContext } from "@/context/cart-context";
import { useOrdersContext } from "@/context/order-context/orders-context";

export default function OwnerOrderCreator() {
  const { setShowOwnerOrderCreator } = useDisplayContext();

  const { loggedIn } = useOwnerContext();
  const { setOrder, orderTotal, setOwnerOrder } = useOrdersContext();

  const { setCart } = useCartContext();

  const total = useRef<string>("");

  total.current = CalcOrderTotal(loggedIn);
  useEffect(() => {
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
              DeleteOwnerOrder(),
              setOwnerOrder(false),
              setCart([]),
            ]}
          >
            Close
          </button>
        </div>
      </Card>
    </div>
  );
}
