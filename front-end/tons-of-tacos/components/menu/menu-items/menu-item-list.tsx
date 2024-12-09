// import { useId } from "react";
import { useMenuContext } from "@/context/menu-context";
import MenuItem from "./menu-item";
import classes from "./menu-item-list.module.css";
// import { useEffect, useRef } from "react";

//  try local storage like with cart so that it isn't affected by refresh
export default function MenuItemList() {
  const { menuItems } = useMenuContext();
  // export default async function MenuItemList(menuItems: {
  //   menuItems: MenuItem[];
  // }) {
  // try with context, ie context stored in a const and then shipped instead of through prop pass

  // const items = menuItems.menuItems;
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  const items = menuItems;

  // useEffect(() => {
  //   async function MenuItems() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  //     // items.current = menuItems;
  //   }
  //   MenuItems();
  // });

  return (
    <ul className={classes.grid}>
      {items.map(
        (menuItem: {
          id: string;
          itemName: string;
          category: string;
          imageUrl: string;
          itemSize: string;
          unitPrice: number;
          description: string;
        }) => (
          <MenuItem
            key={`${menuItem.itemName}_${menuItem.itemSize}`}
            id={`${menuItem.id}`}
            itemName={menuItem.itemName}
            category={menuItem.category}
            imageUrl={menuItem.imageUrl}
            itemSize={menuItem.itemSize}
            unitPrice={menuItem.unitPrice}
            description={menuItem.description}
          />
        )
      )}
    </ul>
  );
}
