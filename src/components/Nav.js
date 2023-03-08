import { Link, useMatch } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import styles from "./Nav.module.css";

export default function Nav() {
  const { user } = useAuthContext();
  const homeMatch = useMatch("/");
  const todoMatch = useMatch("/todo");
  return (
    <>
      <div className={styles.nav_menu}>
        {user && (
          <>
            <Link to="/">
              <div
                className={
                  homeMatch ? styles.nav_menu_li_click : styles.nav_menu_li
                }
              >
                Home
              </div>
            </Link>
            <Link to="/todo">
              <div
                className={
                  todoMatch ? styles.nav_menu_li_click : styles.nav_menu_li
                }
              >
                To Do list
              </div>
            </Link>
          </>
        )}
      </div>
    </>
  );
}
