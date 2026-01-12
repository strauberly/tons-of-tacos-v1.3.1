import classes from "../../selectors/add-to-order/add-order-item.module.css";
import { useDisplayContext } from "@/context/display-context";
import { useModalContext } from "@/context/menu-context/modal-context";
import { useEditOrderContext } from "@/context/order-context/edit-order-context";
import { useOwnerContext } from "@/context/owner-context";
import {
  AddToOwnerOrder,
  GetOwnerOrder,
} from "@/lib/owners-tools/owners-tools-client";
import { useCartContext } from "@/context/cart-context";
import { useRef } from "react";
import { GetOrderByID } from "@/lib/owners-tools/owners-tools-server";
import { useOrdersContext } from "@/context/order-context/orders-context";

export default function AddToOrderButton(props: {
  orderUid: string;
  menuItem: MenuItem;
  quantity: number;
  customerName: string;
  size: string;
  price: string;
  setItemName: (item: string) => void;
  setReadyToAdd: (readyToAdd: boolean) => void;
  reset: (component: string) => void;
  setSizeValid: (sizeValid: boolean) => void;
  setSubmitted: (submitted: boolean) => void;
}) {
  const { setShowConfirmation } = useDisplayContext();
  const { setConfirmationTitle } = useModalContext();
  const { orderToView } = useModalContext();
  const { login } = useOwnerContext();
  const { ownerOrder, setOrder, order } = useOrdersContext();
  const { setCart, cart } = useCartContext();
  const { setOrderToView } = useModalContext();

  const {
    setMenuItem,
    setQuantity,
    setCustomerName,
    setMenuItemSize,
    setItemSize,
  } = useEditOrderContext();

  const itemInOrder = useRef<boolean>(false);

  function orderCheck() {
    console.log(order);

    if (ownerOrder) {
      setCart(GetOwnerOrder());
      try {
        cart.forEach((cartItem) => {
          if (
            cartItem.itemName === props.menuItem.itemName &&
            cartItem.size === props.size
          ) {
            itemInOrder.current = true;
            props.setSizeValid(false);
            props.reset("addButton");
          }
        });
      } catch (error) {
        throw new Error(`${error}`);
      }
    } else {
      try {
        orderToView.orderItems.forEach((orderItem) => {
          if (
            orderItem.itemName === props.menuItem.itemName &&
            orderItem.size === props.size
          ) {
            itemInOrder.current = true;
            props.setSizeValid(false);
            props.reset("addButton");
          }
        });
      } catch (error) {
        throw new Error(`${error}`);
      }
    }
  }

  function proceed() {
    if (!itemInOrder.current) {
      setShowConfirmation(true);
      setConfirmationTitle("Add To Order");
    }
    props.reset("addButton");
  }

  function checkOrderContext() {
    orderCheck();
    if (ownerOrder && itemInOrder.current === false) {
      return [
        AddToOwnerOrder(
          `${props.menuItem.itemName}_${props.size}`,

          props.menuItem.id,
          props.menuItem.itemName,
          props.quantity,
          props.size,

          props.price
        ),
        props.reset("addButton"),
        setCart(GetOwnerOrder()),
      ];
    } else if (!ownerOrder) {
      return [
        setMenuItem(props.menuItem),
        setQuantity(props.quantity),
        setCustomerName(props.customerName),
        setMenuItemSize(props.menuItem.itemSize),
        setItemSize(props.size),
        props.setReadyToAdd(false),
        props.setItemName("Item"),
        proceed(),
      ];
    }
  }

  const orderReqRes = useRef<OrderRequestResponse>({
    status: 0,
    body: "",
  });

  return (
    <>
      <button
        className={classes.addItemButton}
        disabled={
          itemInOrder.current === true ||
          (props.size !== "S" &&
            props.size !== "M" &&
            props.size !== "L" &&
            props.size !== "NA")
        }
        onClick={async () => {
          props.setSubmitted(true);
          if (itemInOrder.current === true) {
            itemInOrder.current = false;
            props.reset("addButton");
          }
          setOrder(GetOwnerOrder());

          orderCheck();
          checkOrderContext();
          props.reset("addButton");

          if (!ownerOrder) {
            orderReqRes.current = await GetOrderByID(
              orderToView.orderUid,
              login.accessToken
            );
            setOrderToView(orderReqRes.current.body as Order);
            props.reset("addButton");
          }
        }}
      >
        Add Item
      </button>
    </>
  );
}
