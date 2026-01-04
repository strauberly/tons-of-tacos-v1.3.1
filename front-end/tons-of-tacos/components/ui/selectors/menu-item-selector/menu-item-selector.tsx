import classes from "./menu-item-selector.module.css";
import { GetAllMenuItems } from "@/lib/menu";
import { useEffect, useRef, useState } from "react";

export default function MenuItemSelector(props: {
  setItemName: (item: string) => void;
  setItem: (item: MenuItem) => void;
  itemName: string;
  setItemSelector: (itemSelector: boolean) => void;
  setReadyToAdd: (readyToAdd: boolean) => void;
  setPrice: (price: number) => void;
  setSize: (size: string) => void;
}) {
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
  const menuItem = useRef<MenuItem>({
    id: "",
    itemName: "",
    category: "",
    imageUrl: "",
    description: "",
    itemSize: "",
    unitPrice: 0,
  });

  function findItem(name: string) {
    const taco = menuItems.current.tacos.find(
      (item: MenuItem) => item.itemName.toString() === `${name}`
    );
    const side = menuItems.current.sides.find(
      (item: MenuItem) => item.itemName === `${name}`
    );
    const topping = menuItems.current.toppings.find(
      (item: MenuItem) => item.itemName === `${name}`
    );
    const drink = menuItems.current.drinks.find(
      (item: MenuItem) => item.itemName === `${name}`
    );
    if (taco !== undefined) {
      menuItem.current = taco;
    } else if (side !== undefined) {
      menuItem.current = side;
    } else if (topping !== undefined) {
      menuItem.current = topping;
    } else if (drink !== undefined) {
      menuItem.current = drink;
    }
    console.log(menuItem.current);
    return menuItem.current;
  }

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
    <div className={classes.menuItemSelector}>
      <div className={classes.categories}>
        <h3>Tacos</h3>
        <h3>Toppings</h3>
        <h3>Sides</h3>
        <h3>Drinks</h3>
      </div>
      <div className={classes.items}>
        <ul>
          {tacos.map((tacoName: string) => (
            <button
              key={tacoName}
              onClick={() => [
                props.setItemName(tacoName),
                props.setItem(findItem(tacoName)),
                props.setReadyToAdd(true),
                props.setItemSelector(false),
                props.setPrice(menuItem.current.unitPrice),
                props.setSize(menuItem.current.itemSize),
              ]}
            >{`${tacoName}`}</button>
          ))}
        </ul>
        <ul>
          {sides.map((sideName: string) => (
            <button
              key={sideName}
              onClick={() => [
                props.setItemName(sideName),
                props.setItem(findItem(sideName)),
                props.setReadyToAdd(true),
                props.setItemSelector(false),
                props.setPrice(menuItem.current.unitPrice),
                props.setSize(menuItem.current.itemSize),
              ]}
            >{`${sideName}`}</button>
          ))}
        </ul>
        <ul>
          {toppings.map((toppingName: string) => (
            <button
              key={toppingName}
              onClick={() => [
                props.setItemName(toppingName),
                props.setItem(findItem(toppingName)),
                props.setReadyToAdd(true),
                props.setItemSelector(false),
                props.setPrice(menuItem.current.unitPrice),
                props.setSize(menuItem.current.itemSize),
              ]}
            >{`${toppingName}`}</button>
          ))}
        </ul>
        <ul>
          {drinks.map((drinkName: string) => (
            <button
              key={drinkName}
              onClick={() => [
                props.setItemName(drinkName),
                props.setItem(findItem(drinkName)),
                console.log(findItem(drinkName)),
                console.log(drinkName),

                props.setReadyToAdd(true),
                props.setItemSelector(false),
                props.setPrice(menuItem.current.unitPrice),
                props.setSize(menuItem.current.itemSize),
              ]}
            >{`${drinkName}`}</button>
          ))}
        </ul>
      </div>
    </div>
  );
}
