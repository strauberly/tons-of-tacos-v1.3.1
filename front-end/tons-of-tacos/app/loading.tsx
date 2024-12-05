import classes from "@/app/[menuCategory]/page.module.css";

import Image from "next/image";
import logoImg from "@/public/images/logos/bird-logo-rendersa.svg";
import logoRender from "@/public/images/logos/bird-logo-rendersb.svg";
import LoadingAnimation from "@/components/ui/animations/loading-animation";
import FadeOnLoad from "@/components/ui/animations/fade-on-load";

export default function Loading() {
  return (
    <FadeOnLoad>
      <Image
        src={logoImg}
        className={classes.loadImage}
        alt="tons of tacos logo"
      />
      <LoadingAnimation>
        <Image
          src={logoRender}
          className={classes.loadImage}
          alt="tons of tacos loading animation"
        />
      </LoadingAnimation>
    </FadeOnLoad>
  );
}
