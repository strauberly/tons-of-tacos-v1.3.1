import { useOrdersContext } from "@/context/orders-context";
import Card from "../ui/cards/card";
import classes from "./orders-by-customer.module.css";
import OrderSummary from "./order-view/order-summary";
import Order from "../owner-dashboard/order";

export default function OrdersByCustomer() {
  const { customerOrders } = useOrdersContext();

  return (
    <div className={classes.customerOrders}>
      <Card expand={true}>
        <div className={classes.orderSummary}>
          <h3>{customerOrders[0].name}</h3>
          <ul>
            {customerOrders.map(
              (order: {
                orderUid: string;
                customerUid: string;
                name: string;
                email: string;
                phone: string;
                orderTotal: number;
                orderItems: OrderItem[];
                created: string;
                ready: string;
                closed: string;
              }) => (
                <OrderSummary key={order.orderUid} order={order} />
              )
            )}
          </ul>
        </div>
      </Card>
    </div>
  );
}
