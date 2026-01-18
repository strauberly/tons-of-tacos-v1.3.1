"use client";
import classes from "./owner-header.module.css";
import { useOwnerContext } from "@/context/session-context/owner-context";
import { useEffect, useState } from "react";
import LogoutButton from "../../ui/buttons/session-buttons/logout/logout";

import {
  DeleteCookies,
  GetLogin,
  OwnerLogout,
  Refresh,
  StoreLogin,
} from "@/lib/owner-session/owner-session-server";

import { useOrdersContext } from "@/context/order-context/orders-context";
import { GetAllOrders } from "@/lib/owners-tools/owners-tools-server";
import { useErrorContext } from "@/context/error-context";

export default function OwnerHeader() {
  const { login, setLoggedIn, setLogin } = useOwnerContext();
  const { setOrders } = useOrdersContext();
  const { setErrorMessage, setError } = useErrorContext();

  const [date, setDate] = useState(new Date());
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  useEffect(() => {
    async function Refresher() {
      if (Object.keys(login).length !== 0) {
        const [, payloadBase64] = login.accessToken.split(".");
        const decodedPayload = Buffer.from(payloadBase64, "base64").toString(
          "utf-8"
        );
        const subject = JSON.parse(decodedPayload);

        const exp = subject.exp * 1000;

        const loginDate = new Date();
        const hours = loginDate.getHours();
        if (exp < Date.now() && hours > 23) {
          OwnerLogout(login.accessToken);
          setLoggedIn(false);
          DeleteCookies();
        } else if (exp - Number(Date.now()) < 60000) {
          try {
            StoreLogin(await Refresh());
            setLogin(await GetLogin());
            setOrders(await GetAllOrders(login.accessToken));
          } catch (error) {
            setErrorMessage(`${error}`);
            setError(true);
          } finally {
            setDate(new Date());
          }
        } else {
          setLoggedIn(false);
        }
      }
    }

    const tokenRefresh = setInterval(() => Refresher(), 1000 * 60);

    return () => {
      clearInterval(tokenRefresh);
    };
  }, [
    login,
    login.accessToken,
    login.refreshToken,
    setError,
    setErrorMessage,
    setLoggedIn,
    setLogin,
    setOrders,
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
