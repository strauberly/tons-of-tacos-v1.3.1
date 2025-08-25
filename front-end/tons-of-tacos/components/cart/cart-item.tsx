import { useState } from "react";
import QuantitySelector from "../menu/menu-items/quantity-selector/quantity-selector";

import classes from "./cart-item.module.css";
import RemoveFromCart from "../ui/buttons/remove-from-cart/remove-from-cart";
import Update from "../ui/buttons/update-cart-item/update-cart-item";
import { useCartContext } from "@/context/cart-context";
import { GetCart, RemoveCartItem } from "@/lib/cart";
import { useModalContext } from "@/context/modal-context";
import { useDisplayContext } from "@/context/display-context";
import MenuItem from "../menu/menu-items/menu-item";

export default function CartItem(props: {
  id: string;
  menuId: string;
  itemName: string;
  itemQuantity: number;
  size: string;
  itemPrice: string;
}) {
  const [quantity, setQuantity] = useState(props.itemQuantity);
  const [hasSize, setHasSize] = useState<boolean>(true);
  const { setCart, cartQuantity, setCartQuantity, setItemRemoved } =
    useCartContext();
  const { setModal } = useModalContext();
  const { setShowModal } = useDisplayContext();

  const increment = () => {
    if (quantity >= 10) {
      setModal(
        "The limit for this item is 10. If you need more please give us a call so we can try to accommodate your order. Thanks!"
      );
      setShowModal(true);
    } else if (quantity + cartQuantity > 30) {
      setModal(
        "Your order has grown to a fair size. The current maximum is 30 items. Please contact us before adding anything else. \n\nThis will ensure we can make your order happen today. You can also remove items from your cart. Thank you!"
      );
      setShowModal(true);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const decrement = () => {
    setQuantity(quantity - 1);
    if (quantity <= 1) {
      RemoveCartItem(props.id);
      setItemRemoved(true);
      setCart(GetCart());
      setCartQuantity(cartQuantity - props.itemQuantity);
    } else {
    }
  };

  function calcPrice() {
    let adjPrice;

    // eslint-disable-next-line prefer-const
    adjPrice = (parseFloat(props.itemPrice) / props.itemQuantity) * quantity;
    return adjPrice;
  }

  const price = calcPrice().toFixed(2);

  return (
    <li className={classes.item}>
      <p className={classes.itemName}>{props.itemName}</p>
      <p className={classes.size}> {props.size}</p>
      <QuantitySelector
        value={quantity}
        increment={increment}
        decrement={decrement}
      />
      <p className={classes.price}> ${price}</p>

      <Update
        cartItem={props.itemName}
        updatedItemQuantity={quantity}
        updatedItemPrice={price}
        oldQuantity={props.itemQuantity}
      />

      <RemoveFromCart id={props.menuId} cartItemQuantity={props.itemQuantity} />
    </li>
  );
}
