import { Suspense } from "react";
import FadeOnLoad from "@/components/ui/animations/fade-on-load";
import Loading from "../../loading";
import MenuItemList from "@/components/menu/menu-items/menu-item-list";
// import Template from "@/app/menu-category/[menuCategory]/template";
import { MenuItemsSource } from "@/lib/menu";

export default async function MenuItemsByCategory(props: {
  params: Promise<{ menuCategory: string }>;
}) {
  // await new Promise((resolve) => setTimeout(resolve, 2500));
  const params = props.params;
  const category = (await params).menuCategory;
  const menuItems = await MenuItemsSource((await props.params).menuCategory);

  return (
    <>
      <main>
        {/* <Suspense fallback={<Loading />}>
          <FadeOnLoad> */}
        <MenuItemList category={category} menuItems={menuItems} />
        {/* </FadeOnLoad>
        </Suspense> */}
      </main>
    </>
  );
}
