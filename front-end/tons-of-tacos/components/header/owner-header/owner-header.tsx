"use client";
import classes from "./owner-header.module.css";
import { useOwnerContext } from "@/context/session-context/owner-context";
import { useEffect, useRef, useState } from "react";
import LogoutButton from "../../ui/buttons/session-buttons/logout/logout";

import {
  DeleteCookies,
  GetCookieExp,
  GetLogin,
  OwnerLogout,
  Refresh,
  RefreshLogin,
} from "@/lib/owner-session/owner-session-server";

import { useOrdersContext } from "@/context/order-context/orders-context";
import { GetAllOrders } from "@/lib/owners-tools/owners-tools-server";
import { useErrorContext } from "@/context/error-context";
import { decrypt } from "@/lib/multi-use/encryption";
import { GetUser, StoreUser } from "@/lib/owner-session/owner-session-client";

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

  const newUser = useRef("");
  const oldUser = useRef("");

  useEffect(() => {
    async function Refresher() {
      const exp = await GetCookieExp(login);
      const loginDate = new Date();
      const hours = loginDate.getHours();
      if (exp > Date.now() && hours > 22) {
        OwnerLogout(login.accessToken);
        setLoggedIn(false);
        DeleteCookies();
      } else if (exp - Number(Date.now()) < 60000) {
        try {
          // oldUser.current = GetUser();
          // get user from session storage -> find cookie and set to context
          // owner name set
          // newUser.current = await RefreshLogin(
          //   await Refresh(GetUser()),
          //   oldUser.current
          // );
          // StoreUser(newUser.current);
          // start here with refreshing user
          RefreshLogin(await Refresh(GetUser()));
          setLogin(await GetLogin(GetUser()));
          setOrders(await GetAllOrders(login.accessToken));
        } catch (error) {
          setErrorMessage(`${error}`);
          setError(true);
          setLoggedIn(false);
        }
        setDate(new Date());
      } else {
        setLoggedIn(false);
      }
    }
    // }

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
      <p> Hola, {decrypt(login.ownerName)}!</p>
      <p>{date.toLocaleTimeString([], { timeStyle: "short" })}</p>
      <p>{date.toLocaleDateString(undefined, options)}</p>
      <LogoutButton />
    </div>
  );
}
