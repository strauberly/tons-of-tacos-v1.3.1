import classes from "./menu-item-list.module.css";
import MenuItem from "./menu-item";

export default async function MenuItemList(props: {
  category: string;
  menuItems: MenuItem[];
}) {
  await new Promise((resolve) => setTimeout(resolve, 2500));

  return (
    <>
      <ul className={classes.grid}>
        {props.menuItems.map(
          (menuItem: {
            id: string;
            itemName: string;
            category: string;
            imageUrl: string;
            itemSize: string;
            unitPrice: number;
            description: string;
          }) => (
            <MenuItem
              id={`${menuItem.id}`}
              key={`${menuItem.itemName}_${menuItem.itemSize}`}
              itemName={menuItem.itemName}
              category={menuItem.category}
              imageUrl={menuItem.imageUrl}
              itemSize={menuItem.itemSize}
              unitPrice={menuItem.unitPrice}
              description={menuItem.description}
            />
          )
        )}
      </ul>
    </>
  );
}
