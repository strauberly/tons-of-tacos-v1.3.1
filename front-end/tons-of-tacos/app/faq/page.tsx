import faq from "../../lib/content/faq.json";
import classes from "./faq.module.css";

export default function FAQ() {
  return (
    <div className={classes.faq}>
      <h1 className={classes.title}>Frequently Asked Questions:</h1>
      <ul>
        {faq.map((question: { q: string; a: string }) => (
          <>
            <h2 className={classes.question}>{question.q}</h2>
            <p className={classes.answer}>{question.a}</p>
          </>
        ))}
      </ul>
    </div>
  );
}
