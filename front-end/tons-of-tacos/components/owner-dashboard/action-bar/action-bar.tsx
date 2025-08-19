import SearchBar from "@/components/ui/buttons/search/search-bar";
import classes from "./action-bar.module.css";
import { useDisplayContext } from "@/context/display-context";
// includes search bars and create order
export default function ActionBar() {
  const { setShowOwnerOrderCreator } = useDisplayContext();

  return (
    <div className={classes.actionBar}>
      <SearchBar />
      <button
        className={classes.ownerCreate}
        onClick={() => setShowOwnerOrderCreator(true)}
      >
        Create Order
      </button>
    </div>
  );
}
