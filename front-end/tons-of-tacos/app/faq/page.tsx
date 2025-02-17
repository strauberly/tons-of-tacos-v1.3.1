import Question from "@/components/footer/faq/question";
import faq from "../../lib/content/faq.json";
import classes from "./faq.module.css";
import FadeOnLoad from "@/components/ui/animations/fade-on-load";
import { Suspense } from "react";
import Loading from "../loading";

export default async function FAQ() {
  await new Promise((resolve) => setTimeout(resolve, 2500));

  return (
    <Suspense fallback={<Loading />}>
      <FadeOnLoad>
        <div className={classes.faq}>
          <h1 className={classes.title}>Frequently Asked Questions:</h1>
          <ul>
            {faq.map((question: { id: number; q: string; a: string }) => (
              <Question key={question.id} q={question.q} a={question.a} />
            ))}
          </ul>
        </div>
      </FadeOnLoad>
    </Suspense>
  );
}
