import { useDisplayContext } from "@/context/display-context";
import { useModalContext } from "@/context/modal-context";
import { useEditOrderContext } from "@/context/edit-order-context";
import classes from "../../selectors/add-to-order/add-order-item.module.css";
import { useOwnerContext } from "@/context/owner-context";
import {
  AddToOwnerOrder,
  GetOwnerOrder,
} from "@/lib/owners-tools/owners-tools-client";
import { useCartContext } from "@/context/cart-context";
import { useRef } from "react";
import { GetOrderByID } from "@/lib/owners-tools/owners-tools";

export default function AddToOrderButton(props: {
  orderUid: string;
  menuItem: MenuItem;
  quantity: number;
  customerName: string;
  size: string;
  price: string;
  setItemName: (item: string) => void;
  setReadyToAdd: (readyToAdd: boolean) => void;
  reset: () => void;
  setSizeValid: (sizeValid: boolean) => void;
}) {
  const { setShowConfirmation } = useDisplayContext();
  const { setConfirmationTitle } = useModalContext();
  const { orderToView } = useModalContext();
  const { ownerOrder, setOrder, order, login } = useOwnerContext();
  const { setCart, cart } = useCartContext();
  const { setModal, setOrderToView } = useModalContext();
  const { setShowModal } = useDisplayContext();
  const {
    setMenuItem,
    setQuantity,
    setCustomerName,
    setMenuItemSize,
    setItemSize,
  } = useEditOrderContext();
  console.log(props.quantity);
  console.log("item: " + JSON.stringify(props.menuItem));
  console.log("item size: " + `${props.size}`);

  const itemInOrder = useRef<boolean>(false);

  function orderCheck() {
    console.log(order);

    if (ownerOrder) {
      setCart(GetOwnerOrder());
      cart.forEach((cartItem) => {
        console.log(cartItem.itemName);
        console.log(props.menuItem.itemName);
        console.log(cartItem.size);
        console.log(props.size);

        if (
          cartItem.itemName === props.menuItem.itemName &&
          cartItem.size === props.size
        ) {
          // setModal(
          //   "Item already in order. Update quantity, remove, or choose a different item."
          // );
          // setShowModal(true);
          itemInOrder.current = true;
          props.setSizeValid(false);
          props.reset();
        }
      });
    } else {
      console.log(order);

      orderToView.orderItems.forEach((orderItem) => {
        if (
          orderItem.itemName === props.menuItem.itemName &&
          orderItem.size === props.size
        ) {
          // if (orderItem.itemName === props.menuItem.itemName ) {
          // setModal(
          //   "Item already in order. Update quantity, remove, or choose a different item."
          // );
          // setShowModal(true);
          itemInOrder.current = true;
          props.setSizeValid(false);
          props.reset();
        }
      });
    }
  }

  function proceed() {
    if (!itemInOrder.current) {
      setShowConfirmation(true);
      setConfirmationTitle("Add To Order");
    }
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
        props.reset(),
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
          // props.menuItem.itemName === "" ||
          // props.size === "a" ||
          // itemInOrder.current
          itemInOrder.current === true ||
          (props.size !== "S" &&
            props.size !== "M" &&
            props.size !== "L" &&
            props.size !== "NA")
        }
        onClick={async () => {
          if (itemInOrder.current === true) {
            itemInOrder.current = false;
            props.reset();
          }
          setOrder(GetOwnerOrder());

          orderCheck();
          checkOrderContext();
          props.reset();

          if (!ownerOrder) {
            orderReqRes.current = await GetOrderByID(
              orderToView.orderUid,
              login.accessToken
            );
            setOrderToView(orderReqRes.current.body as Order);
            props.reset();
          }
          props.reset();
        }}
      >
        Add Item
      </button>
    </>
  );
}
