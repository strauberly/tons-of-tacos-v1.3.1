"use server";

import { notFound } from "next/navigation";

export default async function CategoriesSource() {
  // let data;

  // try {
  const response = await fetch("http://localhost:8080/api/menu/categories");
  const data = await response.json();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  console.log("error:" + response.status);

  if (response.status === 200) {
    const categories: Category[] = data;
    return categories;
  } else {
    throw new Error(data.message);
  }
  // utilize error for status
  // } catch (error) {
  //   console.log(error);
  //   throw new Error(
  //     "Bummer, looks like our systems are down. Give us a shout for more info or try again later."
  //   );
  // }
}

export async function MenuItemsSource(category: string) {
  const response = await fetch(
    `http://localhost:8080/api/menu/category?category=${category}`
  );
  const data = await response.json();
  const status = response.status;
  const menuItems: MenuItem[] = data;
  if (status !== 200) {
    notFound();
  } else {
    return menuItems;
  }
}

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
