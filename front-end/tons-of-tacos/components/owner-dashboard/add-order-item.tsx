import MenuItemSelector from "./menu-item-selector";
import classes from "./owner-dashboard.module.css";

export default function AddOrderItem() {
  return (
    <div className={classes.addItemToOrder}>
      <MenuItemSelector />
      <p> Quantity Selector</p>
      <p>Size Selector</p>
      <p>Item Total</p>
      <button>Add Item</button>
    </div>
  );
}
