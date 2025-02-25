import classes from "./main-header.module.css";
import Link from "next/link";
import CategoriesSource from "@/lib/menu";
import NavButtons from "@/components/ui/buttons/nav-buttons/nav-buttons";
import OwnerLoginForm from "../ui/forms/owner-login-form";

export default async function MainHeader() {
  // const categories = await CategoriesSource();

  return (
    <>
      <div className={classes.headerAlignment}>
        <header className={classes.header}>
          <Link className={classes.home} href="/">
            Tons Of Tacos
          </Link>
          <OwnerLoginForm />
          {/* <NavButtons menuOptions={categories} /> */}
        </header>
      </div>
    </>
  );
}
