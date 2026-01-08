import { useOrdersContext } from "@/context/order-context/orders-context";
import Card from "../../ui/cards/card";
import classes from "./orders-by-customer-phone.module.css";
import OrderSummary from "../order-summary/order-summary";
import { useDisplayContext } from "@/context/display-context";

export default function OrdersByCustomerPhone() {
  const { customerOrders } = useOrdersContext();
  const { setShowCustomerOrders } = useDisplayContext();

  return (
    <div className={classes.customerOrders}>
      <Card expand={true}>
        <div className={classes.orderSummary}>
          <h3>
            {"Orders for phone number: "} {customerOrders[0].phone}
          </h3>
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
          <button
            className={classes.close}
            onClick={() => {
              setShowCustomerOrders(false);
            }}
          >
            Close
          </button>
        </div>
      </Card>
    </div>
  );
}
