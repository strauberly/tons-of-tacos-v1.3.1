"use client";
import classes from "./modal.module.css";
import { useDisplayContext } from "@/context/display-context";
import { useModalContext } from "@/context/menu-context/modal-context";

export default function Modal() {
  const { showModal, setShowModal } = useDisplayContext();
  const { modal } = useModalContext();

  return (
    <>
      {showModal && (
        <div className={classes.alertBackdrop}>
          <div className={classes.alert}>
            <div className={classes.alertBackground}>
              <pre>
                <p>{modal}</p>
              </pre>
              <button
                className={classes.close}
                onClick={() => {
                  setShowModal(false);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
