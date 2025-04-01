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
  return (
    <li>
      <p>{`${props.orderUid}`}</p>
      <p>{`${props.name}`}</p>
      <p>{`${props.phone}`}</p>
      <p>{`${props.email}`}</p>
      <p>{`${props.orderTotal}`}</p>
      <p>{`${props.created}`}</p>
      <p>{`${props.ready}`}</p>
      <p>{`${props.closed}`}</p>
      <button>view</button>
    </li>
  );
}
