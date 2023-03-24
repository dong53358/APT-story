import { useState } from "react";
import { FaAngleDown, FaAngleLeft } from "react-icons/fa";
import { Link, useMatch } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import styles from "./Nav.module.css";

export default function Nav() {
  const { user } = useAuthContext();
  const homeMatch = useMatch("/");
  const infoMatch = useMatch("/info");
  const questMatch = useMatch("/quest");
  const freeMatch = useMatch("/free");
  const profileMatch = useMatch("/mypage/profile");
  const myPostsMatch = useMatch("/mypage/my-posts");
  const likedPostsMatch = useMatch("/mypage/liked-posts");
  const [isMyPageClick, setIsMyPageClick] = useState(false);

  const handleMenuClick = () => {
    setIsMyPageClick((prev) => !prev);
  };
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
                전체
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
            <div className={styles.nav_mymenu} onClick={handleMenuClick}>
              <div>My menu</div>
              <div>{isMyPageClick ? <FaAngleDown /> : <FaAngleLeft />}</div>
            </div>
            {isMyPageClick && (
              <div className={styles.nav_mymenu_container}>
                <Link to="/mypage/profile">
                  <div
                    className={
                      profileMatch
                        ? styles.nav_mymenu_li_click
                        : styles.nav_mymenu_li
                    }
                  >
                    프로필 관리
                  </div>
                </Link>
                <Link to="/mypage/my-posts">
                  <div
                    className={
                      myPostsMatch
                        ? styles.nav_mymenu_li_click
                        : styles.nav_mymenu_li
                    }
                  >
                    내글관리
                  </div>
                </Link>
                <Link to="/mypage/liked-posts">
                  <div
                    className={
                      likedPostsMatch
                        ? styles.nav_mymenu_li_click
                        : styles.nav_mymenu_li
                    }
                  >
                    좋아요 한 게시물
                  </div>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
