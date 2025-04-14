// "use server";

import { GetAllMenuItems } from "@/lib/menu";

import { useEffect, useRef, useState } from "react";
export default function MenuItemSelector() {
  const [tacos, setTacos] = useState<string[]>([]);
  const [sides, setSides] = useState<string[]>([]);
  const [toppings, setToppings] = useState<string[]>([]);
  const [drinks, setDrinks] = useState<string[]>([]);

  const menuItems = useRef<AllMenuItems>({
    tacos: [],
    sides: [],
    toppings: [],
    drinks: [],
  });

  useEffect(() => {
    async function GetItems() {
      const returnedItems: AllMenuItems = await GetAllMenuItems();
      menuItems.current = returnedItems;
      const tacoNames: string[] = [];
      const sideNames: string[] = [];
      const toppingNames: string[] = [];
      const drinkNames: string[] = [];
      menuItems.current.tacos.forEach((taco) => {
        tacoNames.push(taco.itemName);
      });
      menuItems.current.sides.forEach((side) => {
        toppingNames.push(side.itemName);
      });
      menuItems.current.toppings.forEach((topping) => {
        sideNames.push(topping.itemName);
      });
      menuItems.current.drinks.forEach((drink) => {
        drinkNames.push(drink.itemName);
      });
      setTacos(tacoNames);
      setSides(sideNames);
      setToppings(toppingNames);
      setDrinks(drinkNames);
    }
    GetItems();
  }, []);

  return (
    <ul>
      <p>Tacos</p>
      <ul>
        {tacos.map((tacoName: string) => (
          <p key={tacoName}>{`${tacoName}`}</p>
        ))}
      </ul>
      <p>Sides</p>
      <ul>
        {sides.map((sideName: string) => (
          <p key={sideName}>{`${sideName}`}</p>
        ))}
      </ul>
      <p>Toppings</p>
      <ul>
        {toppings.map((toppingName: string) => (
          <p key={toppingName}>{`${toppingName}`}</p>
        ))}
      </ul>
      <p>Drinks</p>
      <ul>
        {drinks.map((drinkName: string) => (
          <p key={drinkName}>{`${drinkName}`}</p>
        ))}
      </ul>
    </ul>
  );
}
