import Link from "next/link";
import classes from "./footer.module.css";
import InstaIcon from "../ui/buttons/social-links/insta";
import XIcon from "../ui/buttons/social-links/x";
import FacebookIcon from "../ui/buttons/social-links/facebook";

export default function Footer() {
  const phone: string = "1.555.555.5555";
  const email: string = "tonsoftacos@tonsoftacos.com";
  const faq: string = "FAQ";
  const about: string = "About";

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
        <div className={classes.socialLinks}>
          <Link href={`https://www.instagram.com`} target="_blank">
            <InstaIcon />
          </Link>
          <Link href={`https://www.x.com`} target="_blank">
            <XIcon />
          </Link>
          <Link href={`https://www.facebook.com`} target="_blank">
            <FacebookIcon />
          </Link>
        </div>
      </div>
      <p className={classes.copyright}>
        &copy; Adam Straub {new Date().getFullYear()}
      </p>
    </div>
  );
}
