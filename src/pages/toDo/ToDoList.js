import ToDoItem from "./ToDoItem";
import styles from "./ToDo.module.css";
import { FaClipboardCheck, FaClipboardList } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

export default function ToDoList({ diaries }) {
  return (
    <AnimatePresence>
      <div className={styles.todolists}>
        <div className={styles.todolist}>
          <motion.div
            layoutId="doing"
            transition={{ duration: 0.5 }}
            className={styles.todolist_title}
          >
            <FaClipboardList />
            <span>할 일 목록</span>
          </motion.div>
          {diaries.map((item) => {
            return <ToDoItem key={item.id} item={item} doing={true} />;
          })}
        </div>

        <div className={styles.todolist2}>
          <motion.div
            layoutId="done"
            transition={{ duration: 0.5 }}
            className={styles.todolist_title}
          >
            <FaClipboardCheck />
            <span>완료됨</span>
          </motion.div>
          {diaries.map((item) => {
            return <ToDoItem key={item.id} item={item} doing={false} />;
          })}
        </div>
      </div>
    </AnimatePresence>
  );
}
