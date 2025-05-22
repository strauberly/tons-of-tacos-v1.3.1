import classes from "./order-view.module.css";
import { useModalContext } from "@/context/modal-context";
import { checkName } from "@/lib/customer-form";
import { useRef, useState } from "react";

export default function CustomerNameDetails() {
  const { orderToView, setOrderToView } = useModalContext();

  const firstName: string = orderToView.name.substring(
    0,
    orderToView.name.indexOf(" ")
  );

  const lastName: string = orderToView.name.substring(
    orderToView.name.indexOf(" ") + 1,
    orderToView.name.length
  );

  const [currentFirstName, setCurrentFirstName] = useState<string>(firstName);
  const [currentLastName, setCurrentLastName] = useState<string>(lastName);
  const [editName, setEditName] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);

  const [firstNameValid, setFirstNameValid] = useState<boolean>(false);
  const [lastNameValid, setLastNameValid] = useState<boolean>(false);

  const firstNameValidRef = useRef("false");
  const lastNameValidRef = useRef("false");

  const [errors, setErrors] = useState({
    firstNameError: "First Name must not be blank",
    lastNameError: "Last Name must not be blank",
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
    setCurrentFirstName(e.target.value);
    validateFirstName(e);
  }
  function updateLastName(e: React.ChangeEvent<HTMLInputElement>) {
    setCurrentLastName(e.target.value);
    validateLastName(e);
  }

  const customerNameRef = useRef<string>(orderToView.name);

  return (
    <div className={classes.editableDetails}>
      <p className={classes.editableDetailsTitle}>Name:</p>
      <p>
        {`${
          currentFirstName.charAt(0).toUpperCase() +
          currentFirstName.substring(1, currentFirstName.length).toLowerCase()
        }` +
          " " +
          `${
            currentLastName.charAt(0).toUpperCase() +
            currentLastName.substring(1, currentLastName.length).toLowerCase()
          }`}
      </p>
      {editName && (
        <div>
          <input
            className={` 
                    ${firstNameValid ? classes.valid : classes.invalid}`}
            placeholder={`${firstName}`}
            type="text"
            id="first_name"
            name="first_name"
            maxLength={17}
            required
            onChange={updateFirstName}
          />

          {!firstNameValid && (
            <p className={classes.error}>{errors.firstNameError}</p>
          )}
          <input
            className={` 
                    ${lastNameValid ? classes.valid : classes.invalid}`}
            placeholder={`${lastName}`}
            type="text"
            id="last_name"
            name="last_name"
            maxLength={17}
            required
            onChange={updateLastName}
          />
          {!lastNameValid && (
            <p className={classes.error}>{errors.lastNameError}</p>
          )}
        </div>
      )}
      {editName == false && (
        <button onClick={() => setEditName(!editName)}>Edit Name</button>
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
        firstNameValid === true &&
        lastNameValid === true && (
          <button
            onClick={() => [
              setOrderToView({
                orderUid: orderToView.orderUid,
                customerUid: orderToView.customerUid,
                name:
                  `${
                    currentFirstName.charAt(0).toUpperCase() +
                    currentFirstName
                      .substring(1, currentFirstName.length)
                      .toLowerCase()
                  }` +
                  " " +
                  `${
                    currentLastName.charAt(0).toUpperCase() +
                    currentLastName
                      .substring(1, currentLastName.length)
                      .toLowerCase()
                  }`,
                email: orderToView.email,
                phone: orderToView.phone,
                orderTotal: orderToView.orderTotal,
                orderItems: orderToView.orderItems,
                created: orderToView.created,
                ready: orderToView.ready,
                closed: orderToView.closed,
              }),
              setEditName(!editName),
              setFirstNameValid(false),
              setLastNameValid(false),
              setUpdate(!update),
              (customerNameRef.current =
                `${
                  currentFirstName.charAt(0).toUpperCase() +
                  currentFirstName
                    .substring(1, currentFirstName.length)
                    .toLowerCase()
                }` +
                " " +
                `${
                  currentLastName.charAt(0).toUpperCase() +
                  currentLastName
                    .substring(1, currentLastName.length)
                    .toLowerCase()
                }`),
            ]}
          >
            Done
          </button>
        )}
    </div>
  );
}
