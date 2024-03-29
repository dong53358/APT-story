import React from "react";
import styles from "../modal/Modal.module.css";
import WriteForm from "../writeFome/WriteFome";

const Modal = ({
  boardCategory,
  type,
  uid,
  displayName,
  photoURL,
  handleModalClose,
  item,
}) => {
  return (
    <>
      <div className={styles.modal_container}>
        <WriteForm
          boardCategory={boardCategory}
          type={type}
          uid={uid}
          displayName={displayName}
          photoURL={photoURL}
          handleModalClose={handleModalClose}
          item={item}
        ></WriteForm>
      </div>
      <div className={styles.overlay} onClick={handleModalClose}></div>
    </>
  );
};

export default Modal;
