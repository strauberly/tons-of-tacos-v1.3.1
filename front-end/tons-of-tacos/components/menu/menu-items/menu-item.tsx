import Card from "@/components/ui/cards/card";
import Image from "next/image";
import { useEffect, useState } from "react";
import QuantitySelector from "./quantity-selector/quantity-selector";
import MoreIcon from "@/components/ui/icons/more-icon";
import { useSelectedSizeContext } from "@/context/size-context";
import { useDisplayContext } from "@/context/display-context";
import { useModalContext } from "@/context/modal-context";
import AddToCart from "@/components/ui/buttons/add-to-cart/add-to-cart";
import SizeSelector from "./size-selector/size-selector";
import { useMenuItemIdContext } from "@/context/menu-item-context";
import classes from "./menu-item.module.css";

export default function MenuItem(props: {
  id: string;
  itemName: string;
  category: string;
  imageUrl: string;
  description: string;
  itemSize: string;
  unitPrice: number;
}) {
  const { setModal } = useModalContext();
  const { setShowModal } = useDisplayContext();
  const { menuItemId } = useMenuItemIdContext();
  const [expand, setExpand] = useState(false);
  const [price, setPrice] = useState("");

  const [sizeAvailable, setSizeAvailable] = useState(false);
  const { selectedSize, setSelectedSize } = useSelectedSizeContext();

  const expander = () => {
    setExpand(false);
  };

  const itemSizes = ["small", "medium", "large"];
  const defaultQuantity: number = 1;
  const [quantity, setQuantity] = useState(defaultQuantity);

  const quantitySelector = () => {
    setQuantity(defaultQuantity);
  };

  const increment = () => {
    setQuantity(quantity + 1);
    if (quantity >= 10) {
      setQuantity(10);
      setModal(
        "The limit for this item is 10. If you need more please give us a call so we can try to accommodate your order. Thanks!"
      );
      setShowModal(true);
    }
  };

  const decrement = () => {
    setQuantity(quantity - 1);
    if (quantity <= 1) {
      setQuantity(defaultQuantity);
    }
  };

  console.log("item size:" + props.itemSize);
  console.log("selected size:" + selectedSize);

  useEffect(() => {
    function calcPrice() {
      let adjPrice: number;
      let sizeSurcharge = 0;

      if (selectedSize === "medium" && props.id === menuItemId) {
        sizeSurcharge = 0.5;
      } else if (selectedSize === "large" && props.id === menuItemId) {
        sizeSurcharge = 1.0;
      }

      // eslint-disable-next-line prefer-const
      adjPrice = (sizeSurcharge + props.unitPrice) * quantity;
      return adjPrice;
    }

    if (props.itemSize === "a") {
      setSizeAvailable(true);
    }
    setPrice(calcPrice().toFixed(2));
  }, [
    menuItemId,
    props.id,
    props.itemSize,
    props.unitPrice,
    quantity,
    selectedSize,
    setSelectedSize,
  ]);

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
            <SizeSelector
              sizes={itemSizes}
              sizeAvailable={sizeAvailable}
              id={props.id}
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
