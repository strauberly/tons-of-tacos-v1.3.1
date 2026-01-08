"use client";
import classes from "./menu-item.module.css";
import Card from "@/components/ui/cards/card";
import Image from "next/image";
import { useEffect, useState } from "react";
import QuantitySelector from "../../ui/selectors/quantity-selector/quantity-selector";
import MoreIcon from "@/components/ui/icons/more-icon";
import { useSelectedSizeContext } from "@/context/size-context";
import { useDisplayContext } from "@/context/display-context";
import { useModalContext } from "@/context/menu-context/modal-context";
import AddToCart from "@/components/ui/buttons/cart-buttons/add-to-cart/add-to-cart";
import SizeSelector from "./size-selector/size-selector";
import { useMenuItemIdContext } from "@/context/menu-context/menu-item-context";

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
  const { selectedSize, setSelectedSize } = useSelectedSizeContext();

  const [price, setPrice] = useState("");
  const [, setEdited] = useState<boolean>(false);
  const [sizeAvailable, setSizeAvailable] = useState(false);

  const expander = () => {
    setExpand(false);
  };

  const itemSizes = ["S", "M", "L"];

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

  useEffect(() => {
    function calcPrice() {
      let adjPrice = 0;
      let sizeSurcharge = 0;

      if (selectedSize === "M" && props.id === menuItemId) {
        sizeSurcharge = 0.5;
      } else if (selectedSize === "L" && props.id === menuItemId) {
        sizeSurcharge = 1.0;
      }

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
          setEdited={setEdited}
          scale="scale(1)"
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
