import { useActionState } from "react";
import classes from "./owner-login-form.module.css";
import { OwnerLogin } from "@/lib/owner-login";

export default function OwnerLoginForm() {
  const initialState = { token: "" };
  const [state, formAction] = useActionState(OwnerLogin, initialState);

  return (
    <form className={classes.ownerLogin} action={formAction}>
      <input
        type="text"
        id="owner_id"
        name="owner_id"
        placeholder="Enter ID"
        maxLength={6}
        required
      />

      <input
        type="text"
        id="password"
        name="password"
        placeholder="Enter Password"
        maxLength={8}
        required
      />
    </form>
  );
}
