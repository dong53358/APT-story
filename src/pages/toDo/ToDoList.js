import { useFirestore } from "../../hooks/useFirestore";
import styles from "./ToDo.module.css";
import { FaTrashAlt } from "react-icons/fa";

export default function ToDoList({ diaries }) {
  const { deleteDocument, updateDocument } = useFirestore("todo");

  return (
    <>
      {diaries.map((item) => {
        return (
          <li
            className={item.isClicked ? styles.todoDone : styles.todoDoing}
            key={item.id}
            onClick={() => {
              updateDocument(item.id, item.isClicked);
            }}
          >
            <strong className={styles.title}>{item.title}</strong>
            <button
              type="button"
              onClick={() => {
                deleteDocument(item.id);
              }}
            >
              <FaTrashAlt />
            </button>
          </li>
        );
      })}
    </>
  );
}
