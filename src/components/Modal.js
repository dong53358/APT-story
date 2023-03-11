import React from "react";
import styles from "./Modal.module.css";
import DiaryForm from "./WriteFome";

const Modal = ({ uid, displayName, handleModalClose }) => {
  return (
    <>
      <div className={styles.modal_container}>
        <DiaryForm
          uid={uid}
          displayName={displayName}
          handleModalClose={handleModalClose}
        ></DiaryForm>
      </div>
      <div className={styles.overlay} onClick={handleModalClose}></div>
    </>
  );
};

export default Modal;
