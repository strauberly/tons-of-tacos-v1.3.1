"use client";

import { useEffect } from "react";

let categories: Category[];
let menuOptions: string[];

export default function useSessionStorage() {
  useEffect(() => {
    if (typeof window !== "undefined")
      categories = JSON.parse(sessionStorage.getItem("categories") || "{}");
    menuOptions = categories.map((category: { name: string }) => category.name);
  }, []);
  return menuOptions.toString();
}
