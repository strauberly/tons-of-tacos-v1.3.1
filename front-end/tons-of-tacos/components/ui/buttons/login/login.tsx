// import { useOwnerTokenContext } from "@/context/owner-context";
import { useOwnerTokenContext } from "@/context/owner-context";

import { useFormStatus } from "react-dom";

// form executes the function of setting the context if login successful the button is only setting a secondary function on click, ie setting the welcome message an alert something like that
export default function LoginButton(token: { state: { token: string } }) {
  const status = useFormStatus();
  const { setOwnerToken } = useOwnerTokenContext();

  return (
    <button
      type="submit"
      onClick={async () => {
        try {
          setOwnerToken(token.state.token);
        } catch (error) {
          throw new Error("whups..." + { error });
        }
      }}
    >
      {status.pending ? "Logging In..." : "Log In"}
    </button>
  );
}
