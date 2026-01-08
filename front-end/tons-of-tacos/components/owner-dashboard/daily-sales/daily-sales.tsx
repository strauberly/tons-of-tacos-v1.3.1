import { useOwnerContext } from "@/context/order-context/owner-context";
import { DailySales } from "@/lib/owners-tools/owners-tools-server";
import { useEffect, useState } from "react";

export default function DailySalesDisplay() {
  const [sales, setSales] = useState<Sales>({
    date: "",
    numberOfSales: 0,
    total: 0,
  });
  const { login, loggedIn } = useOwnerContext();

  useEffect(() => {
    async function Sales() {
      if (loggedIn) {
        setSales(await DailySales(login.accessToken));
      }
    }
    const dailySales = setInterval(() => Sales(), 3000);
    return () => {
      clearInterval(dailySales);
    };
  }, [loggedIn, login.accessToken]);

  return (
    <div>
      <h1>Sales For Today: {sales?.numberOfSales}</h1>
      <h1>Total: ${sales?.total.toFixed(2)}</h1>
    </div>
  );
}
