import { useOwnerContext } from "@/context/owner-context";
import { DailySales } from "@/lib/owners-tools/owners-tools";
import { useEffect, useState } from "react";

export default function DailySalesDisplay() {
  const [sales, setSales] = useState<Sales | undefined>();
  const { login } = useOwnerContext();

  useEffect(() => {
    async function Sales() {
      setSales(await DailySales(login.accessToken));
    }
    Sales();
    setInterval(Sales, 3000);
  }, [login.accessToken]);

  return (
    <div>
      <h1>Sales For Today: {sales?.numberOfSales}</h1>
      <h1>Total: ${sales?.total.toFixed(2)}</h1>
    </div>
  );
}
