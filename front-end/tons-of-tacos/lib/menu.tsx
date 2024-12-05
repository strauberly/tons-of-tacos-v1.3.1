// import error from "next/error";

export default async function CategoriesSource() {
  try {
    const response = await fetch(
      "http://localhost:8080/api/utility/categories"
    );
    const data = await response.json();
    return data;
  } catch (error) {
    // throw new Error("Sorry, we're having issues bringing you our menu");
    throw error;
  }
}

export async function useMenuItemsForCategory(category: string) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/menu/category?category=${category}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    // throw new Error("Sorry, we're having issues bringing you our menu");
    throw error;
  }
}

export const MenuItems = (category: string) => {
  return useMenuItemsForCategory(category);
};
