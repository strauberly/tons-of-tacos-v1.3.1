import { useOwnerContext } from "@/context/session-context/owner-context";
import classes from "./editables.module.css";
import { useModalContext } from "@/context/menu-context/modal-context";
import { checkName } from "@/lib/customer-form";
import { UpdateCustomerName } from "@/lib/owners-tools/owners-tools-customers/edit-customer-server";
import { useRef, useState } from "react";
import { useOrdersContext } from "@/context/order-context/orders-context";
import { GetAllOrders } from "@/lib/owners-tools/owners-tools-server";
import { useDisplayContext } from "@/context/display-context";

export default function CustomerNameDetails() {
  const { orderToView, setOrderToView } = useModalContext();
  const { login } = useOwnerContext();
  const { setOrders } = useOrdersContext();
  const { setShowModal } = useDisplayContext();
  const { setModalMessage } = useModalContext();

  const orderRef = useRef<Order>(orderToView);

  const customerNameRef = useRef<string>(orderToView.name);

  const firstNameRef = useRef<string>(
    orderRef.current.name.substring(0, orderRef.current.name.indexOf(" "))
  );

  const lastNameRef = useRef(
    orderRef.current.name.substring(
      orderRef.current.name.indexOf(" ") + 1,
      orderRef.current.name.length
    )
  );

  const [currentFirstName, setCurrentFirstName] = useState<string>(
    firstNameRef.current
  );

  const [currentLastName, setCurrentLastName] = useState<string>(
    lastNameRef.current
  );

  const [nameEdited, setNameEdited] = useState<boolean>(false);
  const [editName, setEditName] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);

  const [firstNameValid, setFirstNameValid] = useState<boolean>(true);
  const [lastNameValid, setLastNameValid] = useState<boolean>(true);

  const response = useRef<UpdateCustomerResponse>({ status: 0, body: "" });
  const firstNameValidRef = useRef("true");
  const lastNameValidRef = useRef("true");

  const [errors, setErrors] = useState({
    firstNameError: "Change first name or cancel.",
    lastNameError: "Change last name or cancel.",
  });

  function validateFirstName(event: React.ChangeEvent<HTMLInputElement>) {
    firstNameValidRef.current = event.target.value;
    setFirstNameValid(checkName(firstNameValidRef.current).valid);
    setErrors({
      ...errors,
      firstNameError: `${
        "First " + checkName(firstNameValidRef.current).message
      }`,
    });
  }

  function validateLastName(event: React.ChangeEvent<HTMLInputElement>) {
    lastNameValidRef.current = event.target.value;
    setLastNameValid(checkName(lastNameValidRef.current).valid);
    setErrors({
      ...errors,
      lastNameError: `${"Last " + checkName(lastNameValidRef.current).message}`,
    });
  }

  function updateFirstName(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.value;
    setCurrentFirstName(name.charAt(0).toUpperCase() + name.slice(1));
    validateFirstName(e);
    setNameEdited(true);
  }
  function updateLastName(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.value;
    setCurrentLastName(name.charAt(0).toUpperCase() + name.slice(1));
    validateLastName(e);
    setNameEdited(true);
  }

  function updateCustomerName(resp: CustomerOrdersResponse) {
    setModalMessage(`${resp.body}`);
    setShowModal(true);
  }

  return (
    <div className={classes.editableDetails}>
      <p className={classes.editableDetailsTitle}>Name:</p>
      <p>{`${currentFirstName + " " + currentLastName}`}</p>

      {editName && (
        <div>
          <input
            className={` 
                    ${firstNameValid ? classes.valid : classes.invalid} `}
            placeholder={`${firstNameRef.current}`}
            type="text"
            id="first_name"
            name="first_name"
            maxLength={17}
            required
            value={currentFirstName}
            onChange={updateFirstName}
          />

          {!firstNameValid && (
            <p className={classes.error}>{errors.firstNameError}</p>
          )}
          <input
            className={` 
                    ${lastNameValid ? classes.valid : classes.invalid}`}
            placeholder={`${lastNameRef.current}`}
            type="text"
            id="last_name"
            name="last_name"
            maxLength={17}
            required
            value={currentLastName}
            onChange={updateLastName}
          />
          {!lastNameValid && (
            <p className={classes.error}>{errors.lastNameError}</p>
          )}
        </div>
      )}
      {editName == false && (
        <button
          disabled={orderToView.ready !== "no" || orderToView.closed !== "no"}
          onClick={() => setEditName(!editName)}
        >
          Edit Name
        </button>
      )}
      {editName == true && (
        <button
          onClick={() => [
            setCurrentFirstName(
              orderToView.name.substring(0, orderToView.name.indexOf(" "))
            ),
            setCurrentLastName(
              orderToView.name.substring(
                orderToView.name.indexOf(" ") + 1,
                orderToView.name.length
              )
            ),
            setEditName(false),
          ]}
        >
          Cancel
        </button>
      )}
      {editName == true &&
        nameEdited == true &&
        firstNameValid == true &&
        lastNameValid == true && (
          <button
            onClick={async () => [
              (response.current = await UpdateCustomerName(
                orderToView.customerUid,
                `${currentFirstName + " " + currentLastName}`,
                login.accessToken
              )),
              updateCustomerName(response.current),
              setOrderToView({
                orderUid: orderToView.orderUid,
                customerUid: orderToView.customerUid,
                name: `${currentFirstName}` + " " + `${currentLastName}`,
                email: orderToView.email,
                phone: orderToView.phone,
                orderTotal: orderToView.orderTotal,
                orderItems: orderToView.orderItems,
                created: orderToView.created,
                ready: orderToView.ready,
                closed: orderToView.closed,
              }),
              setEditName(!editName),
              setFirstNameValid(true),
              setLastNameValid(true),
              setUpdate(!update),
              (customerNameRef.current =
                `${currentFirstName}` + " " + `${currentLastName}`),
              setOrders(await GetAllOrders(login.accessToken)),
            ]}
          >
            Done
          </button>
        )}
    </div>
  );
}
