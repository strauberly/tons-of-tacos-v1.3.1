"use client";
import { useOwnerContext } from "@/context/owner-context";
import classes from "./login-button.module.css";

import { useFormStatus } from "react-dom";
import { useEffect, useRef } from "react";
import { getLogin, IsAuthenticated, storeLogin } from "@/lib/owners-tools";

// export default function LoginButton(ownerLogin: OwnerLogin) {
//   const status = useFormStatus();
//   const { login, setLogin, setLoggedIn } = useOwnerContext();

//   const responseObj = useRef(ownerLogin.state);

//   console.log(ownerLogin);
//   useEffect(() => {
//     // console.log(ownerLogin);
//     // setLogin();
//   }, [login, ownerLogin, setLogin]);

//   return (
//     <button
//       className={classes.login}
//       type="submit"
//       // onClick={async () => {
//       //   try {
//       //     console.log(responseObj);
//       //     storeLogin(JSON.stringify(login));
//       //     setLoggedIn(true);
//       //     sessionStorage.setItem("isAuthenticated", "true");
//       //   } catch (error) {
//       //     throw new Error("whups..." + error);
//       //   }
//       // }}
//     >
//       {status.pending ? "Logging In..." : "Log In"}
//     </button>
//   );
export default function LoginButton(response: {
  status: number;
  response: { token: string; ownerName: string };
}) {
  const status = useFormStatus();
  const { login, setLogin, setLoggedIn } = useOwnerContext();

  // const responseObj = useRef(ownerLogin.state);

  // console.log(ownerLogin);
  useEffect(() => {
    if (response.status === 200) {
      storeLogin(JSON.stringify(response.response));
      setLoggedIn(IsAuthenticated());
      setLogin(getLogin());
    }
    // console.log(ownerLogin);
    // setLogin();
  }, [response.response, response.status, setLoggedIn, setLogin]);

  return (
    <button
      className={classes.login}
      type="submit"
      disabled={status.pending}
      // onClick={async () => {
      //   try {
      //     if (response.status === 200) {
      //       storeLogin(JSON.stringify(response.response));
      //       setLoggedIn(IsAuthenticated());
      //       setLogin(getLogin());
      //     }
      //   } catch (error) {
      //     throw new Error("whups..." + error);
      //   }
      // }}
    >
      {status.pending ? "Logging In..." : "Log In"}
    </button>
  );
}
