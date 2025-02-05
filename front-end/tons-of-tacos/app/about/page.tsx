import { projectAbout, title, aboutStory } from "@/lib/content/about";
import classes from "./about.module.css";

export default function About() {
  return (
    <>
      <div className={classes.aboutContent}>
        <h1 className={classes.title}>{title}</h1>
        <p className={classes.aboutStory}>{aboutStory}</p>
      </div>
      <div className={classes.projectAbout}>{projectAbout}</div>
    </>
  );
}
