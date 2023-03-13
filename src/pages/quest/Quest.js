import React from "react";
import styles from "./Quest.module.css";

import { useMatch, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import Modal from "../../components/Modal";
import BoardList from "../home/BoardList";

export default function Quest() {
  const { user } = useAuthContext();
  const boardCategory = "질문";
  const { documents, error } = useCollection("board", [
    "category",
    "==",
    boardCategory,
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const imgMatch = useMatch(`/quest/img/:imgId`);
  const navigate = useNavigate();
  const { scrollY } = useScroll();

  const imgClick = (imgId, imgUrl) => {
    setImgUrl(imgUrl);
    navigate(`/quest/img/${imgId}`);
    document.body.classList.add(styles["modal-open"]);
  };
  const onOverlayClick = () => {
    document.body.classList.remove(styles["modal-open"]);
    navigate("/quest");
  };
  const closeBtnClick = () => {
    document.body.classList.remove(styles["modal-open"]);
    navigate("/quest");
  };
  const handleModalOpen = () => {
    setIsModalOpen(true);
    document.body.classList.add(styles["modal-open"]);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
    document.body.classList.remove(styles["modal-open"]);
  };

  return (
    <>
      <main className={styles.cont}>
        <div className={styles.write_btn_container}>
          <button onClick={handleModalOpen}>글쓰기</button>
        </div>
        <ul className={styles.content_list}>
          {error && <strong>{error}</strong>}
          {documents && (
            <BoardList
              boardCategory={boardCategory}
              diaries={documents}
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
}
