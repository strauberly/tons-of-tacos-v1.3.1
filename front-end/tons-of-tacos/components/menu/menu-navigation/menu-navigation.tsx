"use client";
import classes from "./menu-nav.module.css";
import MenuCategories from "./menu-category-list";
import { useDisplayContext } from "@/context/display-context";
import { AnimatePresence } from "framer-motion";
import DropDown from "@/components/ui/animations/drop-down";
import { useRef, useEffect } from "react";

export default function MenuNav() {
  const { setShowMenu, showMenu } = useDisplayContext();
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function clickHandler(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    }
    document.addEventListener("click", clickHandler);

    return () => document.removeEventListener("click", clickHandler, true);
  }, [menuRef, setShowMenu, showMenu]);

  return (
    <div>
      <AnimatePresence>
        <DropDown>
          <div ref={menuRef} className={classes.menu}>
            <MenuCategories />
          </div>
        </DropDown>
      </AnimatePresence>
    </div>
  );
}
