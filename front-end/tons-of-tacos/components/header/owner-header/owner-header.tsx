import { useOwnerContext } from "@/context/owner-context";
import { Suspense, useEffect, useState } from "react";
import classes from "./owner-header.module.css";
import LogoutButton from "../../ui/buttons/logout/logout";
import FadeOnLoad from "@/components/ui/animations/fade-on-load";
import { logout } from "@/lib/ownerLogin/owners-login-client";
import {
  GetLogin,
  OwnerLogout,
  Refresh,
  StoreLogin,
} from "@/lib/ownerLogin/owner-login-server";
import { GetAllMenuItems } from "@/lib/menu";
import { useOrdersContext } from "@/context/orders-context";
import { GetAllOrders } from "@/lib/owners-tools/owners-tools";

// import jwtDecode from 'jwt-decode';

export default function OwnerHeader() {
  const { login, setLoggedIn, setLogin } = useOwnerContext();
  const { orders, setOrders } = useOrdersContext();

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

  const [, payloadBase64] = login.accessToken.split(".");
  const decodedPayload = Buffer.from(payloadBase64, "base64").toString("utf-8");
  const subject = JSON.parse(decodedPayload);

  useEffect(() => {
    const exp = subject.exp * 1000;
    console.log("subject: " + subject.exp * 1000);
    console.log("time:" + Date.now());
    console.log("Expired: " + `${exp < Date.now()}`);

    const loginDate = new Date();
    const hours = loginDate.getHours();

    // if exp call refresh token
    console.log(login.refreshToken);
    console.log(login.accessToken);

    async function Refresher() {
      if (exp < Date.now() && hours > 23) {
        OwnerLogout(login.accessToken);
        setLoggedIn(false);
      } else if (exp - Number(Date.now()) < 60000) {
        StoreLogin(await Refresh());
        setLogin(await GetLogin());
        setOrders(await GetAllOrders(login.accessToken));

        // StoreLogin();
        // reset context?
      }
      setDate(new Date());
      // async function TokenExp() {
      //   const [, payloadBase64] = login.token.split(".");
      //   const decodedPayload = Buffer.from(payloadBase64, "base64").toString(
      //     "utf-8"
      //   );
    }

    //   const subject = await JSON.parse(decodedPayload);
    //   if (subject.exp < Date.now() / 1000) {
    //     console.log("its time");
    //     logout();
    //     setLoggedIn(false);
    //   }
    // }
    const tokeRefresh = setInterval(() => Refresher(), 1000 * 60);

    return () => {
      clearInterval(tokeRefresh);
    };
    // const timer = setInterval(() => setDate(new Date()), 1000 * 60);

    // // setInterval(TokenExp, 1000 * 60 * 3);
    // return function cleanup() {
    //   clearInterval(timer);
    // };
  }, [
    login.accessToken,
    login.refreshToken,
    setLoggedIn,
    setLogin,
    setOrders,
    subject,
  ]);

  return (
    <div className={classes.ownerHeader}>
      <p> Hola, {login.ownerName}!</p>
      <p>{date.toLocaleTimeString([], { timeStyle: "short" })}</p>
      <p>{date.toLocaleDateString(undefined, options)}</p>
      <LogoutButton />
    </div>
  );
}
