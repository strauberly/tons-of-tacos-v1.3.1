"use client";
import Image from "next/image";
import logoImg from "@/public/images/logos/bird-logo-rendersa.svg";
import classes from "./page.module.css";
import { useDisplayContext } from "@/context/display-context";
import { useEffect } from "react";

export default function Home() {
  // export default async function Home() {

  const { setShowLogin } = useDisplayContext();

  useEffect(() => {
    setShowLogin(false);
  });

  return (
    <>
      <main className={classes.page}>
        <Image
          src={logoImg}
          className={classes.image}
          alt="tons of tacos logo"
          placeholder="blur"
          blurDataURL="@/public/images/logos/bird-logo-rendersa.svg"
        />
      </main>
    </>
  );
}
