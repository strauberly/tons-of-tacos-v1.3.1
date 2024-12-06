import { useMenuCategoryContext } from "@/context/menu-category-context";
import MenuCategory from "./menu-category";

export default function MenuCategories() {
  const { menuCategories } = useMenuCategoryContext();

  return (
    <>
      <ul>
        {menuCategories.map((menuCategory: { name: string }) => (
          <MenuCategory key={menuCategory.name} name={menuCategory.name} />
        ))}
      </ul>
    </>
  );
}
