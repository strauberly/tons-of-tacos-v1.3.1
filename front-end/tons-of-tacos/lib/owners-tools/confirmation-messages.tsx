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

export function MessageSelector(props: {
  title: string;
  orderUid: string;
  name: string;
}) {
  let message: string;
  switch (props.title) {
    case "Delete":
      message = DeleteMessage(props.orderUid, props.name);
      return message;
    case "Add To Order":
      message = AddToOrderMessage();
  }
}
