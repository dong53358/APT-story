import React from "react";
import styles from "./Modal.module.css";
import WriteForm from "./WriteFome";

const Modal = ({ type, uid, displayName, handleModalClose, item }) => {
  return (
    <>
      <div className={styles.modal_container}>
        <WriteForm
          type={type}
          uid={uid}
          displayName={displayName}
          handleModalClose={handleModalClose}
          item={item}
        ></WriteForm>
      </div>
      <div className={styles.overlay} onClick={handleModalClose}></div>
    </>
  );
};

export default Modal;
