"use client";
import { useOwnerContext } from "@/context/owner-context";
import classes from "/components/menu/menu-items/menu-item-list.module.css";
import { Suspense, useEffect, useState } from "react";
import Loading from "../../loading";
import { useParams } from "next/navigation";
import { useMenuCategoryContext } from "@/context/menu-category-context";
import FadeOnLoad from "@/components/ui/animations/fade-on-load";
export default function Template({ children }: { children: React.ReactNode }) {
  const params = useParams<{ menuCategory: string }>();
  const { menuCategories } = useMenuCategoryContext();
  const [description] = useState(
    menuCategories
      .find(function (mc) {
        return mc.name === `${params.menuCategory}`;
      })
      ?.description.toString()
  );
  useEffect(() => {});
  return (
    <>
      <Suspense fallback={<Loading />}>
        <FadeOnLoad>
          <div className={classes.category}>
            <h1>{params.menuCategory + ":"}</h1>
            <p className={classes.description}>{`${description}`}</p>
          </div>{" "}
          {children}
        </FadeOnLoad>
      </Suspense>
    </>
  );
}
