import { useErrorContext } from "@/context/error-context";
import { useOwnerContext } from "@/context/order-context/owner-context";
import {
  GetLogin,
  nextCookiePresent,
} from "@/lib/owner-session/owner-session-server";
import { DailySales } from "@/lib/owners-tools/owners-tools-server";
import { useEffect, useState } from "react";

export default function DailySalesDisplay() {
  const [sales, setSales] = useState<Sales>({
    date: "",
    numberOfSales: 0,
    total: 0,
  });
  const { login, loggedIn, setLogin } = useOwnerContext();
  const { setError, setErrorMessage } = useErrorContext();

  useEffect(() => {
    async function Sales() {
      try {
        if (loggedIn) {
          setSales(await DailySales(login.accessToken));
        } else {
          nextCookiePresent();
          setLogin(await GetLogin());
          setSales(await DailySales(login.accessToken));
        }
      } catch (error) {
        setErrorMessage(`${error}`);
        setError(true);
      }
    }
    const dailySales = setInterval(() => Sales(), 3000);
    return () => {
      clearInterval(dailySales);
    };
  }, [loggedIn, login.accessToken, setError, setErrorMessage, setLogin]);

  return (
    <div>
      <h1>Sales For Today: {sales?.numberOfSales}</h1>
      <h1>Total: ${sales?.total.toFixed(2)}</h1>
    </div>
  );
}
