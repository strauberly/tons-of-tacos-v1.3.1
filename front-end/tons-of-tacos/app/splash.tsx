import Image from "next/image";
import logoImg from "@/public/images/logos/bird-logo-rendersa.svg";
import classes from "./page.module.css";
import { Suspense } from "react";
import FadeOnLoad from "@/components/ui/animations/fade-on-load";
import Loading from "./loading";

export default function Splash() {
  return (
    <Suspense fallback={<Loading />}>
      <FadeOnLoad>
        <Image
          src={logoImg}
          className={classes.image}
          alt="tons of tacos logo"
          placeholder="blur"
          blurDataURL="@/public/images/logos/bird-logo-rendersa.svg"
        />
      </FadeOnLoad>
    </Suspense>
  );
}
