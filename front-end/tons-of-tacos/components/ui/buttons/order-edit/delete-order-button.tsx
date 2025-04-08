import { useDisplayContext } from "@/context/display-context";
import { useModalContext } from "@/context/modal-context";

export default function DeleteOrderButton(props: { order: Order }) {
  const { setShowConfirmation } = useDisplayContext();
  const { setOrderToView, setConfirmationTitle } = useModalContext();

  return (
    <button
      onClick={() => [
        setShowConfirmation(true),
        setConfirmationTitle("Delete"),
        setOrderToView(props.order),
      ]}
    >
      Delete
    </button>
  );
}
