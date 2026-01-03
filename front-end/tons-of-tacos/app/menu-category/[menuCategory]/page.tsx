import MenuItemList from "@/components/menu/menu-items/menu-item-list";
import { MenuItemsSource } from "@/lib/menu";

export default async function MenuItemsByCategory(props: {
  params: Promise<{ menuCategory: string }>;
}) {
  const params = props.params;
  const category = (await params).menuCategory;
  const menuItems = await MenuItemsSource((await props.params).menuCategory);

  return (
    <>
      <main>
        <MenuItemList category={category} menuItems={menuItems} />
      </main>
    </>
  );
}
