import { Suspense } from "react";
import FadeOnLoad from "@/components/ui/animations/fade-on-load";
import Loading from "../loading";
import MenuItemList from "@/components/menu/menu-items/menu-item-list";

export default async function MenuItemsByCategory(props: {
  params: Promise<{ menuCategory: string }>;
}) {
  const params = props.params;
  const category = (await params).menuCategory;
  await new Promise((resolve) => setTimeout(resolve, 2500));

  return (
    <>
      <main>
        <Suspense fallback={<Loading />}>
          <FadeOnLoad>
            <MenuItemList category={category} />
          </FadeOnLoad>
        </Suspense>
      </main>
    </>
  );
}
