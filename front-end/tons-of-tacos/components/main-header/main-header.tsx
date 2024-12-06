import classes from "./main-header.module.css";
import Link from "next/link";
import CategoriesSource from "@/lib/menu";
import NavButtons from "@/components/ui/buttons/nav-buttons/nav-buttons";

export default async function MainHeader() {
  const categories = await CategoriesSource();

  return (
    <>
      <div className={classes.headerAlignment}>
        <header className={classes.header}>
          <Link className={classes.home} href="/">
            Tons Of Tacos
          </Link>
          <NavButtons menuOptions={categories} />
        </header>
      </div>
    </>
  );
}
