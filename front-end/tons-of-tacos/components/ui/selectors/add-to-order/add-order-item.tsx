"use client";

// import MenuItemSelector from "./menu-item-selector";
// import MenuItemSelector from "../ui/selectors/menu-item-selector/menu-item-selector";
import MenuItemSelector from "../menu-item-selector/menu-item-selector";
import { useEffect, useRef, useState } from "react";
// import ArrowIcon from "../quantity-selector/quantity-selector";
import ArrowIcon from "../quantity-selector/arrow-icon";
import { useModalContext } from "@/context/modal-context";
// import AddToOrderButton from "../ui/buttons/order-edit/add-to-order-button";
import AddToOrderButton from "../../buttons/order-edit/add-to-order-button";
import { useOrdersContext } from "@/context/orders-context";
import { useOwnerContext } from "@/context/owner-context";
import classes from "./add-order-item.module.css";
import QuantitySelector from "../quantity-selector/quantity-selector";
// import MenuItemSelector from "../menu-item-selector/menu-item-selector-copy";

export default function AddOrderItem() {
  const { orderToView, setOrderToView } = useModalContext();
  const { ownerOrder } = useOwnerContext();
  const [itemSelector, setItemSelector] = useState<boolean>(false);
  const [itemName, setItemName] = useState<string>("Item");
  const [quantity, setQuantity] = useState<number>(1);
  const [size, setSize] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [readyToAdd, setReadyToAdd] = useState<boolean>(false);
  const sizeError: string =
    "Enter 'S' for small, 'M' for medium or 'L' for large.";
  const [showSizeError, setShowSizeError] = useState<boolean>(false);

  const [sizeValid, setSizeValid] = useState<boolean>(false);
  const [edited, setEdited] = useState<boolean>(false);
  console.log(orderToView.name);

  const sizeRef = useRef<string>(size);

  const [item, setItem] = useState<MenuItem>({
    id: "",
    itemName: "",
    category: "",
    imageUrl: "",
    description: "",
    itemSize: "",
    unitPrice: 0,
  });

  const itemNameSetter = (name: string) => {
    setItemName(name);
  };

  const itemSetter = (item: MenuItem) => {
    setItem(item);
  };
  // call from lib
  function calcPrice() {
    let adjPrice: number;
    let sizeSurcharge = 0;

    if (sizeRef.current === "M") {
      sizeSurcharge = 0.5;
    } else if (sizeRef.current === "L") {
      sizeSurcharge = 1.0;
    }

    // eslint-disable-next-line prefer-const
    adjPrice = (sizeSurcharge + item?.unitPrice) * quantity;
    return adjPrice;
  }

  const decrement = () => {
    setQuantity(quantity - 1);
    if (quantity <= 1) {
      setQuantity(1);
    }
    setPrice(calcPrice());
  };

  const increment = () => {
    setQuantity(quantity + 1);
    // if (quantity >= 10) {
    //   setQuantity(10);
    // }
    setPrice(calcPrice());
  };

  function checkSize(event: React.ChangeEvent<HTMLInputElement>) {
    sizeRef.current = event.currentTarget.value.toUpperCase();
    setSize(event.target.value.toUpperCase());
    console.log("item size: " + item.itemSize);
    if (
      sizeRef.current !== "S" &&
      sizeRef.current !== "M" &&
      sizeRef.current !== "L"
    ) {
      setShowSizeError(true);
      setSizeValid(false);
    } else {
      setSizeValid(true);
      setShowSizeError(false);
      setSize(sizeRef.current);
    }
  }

  function reset() {
    setQuantity(1);
    setItem({
      id: "",
      itemName: "",
      category: "",
      imageUrl: "",
      description: "",
      itemSize: "",
      unitPrice: 0,
    });
    setItemSelector(false);
  }

  // need an owner order context check

  useEffect(() => {
    console.log(ownerOrder);
    function calcPrice() {
      let adjPrice: number;
      let sizeSurcharge = 0;

      if (size === "M") {
        sizeSurcharge = 0.5;
      } else if (size === "L") {
        sizeSurcharge = 1.0;
      }
      // eslint-disable-next-line prefer-const
      adjPrice = (sizeSurcharge + item?.unitPrice) * quantity;
      return adjPrice;
    }
    setPrice(calcPrice());
  }, [item?.unitPrice, ownerOrder, price, quantity, size]);

  return (
    <>
      <div className={classes.addItemToOrder}>
        <div className={classes.titles}>
          <button
            // disabled={orderToView.ready !== "no" || orderToView.closed !== "no"}
            onClick={() => setItemSelector(!itemSelector)}
          >
            Select Item
          </button>
          <h3>Quantity</h3>
          <h3>Size </h3>
          <h3>Total</h3>
        </div>
        <div className={classes.values}>
          <p>{item?.itemName}</p>
          <QuantitySelector
            value={quantity}
            increment={increment}
            decrement={decrement}
            setEdited={setEdited}
            scale="scale(.75)"
          />
          {/* <div className={classes.quantity}>
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
              disabled={true}
              value={quantity}
            />
            <button
              className={`${classes.increment}`}
              onClick={() => increment()}
            >
              <ArrowIcon scale={"scale(.75)"} />
            </button>
          </div> */}

          <div className={classes.size}>
            {`${item.itemSize}` === "a" && (
              <input
                className={`${
                  sizeValid == false ? classes.invalid : classes.valid
                }`}
                name="size"
                id="size"
                type="text"
                maxLength={1}
                style={{ textTransform: "uppercase" }}
                onChange={checkSize}
              />
            )}
            {`${item.itemSize}` === "na" && <p>{item.itemSize}</p>}
          </div>

          {showSizeError === true && (
            <p className={classes.sizeWarning}>{sizeError}</p>
          )}

          <p className={classes.total}>${price.toFixed(2)}</p>
        </div>
      </div>
      <div className={classes.tail}>
        <div className={classes.addItemButton}>
          {readyToAdd && (
            <AddToOrderButton
              orderUid={orderToView.orderUid}
              menuItem={item}
              quantity={quantity}
              customerName={orderToView.name}
              size={size}
              price={price.toFixed(2)}
              setItemName={setItemName}
              setReadyToAdd={setReadyToAdd}
              reset={reset}
            />
          )}
        </div>

        {itemSelector && (
          // <MenuItemSelector
          //   setItemName={itemNameSetter}
          //   setItem={itemSetter}
          //   itemName={itemName}
          //   setItemSelector={setItemSelector}
          //   setReadyToAdd={setReadyToAdd}
          //   setPrice={setPrice}
          //   setSize={setSize}
          // />
          <MenuItemSelector
            setItemName={itemNameSetter}
            setItem={itemSetter}
            itemName={itemName}
            setItemSelector={setItemSelector}
            setReadyToAdd={setReadyToAdd}
            setPrice={setPrice}
            setSize={setSize}
          />
        )}
      </div>
    </>
  );
}
