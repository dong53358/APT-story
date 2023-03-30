import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";
import styles from "./Header.module.css";

export default function Header() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  return (
    <>
      <nav className={styles.header}>
        <h1 className={styles.title}>
          <Link to="/">APT stroy</Link>
        </h1>
        <ul className={styles.list_nav}>
          {user && (
            <li className={styles.userInfo}>
              <strong className={styles.userName}>
                <Link to={"/mypage/profile"}>
                  <div className={styles.profileImg}>
                    <img src={user.photoURL} alt="profileImg" />
                  </div>
                </Link>

                <div>{user.displayName}</div>
              </strong>
              <button type="button" onClick={logout}>
                로그아웃
              </button>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
}
