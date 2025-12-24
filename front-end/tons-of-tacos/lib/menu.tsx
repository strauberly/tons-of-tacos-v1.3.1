import { menu } from "framer-motion/client";

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
      "Bummer, looks like our systems are down. Give us a shout for more info or try again later."
    );
  }
  const categories: Category[] = data;
  return categories;
}

export async function MenuItemsSource(category: string) {
  let data;
  let status;
  // try {
  const response = await fetch(
    `http://localhost:8080/api/menu/category?category=${category}`
  );
  data = await response.json();
  status = response.status;
  const menuItems: MenuItem[] = data;
  if (status !== 200) {
    throw new Error(`${data.message}`);
  } else {
    console.log(menuItems);
    return menuItems;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // } catch (error) {
  //   throw new Error("Sorry, we're having issues bringing you our menu");
  // }
}

// get menu item

// get menu item names

export async function GetAllMenuItems() {
  const menuItems: AllMenuItems = {
    tacos: [],
    sides: [],
    toppings: [],
    drinks: [],
  };

  menuItems.tacos = await MenuItemsSource("tacos");
  menuItems.sides = await MenuItemsSource("sides");
  menuItems.toppings = await MenuItemsSource("toppings");
  menuItems.drinks = await MenuItemsSource("drinks");

  const returnedMenuItems: AllMenuItems = menuItems;

  return returnedMenuItems;
}
