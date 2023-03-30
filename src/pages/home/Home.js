import { useMatch, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";
import styles from "./Home.module.css";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import BoardList from "../../components/boardList/BoardList";
import Modal from "../../components/modal/Modal";

export default function Home() {
  const { user } = useAuthContext();
  const boardCategory = "자유";
  const { documents: boardData, error } = useCollection("board");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const imgMatch = useMatch(`/img/:imgId`);
  const navigate = useNavigate();
  const { scrollY } = useScroll();

  const imgClick = (imgId, imgUrl) => {
    setImgUrl(imgUrl);
    navigate(`/img/${imgId}`);
    document.body.classList.add(styles["modal-open"]);
  };
  const onOverlayClick = () => {
    document.body.classList.remove(styles["modal-open"]);
    navigate("/");
  };
  const closeBtnClick = () => {
    document.body.classList.remove(styles["modal-open"]);
    navigate("/");
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
          {boardData && (
            <BoardList
              boardCategory={boardCategory}
              boardData={boardData}
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
          photoURL={user.photoURL}
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
