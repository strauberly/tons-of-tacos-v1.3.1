import SearchBar from "./search-bar";
import { useDisplayContext } from "@/context/display-context";
import {
  CreateOwnerOrder,
  GetOwnerOrder,
} from "@/lib/owners-tools/owners-tools-client";
import { useOwnerContext } from "@/context/owner-context";
import { useCartContext } from "@/context/cart-context";
import classes from "./action-bar.module.css";

// includes search bars and create order
export default function ActionBar() {
  const { setShowOwnerOrderCreator } = useDisplayContext();
  const { setOwnerOrder } = useOwnerContext();
  const { setCart } = useCartContext();
  return (
    <div className={classes.actionBar}>
      <SearchBar />
      <button
        className={classes.ownerCreate}
        onClick={() => [
          CreateOwnerOrder(),
          setOwnerOrder(true),
          setCart(GetOwnerOrder()),
          setShowOwnerOrderCreator(true),
        ]}
      >
        Create Order
      </button>
    </div>
  );
}
