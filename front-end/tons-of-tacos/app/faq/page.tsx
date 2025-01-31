import Question from "@/components/footer/faq/question";
import faq from "../../lib/content/faq.json";
import classes from "./faq.module.css";

export default function FAQ() {
  return (
    <div className={classes.faq}>
      <h1 className={classes.title}>Frequently Asked Questions:</h1>
      <ul>
        {faq.map((question: { id: number; q: string; a: string }) => (
          <Question key={question.id} q={question.q} a={question.a} />
        ))}
      </ul>
    </div>
  );
}
