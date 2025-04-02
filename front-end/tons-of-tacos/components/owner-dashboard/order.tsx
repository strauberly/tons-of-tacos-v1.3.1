export default function Order(props: {
  orderUid: string;
  name: string;
  email: string;
  phone: string;
  orderTotal: string;
  created: string;
  ready: string;
  closed: string;
}) {
  const time: string = new Date(props.created).toLocaleTimeString([], {
    timeStyle: "short",
  });
  const date: string = new Date(props.created).toLocaleDateString();

  const total: number = +props.orderTotal;

  return (
    <li>
      <p>{`${props.orderUid}`}</p>
      <p>{`${props.name}`}</p>
      <p>{`${props.phone}`}</p>
      <p>{`${props.email}`}</p>
      <p>{`$${total.toFixed(2)}`}</p>
      <p>{`${time}`}</p>
      <p>{`${date}`}</p>
      <p>{`${props.ready}`}</p>
      <p>{`${props.closed}`}</p>
      <button>view</button>
    </li>
  );
}
