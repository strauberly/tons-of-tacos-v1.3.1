import { useEffect, useRef, useState } from "react";
import { useEditOrderContext } from "@/context/edit-order-context";
import { useModalContext } from "@/context/modal-context";
import RemoveFromOrderButton from "../ui/buttons/order-edit/remove-from-order-button";
import UpdateOrderItemButton from "../ui/buttons/order-edit/update-order-item-button";
import SizeSelector from "../ui/selectors/size-selector/size-selector";
import QuantitySelector from "../ui/selectors/quantity-selector/quantity-selector";
import { calcItemTotal } from "@/lib/general/multi-use";
import classes from "./order-item.module.css";

export default function OrderItem(orderItem: { orderItem: OrderItem }) {
  const { setOrderItem, setQuantity, quantity } = useEditOrderContext();
  const { orderToView } = useModalContext();

  const [canEdit, setCanEdit] = useState(false);
  const [edited, setEdited] = useState<boolean>(false);
  const [newSize, setNewSize] = useState<string>(orderItem.orderItem.size);
  const [showSizeError, setShowSizeError] = useState<boolean>(false);
  const [newPrice, setNewPrice] = useState<number>(orderItem.orderItem.total);
  const [sizeError, setSizeError] = useState<string>("");

  const newQuantity = useRef<number>(orderItem.orderItem.quantity);

  const newOrderItem: OrderItem = {
    orderItemId: 0,
    itemName: "",
    quantity: 0,
    size: "",
    total: 0,
  };

  // const sizeError: string =
  //   "Enter 'S' for small, 'M' for medium or 'L' for large.";

  const basePrice =
    Number(orderItem.orderItem.total) / orderItem.orderItem.quantity;

  function sizeDisplay() {
    if (
      orderItem.orderItem.size.toUpperCase() !== "S" &&
      orderItem.orderItem.size.toUpperCase() !== "M" &&
      orderItem.orderItem.size.toUpperCase() !== "L"
    ) {
      return "NA";
    } else {
      return orderItem.orderItem.size.toUpperCase();
    }
  }

  const decrement = () => {
    newQuantity.current = quantity;
    setQuantity((newQuantity.current -= 1));
    if (quantity < 2) {
      newQuantity.current = 1;
      setQuantity(newQuantity.current);
    } else {
      setNewPrice(
        calcItemTotal(
          basePrice,
          orderItem.orderItem.size,
          newSize,
          newQuantity.current
        )
      );
    }
  };

  const increment = () => {
    setQuantity((newQuantity.current += 1));
    setEdited(true);
    setNewPrice(
      calcItemTotal(
        basePrice,
        orderItem.orderItem.size,
        newSize,
        newQuantity.current
      )
    );
  };

  useEffect(() => {
    if (edited) {
      setNewPrice(
        calcItemTotal(
          basePrice,
          orderItem.orderItem.size,
          newSize,
          newQuantity.current
        )
      );
    } else {
      setNewPrice(Number(orderItem.orderItem.total));
    }
  }, [
    newSize,
    basePrice,
    canEdit,
    orderItem.orderItem.size,
    orderItem.orderItem.total,
    edited,
  ]);

  return (
    <div>
      <li>
        <p>{`${orderItem.orderItem.itemName}`}</p>
        {canEdit && (
          <>
            <QuantitySelector
              value={quantity}
              scale="scale(.8)"
              increment={increment}
              decrement={decrement}
              setEdited={setEdited}
            />

            {!canEdit && orderItem.orderItem.size === "NA" && (
              <p className={classes.size}> {orderItem.orderItem.size}</p>
            )}
            {!canEdit && orderItem.orderItem.size !== "NA" && (
              <p className={classes.size}>{orderItem.orderItem.size}</p>
            )}

            {canEdit === true && orderItem.orderItem.size === "NA" && (
              <p className={classes.size}>{orderItem.orderItem.size}</p>
            )}

            {newSize.toUpperCase() !== "NA" && canEdit && (
              <SizeSelector
                itemSize={orderItem.orderItem.size}
                setShowSizeError={setShowSizeError}
                setNewSize={setNewSize}
                setSizeError={setSizeError}
                itemName={orderItem.orderItem.itemName}
                setEdited={setEdited}
                edited={edited}
              />
            )}
          </>
        )}
        {!canEdit && <p>{`${orderItem.orderItem.quantity}`}</p>}
        {!canEdit && <p>{`${sizeDisplay()}`}</p>}
        <p> {`$${newPrice.toFixed(2)}`}</p>
        <div className={classes.alter}>
          {!canEdit && (
            <button
              className={classes.button}
              disabled={
                orderToView.ready !== "no" || orderToView.closed !== "no"
              }
              onClick={() => [
                setCanEdit(!canEdit),
                setOrderItem(orderItem.orderItem),
                setNewPrice(newPrice),
                setQuantity(orderItem.orderItem.quantity),
              ]}
            >
              Edit
            </button>
          )}
          {!canEdit && (
            <RemoveFromOrderButton
              orderItem={orderItem.orderItem}
              orderToView={orderToView}
            />
          )}
        </div>
      </li>
      {showSizeError === true && (
        <p className={classes.sizeWarning}>{sizeError}</p>
      )}
      {canEdit && (
        <div className={classes.update}>
          <UpdateOrderItemButton
            orderItem={orderItem.orderItem}
            newQuantity={newQuantity.current}
            newSize={newSize}
            setCanEdit={setCanEdit}
          />
          <button
            onClick={() => [
              setCanEdit(!canEdit),
              (newQuantity.current = orderItem.orderItem.quantity),
              setQuantity(newQuantity.current),
              setNewSize(orderItem.orderItem.size),
              setNewPrice(newPrice),
              setShowSizeError(false),
              setOrderItem(newOrderItem),
            ]}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
