import { useCartContext } from "@/context/cart-context";
import { GetCart } from "@/lib/cart";
import { useEffect } from "react";
import CartItem from "./cart-item";
import { useOwnerContext } from "@/context/owner-context";
import { GetOwnerOrder } from "@/lib/owners-tools/owners-tools-client";

export default function CartItems() {
  const { cart, setCart } = useCartContext();
  const { ownerOrder, order, loggedIn } = useOwnerContext();

  useEffect(() => {
    // try catch
    if (loggedIn) {
      return setCart(GetOwnerOrder());
    } else {
      return setCart(GetCart());
    }
  }, [loggedIn, order, ownerOrder, setCart]);

  return (
    <ul>
      {cart.map(
        (cartItem: {
          id: string;
          menuId: string;
          itemName: string;
          quantity: number;
          size: string;
          price: string;
        }) => (
          <CartItem
            key={`${cartItem.itemName}_${cartItem.size}`}
            id={`${cartItem.id}`}
            menuId={cartItem.menuId}
            itemName={cartItem.itemName}
            itemQuantity={cartItem.quantity}
            size={cartItem.size}
            itemPrice={cartItem.price}
          />
        )
      )}
    </ul>
  );
}
