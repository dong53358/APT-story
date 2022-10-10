import { useFirestore } from "../../hooks/useFirestore";
import styles from "./ToDo.module.css";
import { FaTrashAlt } from "react-icons/fa";

export default function ToDoList({ diaries }) {
  const { deleteDocument } = useFirestore("todo");
  return (
    <>
      {diaries.map((item) => {
        return (
          <li key={item.id}>
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
