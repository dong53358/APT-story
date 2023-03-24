import { AnimatePresence, useScroll, motion } from "framer-motion";
import React, { useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import { useMatch, useNavigate } from "react-router-dom";
import BoardList from "../../components/boardList/BoardList";
import Modal from "../../components/modal/Modal";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";

import styles from "./MyPage.module.css";

const LikePosts = () => {
  const { user } = useAuthContext();
  const boardCategory = "자유";
  const { documents: likedPostsData, error } = useCollection("board", [
    "likeList",
    "array-contains",
    user.uid,
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const imgMatch = useMatch(`/mypage/liked-posts/img/:Id`);
  const navigate = useNavigate();
  const { scrollY } = useScroll();

  const imgClick = (imgId, imgUrl) => {
    setImgUrl(imgUrl);
    navigate(`/mypage/liked-posts/img/${imgId}`);
    document.body.classList.add(styles["modal-open"]);
  };
  const onOverlayClick = () => {
    document.body.classList.remove(styles["modal-open"]);
    navigate("/mypage/liked-posts");
  };
  const closeBtnClick = () => {
    document.body.classList.remove(styles["modal-open"]);
    navigate("/mypage/liked-posts");
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
    document.body.classList.remove(styles["modal-open"]);
  };

  return (
    <>
      <main className={styles.cont}>
        <ul className={styles.content_list}>
          {error && <strong>{error}</strong>}
          {likedPostsData && (
            <BoardList
              boardCategory={boardCategory}
              boardData={likedPostsData}
              imgClick={imgClick}
            />
          )}
        </ul>
      </main>
      {isModalOpen && (
        <Modal
          boardCategory={boardCategory}
          type="ADD"
          handleModalClose={handleModalClose}
          uid={user.uid}
          displayName={user.displayName}
        />
      )}
      <AnimatePresence>
        {imgMatch ? (
          <>
            <motion.div
              onClick={onOverlayClick}
              className={styles.overlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              layoutId={imgMatch?.params.imgId}
              className={styles.bigImg}
              style={{
                top: scrollY.get() + 150,
              }}
            >
              <img src={imgUrl} alt="img" />
              <div onClick={closeBtnClick} className={styles.closeBtn}>
                <FaWindowClose />
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default LikePosts;
