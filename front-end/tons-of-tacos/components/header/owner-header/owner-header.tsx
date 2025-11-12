import { useOwnerContext } from "@/context/owner-context";
import { Suspense, useEffect, useState } from "react";
import classes from "./owner-header.module.css";
import LogoutButton from "../../ui/buttons/logout/logout";
import FadeOnLoad from "@/components/ui/animations/fade-on-load";
import { logout } from "@/lib/ownerLogin/owners-login-client";

// import jwtDecode from 'jwt-decode';

export default function OwnerHeader() {
  const { login, setLoggedIn } = useOwnerContext();

  const [date, setDate] = useState(new Date());
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // ref that wont change to eliminate complaint from app
  // check if time greater than initial iat from original login
  //  set exp as hard 20:00
  // if token expired and its past 2000 > logout

  useEffect(() => {
    // async function TokenExp() {
    //   const [, payloadBase64] = login.token.split(".");
    //   const decodedPayload = Buffer.from(payloadBase64, "base64").toString(
    //     "utf-8"
    //   );
    //   const subject = await JSON.parse(decodedPayload);
    //   if (subject.exp < Date.now() / 1000) {
    //     console.log("its time");
    //     logout();
    //     setLoggedIn(false);
    //   }
    // }

    const timer = setInterval(() => setDate(new Date()), 1000);

    // setInterval(TokenExp, 1000 * 60 * 3);
    return function cleanup() {
      clearInterval(timer);
    };
  }, [login.accessToken, setLoggedIn]);

  return (
    <Suspense>
      <FadeOnLoad>
        <div className={classes.ownerHeader}>
          <p> Hola, {login.ownerName}!</p>
          <p>{date.toLocaleTimeString([], { timeStyle: "short" })}</p>
          <p>{date.toLocaleDateString(undefined, options)}</p>
          <LogoutButton />
        </div>
      </FadeOnLoad>
    </Suspense>
  );
}
