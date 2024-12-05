import { useCartContext } from "@/context/cart-context";
import { GetCart } from "@/lib/cart";
import { useEffect } from "react";
import CartItem from "./cart-item";

export default function CartItems() {
  const { cart, setCart } = useCartContext();

  useEffect(() => {
    setCart(GetCart());
  }, [setCart]);

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
          <CartItem
            key={`${cartItem.itemName}_${cartItem.size}`}
            id={`${cartItem.itemName}_${cartItem.size}`}
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
