import { Link, useMatch } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import styles from "./Nav.module.css";

export default function Nav() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const homeMatch = useMatch("/");
  const todoMatch = useMatch("/todo");
  return (
    <>
      <nav className={styles.nav}>
        <h1 className={styles.title}>
          <Link to="/">APT stroy</Link>
        </h1>
        <ul className={styles.list_nav}>
          {user && (
            <li>
              <strong className={styles.userName}>
                환영합니다 {user.displayName}님
              </strong>
              <button type="button" onClick={logout}>
                로그아웃
              </button>
            </li>
          )}
        </ul>
      </nav>
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
