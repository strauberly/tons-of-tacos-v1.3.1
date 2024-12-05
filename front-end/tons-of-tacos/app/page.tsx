import Image from "next/image";
import logoImg from "@/public/images/logos/bird-logo-rendersa.svg";
import classes from "./page.module.css";

export default async function Home() {
  return (
    <>
      <main className={classes.page}>
        <Image
          src={logoImg}
          className={classes.image}
          alt="tons of tacos logo"
        />
      </main>
    </>
  );
}
