import Card from "@/components/ui/cards/card";
import Image from "next/image";
import classes from "./menu-item.module.css";
import { useEffect, useState } from "react";
import QuantitySelector from "./quantity-selector/quantity-selector";
import MoreIcon from "@/components/ui/icons/more-icon";

import { useSelectedSizeContext } from "@/context/size-context";
import { useDisplayContext } from "@/context/display-context";
import { useAlertContext } from "@/context/alert-context";
import AddToCart from "@/components/ui/buttons/add-to-cart/add-to-cart";
import SizeSelector from "./size-selector/size-selector";

export default function MenuItem(props: {
  id: string;
  itemName: string;
  category: string;
  imageUrl: string;
  description: string;
  itemSize: string;
  unitPrice: number;
}) {
  const { setAlert } = useAlertContext();
  const { setShowAlert } = useDisplayContext();
  const [expand, setExpand] = useState(false);

  const expander = () => {
    setExpand(false);
  };

  const defaultQuantity: number = 1;
  const [quantity, setQuantity] = useState(defaultQuantity);

  const quantitySelector = () => {
    setQuantity(defaultQuantity);
  };

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

  const itemSizes = ["small", "medium", "large"];
  const [sizeAvailable, setSizeAvailable] = useState(false);

  const { selectedSize } = useSelectedSizeContext();

  function calcPrice() {
    let adjPrice: number;
    let sizeSurcharge = 0;

    switch (selectedSize) {
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

  const price = calcPrice().toFixed(2);

  useEffect(() => {
    if (props.itemSize === "a") {
      setSizeAvailable(true);
    }
  }, [props.itemSize, selectedSize]);

  return (
    <Card expand={expand}>
      <li
        className={`${classes.card} ${expand === true ? classes.expand : " "}`}
      >
        <h2 className={classes.itemName}>{props.itemName}</h2>

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
            <SizeSelector sizes={itemSizes} sizeAvailable={sizeAvailable} />
          )}
        </div>
        <QuantitySelector
          value={quantity}
          increment={increment}
          decrement={decrement}
        />
        <p className={classes.price}>${price}</p>

        <AddToCart
          id={`${props.itemName}_${selectedSize}`}
          menuId={props.id}
          itemName={props.itemName}
          quantity={quantity}
          size={selectedSize}
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
