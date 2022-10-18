import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";
import ToDoList from "./ToDoList";
import ToDoForm from "./ToDoForm";
import styles from "./ToDo.module.css";

function ToDo() {
  const { user } = useAuthContext();
  const { documents, error } = useCollection("todo", ["uid", "==", user.uid]);

  return (
    <>
      <main className={styles.cont}>
        <aside className={styles.side_menu}>
          <ToDoForm uid={user.uid}></ToDoForm>
        </aside>
        <ul className={styles.content_list}>
          {error && <strong>{error}</strong>}
          {documents && <ToDoList diaries={documents} />}
        </ul>
      </main>
    </>
  );
}

export default ToDo;
