import { projectAbout, title, aboutStory } from "@/lib/content/about";
import classes from "./about.module.css";
import FadeOnLoad from "@/components/ui/animations/fade-on-load";
import { Suspense } from "react";
import Loading from "../loading";

export default async function About() {
  await new Promise((resolve) => setTimeout(resolve, 2500));
  return (
    <>
      <Suspense fallback={<Loading />}>
        <FadeOnLoad>
          <div className={classes.aboutContent}>
            <h1 className={classes.title}>{title}</h1>
            <p className={classes.aboutStory}>{aboutStory}</p>
          </div>
          <div className={classes.projectAbout}>{projectAbout}</div>
        </FadeOnLoad>
      </Suspense>
    </>
  );
}
