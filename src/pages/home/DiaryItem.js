import { useRef, useState } from "react";
import { FaCheck, FaEdit, FaTrashAlt } from "react-icons/fa";
import { useFirestore } from "../../hooks/useFirestore";
import styles from "./Home.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "../../firebase/config";

export function DiaryItem({ item, imgClick }) {
  const { deleteDocument, updateDocumentEditCliked, updateDocument } =
    useFirestore("diary");
  const [newTitle, setNewTitle] = useState(item.title);
  const [newText, setNewText] = useState(item.text);

  const editInputRef = useRef(null);
  const onChangeEditInput = (e) => {
    if (e.target.id === "tit") {
      setNewTitle(e.target.value);
    } else if (e.target.id === "txt") {
      setNewText(e.target.value);
    }
  };

  return (
    <>
      <AnimatePresence>
        <li key={item.id}>
          <div className={styles.li_content}>
            <div>
              {item.isEditClicked ? (
                <form
                  className={styles.editForm}
                  onSubmit={(event) => {
                    event.preventDefault();
                    updateDocumentEditCliked(item.id, item.isEditClicked);
                  }}
                >
                  <textarea
                    type="text"
                    id="tit"
                    className={styles.editInput}
                    value={newTitle}
                    ref={editInputRef}
                    onChange={onChangeEditInput}
                  />
                  <textarea
                    type="text"
                    id="txt"
                    className={styles.editInput}
                    value={newText}
                    ref={editInputRef}
                    onChange={onChangeEditInput}
                  />
                  <button
                    type="submit"
                    onClick={(event) => {
                      event.stopPropagation();
                      updateDocument(item.id, newTitle, newText);
                    }}
                  >
                    <FaCheck />
                  </button>
                </form>
              ) : (
                <div>
                  <strong className={styles.title}>{item.title}</strong>
                  <p className={styles.text}>{item.text}</p>
                </div>
              )}
            </div>

            <div className={styles.btn}>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  updateDocumentEditCliked(item.id, item.isEditClicked);
                }}
              >
                <FaEdit />
              </button>
              <button
                type="button"
                onClick={() => {
                  const desertRef = ref(storage, `images/${item.imgName}`);
                  deleteDocument(item.id);
                  deleteObject(desertRef);
                }}
              >
                <FaTrashAlt />
              </button>
            </div>
          </div>

          <motion.img
            layoutId={item.id}
            onClick={() => imgClick(item.id, item.imageUrl)}
            className={styles.img}
            src={item.imageUrl}
          />
        </li>
      </AnimatePresence>
    </>
  );
}
