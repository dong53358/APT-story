import ToDoItem from "./ToDoItem";
import styles from "./ToDo.module.css";
import { FaClipboardCheck, FaClipboardList } from "react-icons/fa";

export default function ToDoList({ diaries }) {
  return (
    <div className={styles.todolists}>
      <div className={styles.todolist}>
        <div className={styles.todolist_title}>
          <FaClipboardList />
          <span>할 일 목록</span>
        </div>
        {diaries.map((item) => {
          return <ToDoItem key={item.id} item={item} doing={true} />;
        })}
      </div>

      <div className={styles.todolist}>
        <div className={styles.todolist_title}>
          <FaClipboardCheck />
          <span>완료됨</span>
        </div>
        {diaries.map((item) => {
          return <ToDoItem key={item.id} item={item} doing={false} />;
        })}
      </div>
    </div>
  );
}
