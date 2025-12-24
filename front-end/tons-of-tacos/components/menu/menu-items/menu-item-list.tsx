// "use client";
import classes from "./menu-item-list.module.css";
import { Suspense, useEffect, useRef, useState } from "react";
import CategoriesSource, { MenuItemsSource } from "@/lib/menu";
import { useMenuContext } from "@/context/menu-context";
import { useMenuCategoryContext } from "@/context/menu-category-context";
import MenuItem from "./menu-item";
import { useParams } from "next/navigation";
import FadeOnLoad from "@/components/ui/animations/fade-on-load";

export default async function MenuItemList(props: {
  category: string;
  menuItems: MenuItem[];
}) {
  // async function hi() {
  await new Promise((resolve) => setTimeout(resolve, 2500));
  // }

  // hi();
  // const { setMenuItems } = useMenuContext();
  // const { menuCategories, setMenuCategories } = useMenuCategoryContext();
  // const menuItems: MenuItem[] = await MenuItemsSource(props.category);

  // const [description, setDescription] = useState(
  //   menuCategories
  //     .find(function (mc) {
  //       return mc.name === `${category.category}`;
  //     })
  //     ?.description.toString()
  // );

  // const [, setError] = useState();
  // useEffect(() => {
  //   async function DisplayMenuItems() {
  //     if (description === undefined) {
  //       setMenuCategories(await CategoriesSource());
  //       setDescription(
  //         menuCategories
  //           .find(function (mc) {
  //             return mc.name === `${category.category}`;
  //           })
  //           ?.description.toString()
  //       );
  //     }

  //     try {
  //       menuItems.current = await MenuItemsSource(category.category);
  //     } catch (error) {
  //       setError(() => {
  //         throw error;
  //       });
  //     }
  //     setMenuItems(menuItems.current);
  //   }
  //   DisplayMenuItems();
  // }, [category, description, menuCategories, setMenuCategories, setMenuItems]);

  {
    /* <div className={classes.category}>
    <h1>{category.category + ":"}</h1>
    <p className={classes.description}>{`${description}`}</p>
  </div> */
  }
  return (
    <>
      <ul className={classes.grid}>
        {props.menuItems.map(
          // {menuItems.current.map(
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
