export default async function CategoriesSource() {
  let data;
  try {
    const response = await fetch(
      "http://localhost:8080/api/utility/categories"
    );
    data = await response.json();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error(
      "Bummer, look like our systems are down. Give us a shout for more info or try again later."
    );
  }
  const categories: Category[] = data;
  return categories;
}

export async function MenuItemsSource(category: string) {
  let data;
  try {
    const response = await fetch(
      `http://localhost:8080/api/menu/category?category=${category}`
    );
    data = await response.json();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error("Sorry, we're having issues bringing you our menu");
  }
  const menuItems: MenuItem[] = data;
  return menuItems;
}
