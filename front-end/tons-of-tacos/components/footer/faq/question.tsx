import classes from "./question.module.css";

export default function Question(props: { q: string; a: string }) {
  return (
    <>
      <h2 className={classes.question}>{props.q}</h2>
      <p className={classes.answer}>{props.a}</p>
    </>
  );
}
