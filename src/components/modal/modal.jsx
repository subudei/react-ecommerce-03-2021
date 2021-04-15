import React from "react";
import "./modal.styles.css";

function Modal({ hideModal, toggleModal, children }) {
  if (hideModal) return null;
  return (
    <>
      <div className="modal__overlay" onClick={() => toggleModal()} />

      <div className="modal">{children}</div>
    </>
  );
}

export default Modal;
