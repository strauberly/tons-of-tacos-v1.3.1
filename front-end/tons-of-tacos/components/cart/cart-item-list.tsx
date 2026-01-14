import { useCartContext } from "@/context/cart-context";
import { GetCart } from "@/lib/cart";
import { useEffect } from "react";
import CartItem from "./cart-item";
import { useOwnerContext } from "@/context/order-context/owner-context";
import { GetOwnerOrder } from "@/lib/owners-tools/owners-tools-client";
import { useOrdersContext } from "@/context/order-context/orders-context";

export default function CartItems() {
  const { cart, setCart } = useCartContext();
  const { loggedIn } = useOwnerContext();
  const { ownerOrder, order } = useOrdersContext();

  if (cart == null) {
    throw new Error("uh..");
  }

  useEffect(() => {
    // try catch
    if (loggedIn) {
      setCart(GetOwnerOrder());
    } else {
      try {
        setCart(GetCart());
      } catch {
        throw new Error("whup");
      }
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
