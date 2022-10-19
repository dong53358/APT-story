import styles from "./ToDo.module.css";
import { useFirestore } from "../../hooks/useFirestore";

import {
  FaCheck,
  FaEdit,
  FaRegCheckCircle,
  FaRegCircle,
  FaTrashAlt,
} from "react-icons/fa";
import { useRef, useState } from "react";
export default function ToDoItem({ item }) {
  const {
    deleteDocument,
    updateDocumentCliked,
    updateDocumentEditCliked,
    updateDocument,
  } = useFirestore("todo");
  const editInputRef = useRef(null);
  const [newText, setNewText] = useState(item.title);
  const onChangeEditInput = (e) => {
    setNewText(e.target.value);
  };
  return (
    <li
      className={item.isClicked ? styles.todoDone : styles.todoDoing}
      key={item.id}
    >
      <div
        className={styles.todoCheck}
        onClick={() => {
          updateDocumentCliked(item.id, item.isClicked);
        }}
      >
        {item.isClicked ? <FaRegCheckCircle /> : <FaRegCircle />}
      </div>

      {item.isEditClicked ? (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            updateDocumentEditCliked(item.id, item.isEditClicked);
          }}
        >
          <input
            type="text"
            className={styles.editInput}
            value={newText}
            ref={editInputRef}
            onChange={onChangeEditInput}
          />
          <button
            type="submit"
            onClick={(event) => {
              event.stopPropagation();
              updateDocument(item.id, newText);
            }}
          >
            <FaCheck />
          </button>
        </form>
      ) : (
        <strong className={styles.title}>{item.title}</strong>
      )}

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
            deleteDocument(item.id);
          }}
        >
          <FaTrashAlt />
        </button>
      </div>
    </li>
  );
}
