"use client";
import { useMenuCategoryContext } from "@/context/menu-category-context";
import classes from "./nav-buttons.module.css";
import MenuIcon from "./menu-icon";
import MenuNav from "../../../menu/menu-navigation/menu-navigation";
import CartIcon from "./cart-icon";
import CartQuantity from "../../badges/cart-quantity";
import { useDisplayContext } from "@/context/display-context";
import { useEffect } from "react";
import Cart from "@/components/cart/cart";
import { useCartContext } from "@/context/cart-context";
import { GetCart } from "@/lib/cart";

export default function NavButtons(menuOptions: { menuOptions: Category[] }) {
  const { setMenuCategories } = useMenuCategoryContext();
  const { showMenu, setShowMenu, showCart, setShowCart } = useDisplayContext();
  const { setCart, cartQuantity } = useCartContext();

  function toggleMenu() {
    setShowCart(false);
    setShowMenu(true);
  }

  function toggleCart() {
    setShowMenu(false);
    setShowCart(true);
  }

  useEffect(() => {
    setMenuCategories(menuOptions.menuOptions);
    setCart(GetCart());
    if (cartQuantity <= 0) {
      setShowCart(false);
    }
  }, [
    cartQuantity,
    menuOptions.menuOptions,
    setCart,
    setMenuCategories,
    setShowCart,
    showCart,
    showMenu,
  ]);

  return (
    <>
      <div className={classes.navButtons}>
        <CartQuantity />
        <nav className={classes.navButtons}>
          <button
            className={classes.menuButton}
            onMouseEnter={() => toggleMenu()}
          >
            <MenuIcon />
          </button>
          <button
            className={classes.cartButton}
            onMouseEnter={() => toggleCart()}
          >
            <CartIcon />
          </button>
        </nav>
        <div className={classes.menu} onMouseLeave={() => setShowMenu(false)}>
          {showMenu && <MenuNav />}
        </div>
        <div onMouseLeave={() => setShowCart(false)}>
          {showCart && <Cart />}
        </div>
      </div>
    </>
  );
  // const { setMenuCategories } = useMenuCategoryContext();
  // const { showMenu, setShowMenu, showCart, setShowCart } = useDisplayContext();
  // const { setCart, cartQuantity } = useCartContext();

  // const menuRef = useRef<boolean>(showMenu);
  // const cartRef = useRef<boolean>(showCart);

  // function toggleMenu() {
  //   setShowCart(false);
  //   if (menuRef.current == false) {
  //     menuRef.current = true;
  //   } else {
  //     menuRef.current = false;
  //   }
  //   setShowMenu(menuRef.current);
  // }

  // function toggleCart() {
  //   setShowMenu(false);
  //   if (cartRef.current == false) {
  //     cartRef.current = true;
  //   } else {
  //     cartRef.current = false;
  //   }
  //   setShowCart(cartRef.current);
  // }

  // useEffect(() => {
  //   setMenuCategories(menuOptions.menuOptions);
  //   setCart(GetCart());
  //   if (cartQuantity <= 0) {
  //     setShowCart(false);
  //   }
  // }, [
  //   cartQuantity,
  //   menuOptions.menuOptions,
  //   setCart,
  //   setMenuCategories,
  //   setShowCart,
  //   showCart,
  //   showMenu,
  // ]);

  // return (
  //   <>
  //     <div className={classes.navButtons}>
  //       <CartQuantity />
  //       <nav className={classes.navButtons}>
  //         <button className={classes.menuButton} onClick={() => toggleMenu()}>
  //           <MenuIcon />
  //         </button>
  //         <button className={classes.cartButton} onClick={() => toggleCart()}>
  //           <CartIcon />
  //         </button>
  //       </nav>
  //       <div className={classes.menu}>{showMenu && <MenuNav />}</div>
  //       <div>{showCart && <Cart />}</div>
  //     </div>
  //   </>
  // );
}
