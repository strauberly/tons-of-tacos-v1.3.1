// "use client";
import classes from "./page.module.css";
// import MenuItemList from "@/components/menu/menu-items/menu-item-list";
// import { notFound } from "next/navigation";
import { Suspense } from "react";
import FadeOnLoad from "@/components/ui/animations/fade-on-load";
// import { useMenuContext } from "@/context/menu-context";
import Loading from "../loading";
// import { MenuItemsSource } from "@/lib/menu";
// import { useMenuCategoryContext } from "@/context/menu-category-context";
import MenuItemListCopy from "@/components/menu/menu-items/menu-item-list-copy";
export default async function MenuItemsByCategory(props: {
  params: Promise<{ menuCategory: string }>;
}) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const params = props.params;
  // const { setMenuItems } = useMenuContext();
  // const { menuCategories } = useMenuCategoryContext();
  // const menuItems = useRef<MenuItem[]>([]);
  // const menuOptions: string[] = menuCategories.map(
  //   (category: { name: string }) => category.name
  // );
  const category = (await params).menuCategory;
  console.log(category);
  // if (!menuOptions.includes(category)) {
  //   notFound();
  // }
  // const [, setError] = useState();
  // useEffect(() => {
  //   async function DisplayMenuItems() {
  //     try {
  //       menuItems.current = await MenuItemsSource(category);
  //     } catch (error) {
  //       setError(() => {
  //         throw error;
  //       });
  //     }
  //     setMenuItems(menuItems.current);
  //   }
  //   DisplayMenuItems();
  // }, [category, menuCategories, setMenuItems]);
  // set menu category description
  // const description: string | undefined = menuCategories
  //   .find(function (mc) {
  //     return mc.name === `${category}`;
  //   })
  //   ?.description.toString();
  return (
    <main className={classes.main}>
      <Suspense fallback={<Loading />}>
        <FadeOnLoad>
          {/* <div className={classes.category}>
            <h1>{category + ":"}</h1>
            {/* <p className={classes.description}>{description}</p> */}
          {/* </div> */}
          <MenuItemListCopy category={category} />
          {/* <div>{<MenuItemList menuItems={menuItems.current} />}</div> */}
        </FadeOnLoad>
      </Suspense>
    </main>
  );
}
