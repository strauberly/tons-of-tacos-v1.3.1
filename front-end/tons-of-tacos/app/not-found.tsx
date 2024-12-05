import classes from "@/app/page.module.css";

export default function NotFound() {
  return (
    <div className={classes.error}>
      <h1>Not Found</h1>
      <p>
        Sorry, the requested resource does not exist. Please check your
        formatting and spelling.
      </p>
    </div>
  );
}
