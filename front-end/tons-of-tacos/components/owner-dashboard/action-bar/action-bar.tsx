import SearchBar from "@/components/ui/buttons/search/search-bar";
import { useDisplayContext } from "@/context/display-context";
import { CreateOwnerOrder } from "@/lib/owners-tools/owners-tools-client";
import { useOwnerContext } from "@/context/owner-context";
import classes from "./action-bar.module.css";

// includes search bars and create order
export default function ActionBar() {
  const { setShowOwnerOrderCreator } = useDisplayContext();
  const { setOwnerOrder } = useOwnerContext();

  return (
    <div className={classes.actionBar}>
      <SearchBar />
      <button
        className={classes.ownerCreate}
        onClick={() => [
          CreateOwnerOrder(),
          setShowOwnerOrderCreator(true),
          setOwnerOrder(true),
        ]}
      >
        Create Order
      </button>
    </div>
  );
}
