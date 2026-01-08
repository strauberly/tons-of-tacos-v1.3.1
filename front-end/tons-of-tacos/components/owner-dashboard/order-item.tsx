import classes from "../owner-dashboard/order-item.module.css";
import { useEffect, useRef, useState } from "react";
import { useEditOrderContext } from "@/context/order-context/edit-order-context";
import { useModalContext } from "@/context/menu-context/modal-context";
import RemoveFromOrderButton from "../ui/buttons/order-edit/remove-from-order-button";
import UpdateOrderItemButton from "../ui/buttons/order-edit/update-order-item-button";
import SizeSelector from "../ui/selectors/size-selector/size-selector";
import QuantitySelector from "../ui/selectors/quantity-selector/quantity-selector";
import { calcItemTotal } from "@/lib/multi-use/multi-use";

export default function OrderItem(props: { orderItem: OrderItem }) {
  const { setOrderItem, setQuantity, quantity } = useEditOrderContext();
  const { orderToView } = useModalContext();

  const [canEdit, setCanEdit] = useState(false);
  const [edited, setEdited] = useState<boolean>(false);
  const [newSize, setNewSize] = useState<string>("NA");
  const [showSizeError, setShowSizeError] = useState<boolean>(false);
  const [newPrice, setNewPrice] = useState<number>(props.orderItem.total);
  const [sizeError, setSizeError] = useState<string>("");
  const [, setCanUpdate] = useState(false);

  const newQuantity = useRef<number>(props.orderItem.quantity);

  const newOrderItem: OrderItem = {
    orderItemId: 0,
    itemName: "",
    quantity: 0,
    size: "",
    total: 0,
  };

  const basePrice = Number(props.orderItem.total) / props.orderItem.quantity;

  function sizeDisplay() {
    if (
      props.orderItem.size.toUpperCase() !== "S" &&
      props.orderItem.size.toUpperCase() !== "M" &&
      props.orderItem.size.toUpperCase() !== "L"
    ) {
      return "NA";
    } else {
      return props.orderItem.size.toUpperCase();
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
          props.orderItem.size,
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
        props.orderItem.size,
        newSize,
        newQuantity.current
      )
    );
  };

  const sizeRef = useRef<string[]>([]);
  useEffect(() => {
    orderToView.orderItems.forEach((item) => {
      if (item.itemName === props.orderItem.itemName) {
        sizeRef.current.push(item.size);
      }
      if (
        props.orderItem.size === "NA" ||
        (newSize === props.orderItem.size && newSize !== item.size)
      ) {
        setShowSizeError(false);
      } else if (
        item.itemName === props.orderItem.itemName &&
        item.size === newSize
      ) {
        setSizeError(
          `${
            props.orderItem.itemName + " " + newSize
          } is already in cart. Select a different size or item.`
        );
        setShowSizeError(true);
        setCanUpdate(false);
      }
    });

    setCanUpdate(!sizeRef.current.some((size) => size === newSize));

    if (edited) {
      setNewPrice(
        calcItemTotal(
          basePrice,
          props.orderItem.size,
          newSize,
          newQuantity.current
        )
      );
    } else {
      setNewPrice(Number(props.orderItem.total));
    }
  }, [
    newSize,
    basePrice,
    canEdit,
    props.orderItem.size,
    props.orderItem.total,
    edited,
    orderToView.orderItems,
    props.orderItem.itemName,
  ]);

  return (
    <div>
      <li>
        <p>{`${props.orderItem.itemName}`}</p>
        {canEdit && (
          <>
            <QuantitySelector
              value={quantity}
              scale="scale(.8)"
              increment={increment}
              decrement={decrement}
              setEdited={setEdited}
            />

            {!canEdit && props.orderItem.size === "NA" && (
              <p className={classes.size}> {props.orderItem.size}</p>
            )}
            {!canEdit && props.orderItem.size !== "NA" && (
              <p>{props.orderItem.size}</p>
            )}

            {canEdit === true && props.orderItem.size === "NA" && (
              <p>{props.orderItem.size}</p>
            )}

            {props.orderItem.size.toUpperCase() !== "NA" && canEdit && (
              <SizeSelector
                itemSize={props.orderItem.size}
                setShowSizeError={setShowSizeError}
                setNewSize={setNewSize}
                setSizeError={setSizeError}
                itemName={props.orderItem.itemName}
                setEdited={setEdited}
                edited={edited}
                submitted={false}
                canEdit={canEdit}
                setCanEdit={setCanEdit}
              />
            )}
          </>
        )}
        {!canEdit && <p>{`${props.orderItem.quantity}`}</p>}
        {!canEdit && <p>{`${sizeDisplay()}`}</p>}
        <p> {`$${newPrice.toFixed(2)}`}</p>
      </li>
      {showSizeError === true && (
        <p className={classes.sizeWarning}>{sizeError}</p>
      )}
      {/* rename */}
      <div className={classes.actionButtonGroup}>
        <div className={classes.update}>
          {edited && (
            <UpdateOrderItemButton
              orderItem={props.orderItem}
              newQuantity={newQuantity.current}
              newSize={newSize}
              setEdited={setEdited}
              setCanEdit={setCanEdit}
              setNewSize={setNewSize}
            />
          )}
          {canEdit && (
            <button
              onClick={() => [
                setCanEdit(!canEdit),
                (newQuantity.current = props.orderItem.quantity),
                setQuantity(newQuantity.current),
                setNewSize("NA"),
                setNewPrice(newPrice),
                setShowSizeError(false),
                setOrderItem(newOrderItem),
                setEdited(false),
              ]}
            >
              Cancel
            </button>
          )}
          {!canEdit && (
            <button
              className={classes.button}
              disabled={
                orderToView.ready !== "no" || orderToView.closed !== "no"
              }
              onClick={() => [
                setCanEdit(!canEdit),
                setOrderItem(props.orderItem),
                setNewPrice(newPrice),
                setQuantity(props.orderItem.quantity),
              ]}
            >
              Edit
            </button>
          )}
          {!canEdit && (
            <RemoveFromOrderButton
              orderItem={props.orderItem}
              orderToView={orderToView}
            />
          )}
        </div>
      </div>
    </div>
  );
}
