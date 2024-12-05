"use client";

import classes from "./page.module.css";
import MenuItemList from "@/components/menu/menu-items/menu-item-list";
import { notFound } from "next/navigation";
import { Suspense, useEffect, useRef, useState, use } from "react";
import FadeOnLoad from "@/components/ui/animations/fade-on-load";
import { useMenuContext } from "@/context/menu-context";
import Loading from "../loading";
import { MenuItems } from "@/lib/menu";
import { useMenuCategoryContext } from "@/context/menu-category-context";

export default function MenuItemsByCategory(props: {
  params: Promise<{ menuCategory: string }>;
}) {
  const params = use(props.params);
  const { setMenuItems } = useMenuContext();
  const { menuCategories } = useMenuCategoryContext();
  const menuItems = useRef<MenuItem[]>([]);
  const menuOptions: string[] = menuCategories.map(
    (category: { name: string }) => category.name
  );
  const category = params.menuCategory;

  console.log(category);

  if (!menuOptions.includes(category)) {
    notFound();
  }

  const [, setError] = useState();

  useEffect(() => {
    async function DisplayMenuItems() {
      try {
        menuItems.current = await MenuItems(category);
      } catch (error) {
        setError(() => {
          throw error;
        });
      }
      setMenuItems(menuItems.current);
    }
    DisplayMenuItems();
  }, [category, menuCategories, setMenuItems]);

  // set menu category description
  const description: string | undefined = menuCategories
    .find(function (mc) {
      return mc.name === `${category}`;
    })
    ?.description.toString();

  return (
    <main className={classes.main}>
      <Suspense fallback={<Loading />}>
        <FadeOnLoad>
          <div className={classes.category}>
            <h1>{category + ":"}</h1>
            <p className={classes.description}>{description}</p>
          </div>
          <div>{<MenuItemList menuItems={menuItems.current} />}</div>
        </FadeOnLoad>
      </Suspense>
    </main>
  );
}
