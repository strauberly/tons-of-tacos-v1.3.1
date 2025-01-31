import { about, aboutStory, title } from "@/lib/content/about";
import classes from "./about.module.css";

export default function About() {
  return (
    <div className={classes.aboutContent}>
      <h1>{title}</h1>
      <p className={classes.aboutStory}>{aboutStory}</p>
      <p className={classes.projectAbout}>{about}</p>
    </div>
  );
}
