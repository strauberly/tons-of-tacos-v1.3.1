import classes from "./order-item.module.css";
import { useEffect, useRef, useState } from "react";
import RemoveFromOrderButton from "../ui/buttons/order-edit/remove-from-order-button";
import ArrowIcon from "../menu/menu-items/quantity-selector/arrow-icon";
import UpdateOrderItemButton from "../ui/buttons/order-edit/update-order-item-button";
// import SizeSelector from "./size-selector";
import SizeSelector from "../ui/selectors/size-selector/size-selector";
import { calcPrice } from "@/lib/owners-tools/owners-tools-client";
import { useEditOrderContext } from "@/context/edit-order-context";
import { useModalContext } from "@/context/modal-context";
import { GetOrderByID } from "@/lib/owners-tools/owners-tools";
import { useOwnerContext } from "@/context/owner-context";

export default function OrderItem(orderItem: { orderItem: OrderItem }) {
  const { setOrderItem, setQuantity, quantity, orderChanged } =
    useEditOrderContext();
  const { orderToView, setOrderToView } = useModalContext();
  const { login } = useOwnerContext();
  const [canEdit, setCanEdit] = useState(false);
  // const [newQuantity, setNewQuantity] = useState<number>(
  //   orderItem.orderItem.quantity
  // );

  const [edited, setEdited] = useState<boolean>(false);

  const [newSize, setNewSize] = useState<string>(orderItem.orderItem.size);

  const [showSizeError, setShowSizeError] = useState<boolean>(false);
  const sizeError: string =
    "Enter 'S' for small, 'M' for medium or 'L' for large.";
  const [newPrice, setNewPrice] = useState<number>(orderItem.orderItem.total);
  const newQuantity = useRef<number>(orderItem.orderItem.quantity);
  const price = useRef<number>(orderItem.orderItem.total);

  const basePrice =
    Number(orderItem.orderItem.total) / orderItem.orderItem.quantity;

  function checkQuantity(number: number) {
    console.log(number);
    if (number.toString() === "NaN") {
      // setNewQuantity(number);
      newQuantity.current = number;
    } else if (number < 1) {
      // setNewQuantity(1);
      newQuantity.current = 1;
    } else if (number > 10) {
      // setNewQuantity(10);
      newQuantity.current = 10;
    } else {
      // setNewQuantity(number);
      newQuantity.current = number;
    }
  }

  // function changedPrice() {
  //   // let itemPrice;

  //   if (orderChanged === false) {
  //     return setNewPrice(orderItem.orderItem.total);
  //   } else {
  //     return setNewPrice(
  //       calcPrice(
  //         orderItem.orderItem.total / orderItem.orderItem.quantity -
  //           calcSurcharge(orderItem.orderItem.size),
  //         newSize,
  //         newQuantity
  //       )
  //     );
  //   }
  // }

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

  // function calcSurcharge(size: string) {
  //   let surcharge: number = 0.0;
  //   if (size === "M") {
  //     surcharge = 0.5;
  //   } else if (size === "L") {
  //     surcharge = 1.0;
  //   }
  //   return surcharge;
  // }

  function updatePrice() {
    let adjPrice = 0;
    let surcharge = 0;
    let oldSurcharge = 0;

    // if (props.size === "M") {
    if (orderItem.orderItem.size === "M") {
      oldSurcharge = 0.5;
      // } else if (props.size === "L") {
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
      // setEdited(true);
    } else {
      setNewPrice(updatePrice());
    }
  };

  // const decrement = () => {
  //   // if (newQuantity.current <= 1) {
  //   //   newQuantity.current = 1;
  //   //   setQuantity(newQuantity.current);
  //   //   // setNewQuantity(1);
  //   // }
  //   // // setNewQuantity(newQuantity - 1);
  //   if (newQuantity.current < 2) {
  //     newQuantity.current = 1;
  //     // setNewQuantity(1);
  //   } else {
  //     newQuantity.current = newQuantity.current - 1;
  //     setQuantity(newQuantity.current);
  //     console.log(newQuantity.current);
  //   }

  //   price.current = calcPrice(
  //     orderItem.orderItem.total / orderItem.orderItem.quantity -
  //       calcSurcharge(orderItem.orderItem.size),
  //     newSize,
  //     newQuantity.current
  //   );
  //   // );
  //   // price.current = newPrice;
  //   if (newQuantity.current < 2) {
  //     newQuantity.current = 1;
  //     // setNewQuantity(1);
  //   }
  // };

  const increment = () => {
    setQuantity((newQuantity.current += 1));
    // if (quantity >= 10 && !loggedIn) {
    //   setModal(
    //     "The limit for this item is 10. If you need more please give us a call so we can try to accommodate your order. Thanks!"
    //   );
    //   setShowModal(true);
    //   setQuantity(10);
    // } else if (quantity + cartQuantity > 30 && !loggedIn) {
    //   setModal(
    //     "Your order has grown to a fair size. The current maximum is 30 items. Please contact us before adding anything else. \n\nThis will ensure we can make your order happen today. You can also remove items from your cart. Thank you!"
    //   );
    //   setShowModal(true);
    // } else {
    // }
    setEdited(true);
    setNewPrice(updatePrice());
    // setNewPrice(price.current);
  };

  // const increment = () => {
  //   if (newQuantity.current > 9) {
  //     // setNewQuantity(10);
  //     newQuantity.current = 10;
  //   } else {
  //     // setNewQuantity(newQuantity + 1);
  //     newQuantity.current = newQuantity.current + 1;
  //     setQuantity(newQuantity.current);
  //     console.log(quantity);
  //     // setNewPrice(
  //     price.current = calcPrice(
  //       orderItem.orderItem.total / orderItem.orderItem.quantity -
  //         calcSurcharge(orderItem.orderItem.size),
  //       newSize,
  //       newQuantity.current
  //     );
  //   }

  // );
  // price.current = newPrice;
  // if (newQuantity.current >= 10) {
  //   // setNewQuantity(10);
  //   newQuantity.current = 10;
  // }
  // };

  // useEffect(() => {
  //   // function ChangedPrice() {
  //   //   // let itemPrice;

  //   //   if (orderChanged === false) {
  //   //     return setNewPrice(orderItem.orderItem.total);
  //   //   } else {
  //   //     return setNewPrice(
  //   //       calcPrice(
  //   //         orderItem.orderItem.total / orderItem.orderItem.quantity -
  //   //           calcSurcharge(orderItem.orderItem.size),
  //   //         newSize,
  //   //         newQuantity
  //   //       )
  //   //     );
  //   //   }
  //   // }

  //   // ChangedPrice();
  //   // async function Reset() {
  //   //   // setOrderToView(await GetOrderByID(orderToView.orderUid, login.token));
  //   //   // if (orderChanged) {
  //   //   setNewPrice(
  //   //     calcPrice(
  //   //       orderItem.orderItem.total / orderItem.orderItem.quantity -
  //   //         calcSurcharge(orderItem.orderItem.size),
  //   //       newSize,
  //   //       newQuantity
  //   //     )
  //   //   );
  //   // }
  //   // }
  //   if (orderToView.ready !== "no") {
  //     setCanEdit(false);
  //   }
  //   // Reset();
  // }, [
  //   canEdit,
  //   login.token,
  //   newQuantity,
  //   newSize,
  //   orderChanged,
  //   orderItem.orderItem.quantity,
  //   orderItem.orderItem.size,
  //   orderItem.orderItem.total,
  //   orderToView.orderUid,
  //   orderToView.ready,
  //   setOrderToView,
  // ]);

  useEffect(() => {
    // setCanEdit(canEdit);

    console.log("canEdit: " + canEdit);
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
            <div className={classes.quantity}>
              <button
                className={`${classes.decrement}`}
                onClick={() => decrement()}
              >
                <ArrowIcon scale={"scale(.75)"} />
              </button>
              <input
                name="quantity"
                id="quantity"
                type="number"
                min="1"
                max={1}
                // disabled={newQuantity.current < 2}
                value={newQuantity.current}
                onChange={(e) => checkQuantity(parseInt(e.target.value))}
              />
              <button
                className={`${classes.increment}`}
                onClick={() => increment()}
              >
                <ArrowIcon scale={"scale(.75)"} />
              </button>
            </div>

            {!canEdit && orderItem.orderItem.size === "na" && (
              <p className={classes.size}> {orderItem.orderItem.size}</p>
            )}
            {!canEdit && orderItem.orderItem.size !== "na" && (
              <p className={classes.size}>{orderItem.orderItem.size}</p>
            )}
            {/* {!canEdit && } */}
            {canEdit === true && orderItem.orderItem.size === "na" && (
              <p className={classes.size}>{orderItem.orderItem.size}</p>
            )}

            <div>
              {newSize.toUpperCase() !== "NA" && (
                <SizeSelector
                  itemSize={orderItem.orderItem.size}
                  setShowSizeError={setShowSizeError}
                  setNewSize={setNewSize}
                />
              )}
            </div>
          </>
        )}
        {!canEdit && <p>{`${orderItem.orderItem.quantity}`}</p>}
        {!canEdit && <p>{`${sizeDisplay()}`}</p>}
        {/* {!canEdit && <p>{`${sizeDisplay()}`}</p>} */}
        {/* <p> {`$${changedPrice()}`}</p> */}
        {/* <p> {`$${price.current.toFixed(2)}`}</p> */}
        <p> {`$${newPrice.toFixed(2)}`}</p>
        {/* wrap and style */}
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
                // setNewPrice(orderItem.orderItem.total),
                // setQuantity(newQuantity),
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
              setNewPrice(newPrice),
              setShowSizeError(false),
              // (price.current = orderItem.orderItem.total),
              // setNewPrice(price.current),
            ]}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
