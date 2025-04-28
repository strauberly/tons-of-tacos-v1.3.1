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
}) {
  const message: string =
    " Add " +
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
    " Remove " +
    `${props.orderItem.itemName}` +
    ` ${props.orderItem.size}` +
    " x " +
    `${props.orderItem.quantity}` +
    " from order " +
    `${props.orderUid}` +
    " for customer " +
    `${props.name}` +
    "?";
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
