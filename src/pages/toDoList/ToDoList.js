import { useState } from "react";
import styles from "./ToDoList.module.css";

function ToDoList() {
  return (
    <>
      <div className={styles.main}>
        <ul className={styles.toDoList}>
          <h1 className={styles.toDoList_title}>ToDoList</h1>
          <li className={styles.toDoList_toDo}></li>

          <button type="button">add</button>
        </ul>
      </div>
    </>
  );
}

export default ToDoList;
