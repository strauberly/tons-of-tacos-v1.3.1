import Link from "next/link";
import classes from "./footer.module.css";

export default function Footer() {
  const phone: string = "1.555.555.5555";
  const email: string = "tonsoftacos@tonsoftacos.com";
  const faq: string = "FAQ";
  const about: string = "About";
  // adjust as need to display images for links
  const social: string[] = ["", "", ""];

  return (
    <div id="footer" className={classes.footer}>
      <div className={classes.footerGrid}>
        <div className={classes.contact}>
          <p>{phone}</p>
          <p>{email}</p>
        </div>
        <div>
          <Link href={`/about`}>{about}</Link>
        </div>
        <div>
          <Link href={`/faq`}>{faq}</Link>
        </div>
        <p>Social Media Links</p>
      </div>
    </div>
  );
}
