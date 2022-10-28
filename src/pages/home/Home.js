import { useMatch, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";
import DiaryList from "./DiaryList";
import DiaryForm from "./DirayForm";
import styles from "./Home.module.css";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import { HelmetProvider, Helmet } from "react-helmet-async";

export default function Home() {
  const { user } = useAuthContext();
  const { documents, error } = useCollection("diary", ["uid", "==", user.uid]);
  const [imgUrl, setImgUrl] = useState("");
  const imgMatch = useMatch(`/img/:imgId`);
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const imgClick = (imgId, imgUrl) => {
    navigate(`/img/${imgId}`);
    setImgUrl(imgUrl);
  };
  const onOverlayClick = () => {
    navigate("/");
  };
  const closeBtnClick = () => {
    navigate("/");
  };
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>My diary</title>
        </Helmet>
      </HelmetProvider>
      <main className={styles.cont}>
        <aside className={styles.side_menu}>
          <DiaryForm uid={user.uid}></DiaryForm>
        </aside>
        <ul className={styles.content_list}>
          {error && <strong>{error}</strong>}
          {documents && <DiaryList diaries={documents} imgClick={imgClick} />}
        </ul>
      </main>
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
