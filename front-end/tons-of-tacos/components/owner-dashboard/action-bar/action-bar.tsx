import classes from "./action-bar.module.css";
import SearchBar from "./search-bar";
import { useDisplayContext } from "@/context/display-context";
import {
  CreateOwnerOrder,
  DeleteOwnerOrder,
} from "@/lib/owners-tools/owners-tools-client";
import { useOwnerContext } from "@/context/owner-context";

export default function ActionBar() {
  const { setShowOwnerOrderCreator } = useDisplayContext();
  const { setOwnerOrder } = useOwnerContext();

  return (
    <div className={classes.actionBar}>
      <SearchBar />
      <button
        className={classes.ownerCreate}
        onClick={() => [
          DeleteOwnerOrder(),
          CreateOwnerOrder(),
          setOwnerOrder(true),
          setShowOwnerOrderCreator(true),
        ]}
      >
        Create Order
      </button>
    </div>
  );
}
