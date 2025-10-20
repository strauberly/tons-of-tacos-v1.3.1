import { useCartContext } from "@/context/cart-context";
import { GetCart } from "@/lib/cart";
import { useEffect } from "react";
import CartItem from "./cart-item";
import { useOwnerContext } from "@/context/owner-context";
import { GetOwnerOrder } from "@/lib/owners-tools/owners-tools-client";
import CartItemCopy from "./cart-item-copy";

export default function CartItems() {
  const { cart, setCart } = useCartContext();
  const { ownerOrder, order } = useOwnerContext();

  useEffect(() => {
    if (ownerOrder) {
      return setCart(GetOwnerOrder());
    } else {
      return setCart(GetCart());
    }
  }, [order, ownerOrder, setCart]);

  return (
    <ul>
      {cart.map(
        (cartItem: {
          menuId: string;
          itemName: string;
          quantity: number;
          size: string;
          price: string;
        }) => (
          <CartItemCopy
            key={`${cartItem.itemName}_${cartItem.size}`}
            id={`${cartItem.itemName}_${cartItem.size}`}
            menuId={cartItem.menuId}
            itemName={cartItem.itemName}
            itemQuantity={cartItem.quantity}
            size={cartItem.size}
            itemPrice={cartItem.price}
          />
          // <CartItem
          //   key={`${cartItem.itemName}_${cartItem.size}`}
          //   id={`${cartItem.itemName}_${cartItem.size}`}
          //   menuId={cartItem.menuId}
          //   itemName={cartItem.itemName}
          //   itemQuantity={cartItem.quantity}
          //   size={cartItem.size}
          //   itemPrice={cartItem.price}
          // />
        )
      )}
    </ul>
  );
}
