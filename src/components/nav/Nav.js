import { Link, useMatch } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import styles from "./Nav.module.css";

export default function Nav() {
  const { user } = useAuthContext();
  const homeMatch = useMatch("/");
  const infoMatch = useMatch("/info");
  const questMatch = useMatch("/quest");
  const freeMatch = useMatch("/free");

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

            <Link to="/free">
              <div
                className={
                  freeMatch ? styles.nav_menu_li_click : styles.nav_menu_li
                }
              >
                자유
              </div>
            </Link>
            <Link to="/info">
              <div
                className={
                  infoMatch ? styles.nav_menu_li_click : styles.nav_menu_li
                }
              >
                정보공유
              </div>
            </Link>
            <Link to="/quest">
              <div
                className={
                  questMatch ? styles.nav_menu_li_click : styles.nav_menu_li
                }
              >
                질문
              </div>
            </Link>
          </>
        )}
      </div>
    </>
  );
}
