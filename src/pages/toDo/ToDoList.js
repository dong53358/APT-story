import { useFirestore } from "../../hooks/useFirestore";
import styles from "./ToDo.module.css";
import {
  FaCheck,
  FaEdit,
  FaRegCheckCircle,
  FaRegCircle,
  FaTrashAlt,
} from "react-icons/fa";
import { useState } from "react";

export default function ToDoList({ diaries }) {
  const {
    deleteDocument,
    updateDocumentCliked,
    updateDocumentEditCliked,
    updateDocument,
  } = useFirestore("todo");
  const [input, setInput] = useState("");
  return (
    <>
      {diaries.map((item) => {
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
                  className={styles.editInput}
                  value={item.title}
                  onChange={() => updateDocument(item.id, input)}
                />
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    updateDocument(item.id, input);
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
      })}
    </>
  );
}
