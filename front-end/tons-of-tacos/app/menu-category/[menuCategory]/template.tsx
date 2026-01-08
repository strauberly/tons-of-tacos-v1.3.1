"use client";
import { useOwnerContext } from "@/context/order-context/owner-context";
import classes from "/components/menu/menu-items/menu-item-list.module.css";
import { Suspense, useEffect, useState } from "react";
import Loading from "../../loading";
import { useParams } from "next/navigation";
import { useMenuCategoryContext } from "@/context/menu-context/menu-category-context";
import FadeOnLoad from "@/components/ui/animations/fade-on-load";
import { MenuItemIdContextProvider } from "@/context/menu-context/menu-item-context";
import CategoriesSource from "@/lib/menu";
export default function Template({ children }: { children: React.ReactNode }) {
  const params = useParams<{ menuCategory: string }>();
  const { menuCategories, setMenuCategories } = useMenuCategoryContext();
  const [description, setDescription] = useState(
    menuCategories
      .find(function (mc) {
        return mc.name === `${params.menuCategory}`;
      })
      ?.description.toString()
  );
  // reset description
  useEffect(() => {
    async function DisplayMenuItems() {
      if (description === undefined) {
        setMenuCategories(await CategoriesSource());
        setDescription(
          menuCategories
            .find(function (mc) {
              return mc.name === `${params.menuCategory}`;
            })
            ?.description.toString()
        );
      }
    }

    DisplayMenuItems();
  }, [description, menuCategories, params.menuCategory, setMenuCategories]);

  return (
    <>
      <Suspense fallback={<Loading />}>
        <FadeOnLoad>
          <MenuItemIdContextProvider>
            <div className={classes.category}>
              <h1>{params.menuCategory + ":"}</h1>
              <p className={classes.description}>{`${description}`}</p>
            </div>
            {children}
          </MenuItemIdContextProvider>
        </FadeOnLoad>
      </Suspense>
    </>
  );
}
