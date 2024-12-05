import classes from "@/components/ui/badges/cart-quantity.module.css";
import { useCartContext } from "@/context/cart-context";
import { CreateCart, GetCartQuantity } from "@/lib/cart";
import { useEffect } from "react";

export default function CartQuantity() {
  const { setItemsInCart, setCartQuantity, cartQuantity, itemsInCart } =
    useCartContext();

  useEffect(() => {
    async function SetCart() {
      CreateCart();
      if (cartQuantity > 0) {
        setItemsInCart(true);
      } else {
        setItemsInCart(false);
      }
      setCartQuantity(await GetCartQuantity());
    }
    SetCart();
  }, [cartQuantity, setCartQuantity, setItemsInCart]);

  return (
    <>
      {itemsInCart && (
        <button className={classes.quantityBadge}>{cartQuantity}</button>
      )}
    </>
  );
}
