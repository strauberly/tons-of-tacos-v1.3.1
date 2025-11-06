import classes from "./order-item.module.css";
import { useEffect, useRef, useState } from "react";
import RemoveFromOrderButton from "../ui/buttons/order-edit/remove-from-order-button";
import UpdateOrderItemButton from "../ui/buttons/order-edit/update-order-item-button";
import SizeSelector from "../ui/selectors/size-selector/size-selector";
import { useEditOrderContext } from "@/context/edit-order-context";
import { useModalContext } from "@/context/modal-context";
import QuantitySelector from "../ui/selectors/quantity-selector/quantity-selector";

export default function OrderItem(orderItem: { orderItem: OrderItem }) {
  const { setOrderItem, setQuantity, quantity } = useEditOrderContext();
  const { orderToView } = useModalContext();

  const [canEdit, setCanEdit] = useState(false);
  const [edited, setEdited] = useState<boolean>(false);
  const [newSize, setNewSize] = useState<string>(orderItem.orderItem.size);
  const [showSizeError, setShowSizeError] = useState<boolean>(false);
  const [newPrice, setNewPrice] = useState<number>(orderItem.orderItem.total);

  const newQuantity = useRef<number>(orderItem.orderItem.quantity);

  const sizeError: string =
    "Enter 'S' for small, 'M' for medium or 'L' for large.";

  const basePrice =
    Number(orderItem.orderItem.total) / orderItem.orderItem.quantity;

  function sizeDisplay() {
    if (
      orderItem.orderItem.size.toUpperCase() !== "S" &&
      orderItem.orderItem.size.toUpperCase() !== "M" &&
      orderItem.orderItem.size.toUpperCase() !== "L"
    ) {
      return "na";
    } else {
      return orderItem.orderItem.size.toUpperCase();
    }
  }

  function updatePrice() {
    let adjPrice = 0;
    let surcharge = 0;
    let oldSurcharge = 0;

    if (orderItem.orderItem.size === "M") {
      oldSurcharge = 0.5;
    } else if (orderItem.orderItem.size === "L") {
      oldSurcharge = 1;
    }

    if (newSize === "M") {
      surcharge = 0.5;
    } else if (newSize === "L") {
      surcharge = 1;
    }

    adjPrice = (basePrice - oldSurcharge + surcharge) * newQuantity.current;

    return adjPrice;
  }

  const decrement = () => {
    setQuantity((newQuantity.current -= 1));
    if (quantity < 2) {
      newQuantity.current = 1;
      setQuantity(newQuantity.current);
    } else {
      setNewPrice(updatePrice());
    }
  };

  const increment = () => {
    setQuantity((newQuantity.current += 1));
    setEdited(true);
    setNewPrice(updatePrice());
  };

  useEffect(() => {
    function updatePrice() {
      let adjPrice = 0;
      let surcharge = 0;
      let oldSurcharge = 0;

      if (orderItem.orderItem.size === "M") {
        oldSurcharge = 0.5;
      } else if (orderItem.orderItem.size === "L") {
        oldSurcharge = 1;
      }

      if (newSize === "M") {
        surcharge = 0.5;
      } else if (newSize === "L") {
        surcharge = 1;
      }

      adjPrice = (basePrice - oldSurcharge + surcharge) * newQuantity.current;

      return adjPrice;
    }
    if (edited) {
      setNewPrice(updatePrice());
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
              oldValue={orderItem.orderItem.quantity}
              increment={increment}
              decrement={decrement}
              setEdited={setEdited}
            />

            {!canEdit && orderItem.orderItem.size === "na" && (
              <p className={classes.size}> {orderItem.orderItem.size}</p>
            )}
            {!canEdit && orderItem.orderItem.size !== "na" && (
              <p className={classes.size}>{orderItem.orderItem.size}</p>
            )}

            {canEdit === true && orderItem.orderItem.size === "na" && (
              <p className={classes.size}>{orderItem.orderItem.size}</p>
            )}

            {newSize.toUpperCase() !== "NA" && canEdit && (
              <SizeSelector
                itemSize={orderItem.orderItem.size}
                setShowSizeError={setShowSizeError}
                setNewSize={setNewSize}
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
            ]}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
