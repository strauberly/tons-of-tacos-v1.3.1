import Card from "@/components/ui/cards/card";
import Image from "next/image";
import classes from "./menu-item.module.css";
import SizeSelector from "./size-selector/size-selector";
import QuantitySelector from "./quantity-selector/quantity-selector";
import { useEffect, useState } from "react";
import MoreIcon from "@/components/ui/icons/more-icon";
import AddToCart from "../../ui/buttons/add-to-cart/add-to-cart";
import { useDisplayContext } from "@/context/display-context";
import { useAlertContext } from "@/context/alert-context";

export default function MenuItem(props: {
  id: string;
  itemName: string;
  category: string;
  imageUrl: string;
  description: string;
  itemSize: string;
  unitPrice: number;
}) {
  const defaultQuantity: number = 1;
  const itemSizes = ["small", "medium", "large"];
  const [sizeAvailable, setSizeAvailable] = useState(false);
  const [quantity, setQuantity] = useState(defaultQuantity);
  const [size, setSize] = useState(" ");
  const [expand, setExpand] = useState(false);
  const { setAlert } = useAlertContext();
  const { setShowAlert } = useDisplayContext();

  const increment = () => {
    setQuantity(quantity + 1);
    if (quantity >= 10) {
      setQuantity(10);
      setAlert(
        "The limit for this item is 10. If you need more please give us a call so we can try to accommodate your order. Thanks!"
      );
      setShowAlert(true);
    }
  };

  const decrement = () => {
    setQuantity(quantity - 1);
    if (quantity <= 1) {
      setQuantity(defaultQuantity);
    }
  };

  const sizeSetter = (sizePicked: string) => {
    setSize(sizePicked);
  };

  const quantitySelector = () => {
    setQuantity(defaultQuantity);
  };

  const expander = () => {
    setExpand(false);
  };

  function calcPrice() {
    let adjPrice: number;
    let sizeSurcharge = 0;

    switch (size) {
      case "medium":
        sizeSurcharge = 0.5;
        break;
      case "large":
        sizeSurcharge = 1.0;
        break;
    }

    // eslint-disable-next-line prefer-const
    adjPrice = (sizeSurcharge + props.unitPrice) * quantity;
    return adjPrice;
  }

  useEffect(() => {
    if (props.itemSize === "a") {
      setSizeAvailable(true);
    }
  }, [props.itemSize]);

  const price = calcPrice().toFixed(2);

  return (
    <Card expand={expand} any={undefined}>
      <li
        className={`${classes.card} ${expand === true ? classes.expand : " "}`}
      >
        <h2>{props.itemName}</h2>
        {expand && (
          <button
            onClick={() => setExpand(false)}
            className={classes.closeExpanded}
          >
            X
          </button>
        )}
        <Image
          id={classes.itemImage}
          src={`/images/menu-items/${props.category}/${props.itemName}.jpg`}
          alt={`a picture of ${props.itemName}`}
          width={250}
          height={250}
        />
        <div className={classes.ghostDiv}>
          {expand && <p>{props.description}</p>}
          {sizeAvailable && (
            <SizeSelector
              sizes={itemSizes}
              sizeSetter={sizeSetter}
              sizeAvailable={sizeAvailable}
            />
          )}
        </div>

        <QuantitySelector
          value={quantity}
          increment={increment}
          decrement={decrement}
        />
        <p className={classes.price}>${price}</p>

        <AddToCart
          id={`${props.itemName}_${size}`}
          menuId={props.id}
          itemName={props.itemName}
          quantity={quantity}
          size={size}
          price={price}
          quantitySelector={quantitySelector}
          expander={expander}
        />

        {!expand && (
          <button onClick={() => setExpand(true)}>
            <MoreIcon />
          </button>
        )}
      </li>
    </Card>
  );
}
