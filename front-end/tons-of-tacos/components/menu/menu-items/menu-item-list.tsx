"use client";
import classes from "./menu-item-list.module.css";
import { useEffect, useRef, useState } from "react";
import CategoriesSource, { MenuItemsSource } from "@/lib/menu";
import { useMenuContext } from "@/context/menu-context";
import { useMenuCategoryContext } from "@/context/menu-category-context";
import MenuItem from "./menu-item";

export default function MenuItemListCopy(category: { category: string }) {
  const { setMenuItems } = useMenuContext();
  const { menuCategories, setMenuCategories } = useMenuCategoryContext();
  const menuItems = useRef<MenuItem[]>([]);

  const [description, setDescription] = useState(
    menuCategories
      .find(function (mc) {
        return mc.name === `${category.category}`;
      })
      ?.description.toString()
  );

  const [, setError] = useState();
  useEffect(() => {
    async function DisplayMenuItems() {
      if (description === undefined) {
        setMenuCategories(await CategoriesSource());
        setDescription(
          menuCategories
            .find(function (mc) {
              return mc.name === `${category.category}`;
            })
            ?.description.toString()
        );
      }

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
  }, [category, description, menuCategories, setMenuCategories, setMenuItems]);
  return (
    <>
      <div className={classes.category}>
        <h1>{category.category + ":"}</h1>
        <p className={classes.description}>{`${description}`}</p>
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
