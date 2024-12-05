"use client";
import { useEffect } from "react";
import MenuItem from "./menu-item";
import classes from "./menu-item-list.module.css";
import { useMenuContext } from "@/context/menu-context";


export default function MenuItemList() {

  const { menuItems } = useMenuContext();

  useEffect(() => {
    async function timeOut() {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    timeOut();
  });

  return (
    <ul className={classes.grid}>
      {menuItems.map(
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
