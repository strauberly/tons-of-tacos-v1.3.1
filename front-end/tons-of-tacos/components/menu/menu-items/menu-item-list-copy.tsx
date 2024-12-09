"use client";
import { useEffect, useRef, useState } from "react";
import MenuItem from "./menu-item";
import classes from "./menu-item-list.module.css";
// import classes1 from "./page.module.css";
import { MenuItemsSource } from "@/lib/menu";
import { useMenuContext } from "@/context/menu-context";
import { notFound } from "next/navigation";
import { useMenuCategoryContext } from "@/context/menu-category-context";
// import Loading from "@/app/loading";
// import FadeOnLoad from "@/components/ui/animations/fade-on-load";
export default function MenuItemListCopy(category: { category: string }) {
  // const items = menuItems.menuItems;

  const { setMenuItems } = useMenuContext();

  const { menuCategories } = useMenuCategoryContext();

  // const description = useRef<string | undefined>("");

  console.log(menuCategories);

  const menuItems = useRef<MenuItem[]>([]);

  const menuOptions: string[] = menuCategories.map(
    (category: { name: string }) => category.name
  );

  if (!menuOptions.includes(category.category)) {
    notFound();
  }
  const [, setError] = useState();
  useEffect(() => {
    // description.current = menuCategories
    //   .find(function (mc) {
    //     return mc.name === `${category}`;
    //   })
    //   ?.description.toString();
    async function DisplayMenuItems() {
      // await new Promise((resolve) => setTimeout(resolve, 5000));
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
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  const description: string | undefined = menuCategories
    .find(function (mc) {
      return mc.name === `${category.category}`;
    })
    ?.description.toString();

  // const description: string | undefined = menuCategories
  //   .find(function (mc) {
  //     return mc.name === `${category.category}`;
  //   })
  //   ?.description.toString();

  console.log("description: " + description);
  const description1 = description;
  console.log("description: " + description1);
  return (
    // <Suspense fallback={<Loading />}>
    //   <FadeOnLoad>
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
    </>
    //   {/* </FadeOnLoad>
    // </Suspense> */}
  );
}
