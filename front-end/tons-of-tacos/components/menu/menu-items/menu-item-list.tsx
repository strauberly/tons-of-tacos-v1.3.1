"use client";
import classes from "./menu-item-list.module.css";
import { useEffect, useRef, useState } from "react";
import { MenuItemsSource } from "@/lib/menu";
import { useMenuContext } from "@/context/menu-context";
import { notFound } from "next/navigation";
import { useMenuCategoryContext } from "@/context/menu-category-context";
import MenuItem from "./menu-item";

export default function MenuItemListCopy(category: { category: string }) {
  const { setMenuItems } = useMenuContext();
  const { menuCategories } = useMenuCategoryContext();
  const menuItems = useRef<MenuItem[]>([]);

  const menuOptions: string[] = menuCategories.map(
    (category: { name: string }) => category.name
  );

  if (!menuOptions.includes(category.category)) {
    notFound();
  }
  const [, setError] = useState();
  useEffect(() => {
    async function DisplayMenuItems() {
      try {
        menuItems.current = await MenuItemsSource(category.category);
      } catch (error) {
        setError(() => {
          throw error;
        });
      }
      setMenuItems(menuItems.current);
    }
    DisplayMenuItems();
  }, [category, menuCategories, setMenuItems]);

  const description: string | undefined = menuCategories
    .find(function (mc) {
      return mc.name === `${category.category}`;
    })
    ?.description.toString();

  return (
    <>
      <div className={classes.category}>
        <h1>{category.category + ":"}</h1>
        <p className={classes.description}>{description}</p>
      </div>
      <ul className={classes.grid}>
        {menuItems.current.map(
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
              id={`${menuItem.id}`}
              key={`${menuItem.itemName}_${menuItem.itemSize}`}
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
    </>
  );
}
