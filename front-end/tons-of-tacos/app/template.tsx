import { Suspense } from "react";
import Loading from "./loading";

import FadeOnLoad from "@/components/ui/animations/fade-on-load";

export default async function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <FadeOnLoad>{children}</FadeOnLoad>
      </Suspense>
    </>
  );
}
