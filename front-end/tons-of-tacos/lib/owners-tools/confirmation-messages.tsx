export function DeleteMessage(orderUid: string, name: string) {
  const message: string =
    "Are you sure you want to delete order " +
    `${orderUid}` +
    " for customer  " +
    `${name}` +
    "?";
  return message;
}

export function AddToOrderMessage(props: {
  itemName: string;
  quantity: number;
  orderUid: string;
  name: string;
  size: string;
}) {
  const message: string =
    includeSize(props.size) == true
      ? " Add " +
        `${props.itemName}` +
        ` ${props.size}` +
        " x " +
        `${props.quantity}` +
        " to order " +
        `${props.orderUid}` +
        " for customer " +
        `${props.name}` +
        "?"
      : " Add " +
        `${props.itemName}` +
        " x " +
        `${props.quantity}` +
        " to order " +
        `${props.orderUid}` +
        " for customer " +
        `${props.name}` +
        "?";

  return message;
}

export function RemoveFromOrderMessage(props: {
  orderItem: OrderItem;
  orderUid: string;
  name: string;
}) {
  const message: string =
    includeSize(props.orderItem.size) == true
      ? " Remove " +
        `${props.orderItem.itemName}` +
        ` ${props.orderItem.size}` +
        " x " +
        `${props.orderItem.quantity}` +
        " from order " +
        `${props.orderUid}` +
        " for customer " +
        `${props.name}` +
        "?"
      : " Remove " +
        `${props.orderItem.itemName}` +
        " x " +
        `${props.orderItem.quantity}` +
        " from order " +
        `${props.orderUid}` +
        " for customer " +
        `${props.name}` +
        "?";
  return message;
}

export function CustomerUpdateMessage( customer: Customer ) {
  const message: string =
    "Update customer info to: " +
    customer.name +
    " " +
    customer.phone +
    " " +
    customer.email;
  return message;
}

export function UpdateOrderItemMessage(props: {
  orderItem: OrderItem;
  newQuantity: number;
}) {
  const message: string =
    "Update " +
    props.orderItem.itemName +
    " x " +
    `${props.orderItem.quantity},` +
    " to " +
    props.orderItem.itemName +
    " x " +
    props.newQuantity +
    "?";

  return message;
}

function includeSize(size: string) {
  let displaySize: boolean = true;

  if (size !== "S" && size !== "M" && size !== "L") {
    displaySize = false;
  }
  return displaySize;
}
