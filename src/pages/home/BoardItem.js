import { useEffect, useRef, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useFirestore } from "../../hooks/useFirestore";
import styles from "./Home.module.css";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "../../firebase/config";
import threeDots from "../../assets/images/threeDots.png";
import Modal from "../../components/Modal";
import { useAuthContext } from "../../hooks/useAuthContext";

export function BoardItem({ boardCategory, item, imgClick }) {
  const { user } = useAuthContext();
  const [isOptionBtnClick, setIsOptionBtnClick] = useState(false);
  const [isEditClicked, setIsEditClicked] = useState(false);
  const actionsRef = useRef(null);

  const { deleteDocument } = useFirestore("board");

  const handleEditModalOpen = () => {
    setIsEditClicked(true);
    document.body.classList.add(styles["modal-open"]);
  };

  const handleEditModalClose = () => {
    setIsEditClicked(false);
    document.body.classList.remove(styles["modal-open"]);
  };

  const handleOptionBtnClick = () => {
    setIsOptionBtnClick((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (actionsRef.current && !actionsRef.current.contains(event.target)) {
        setIsOptionBtnClick(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const timeConversion = (timestamp) => {
    const offset = new Date().getTimezoneOffset(); // -540 (UTC+9:00의 오프셋)

    const date = new Date(
      timestamp.seconds * 1000 +
        timestamp.nanoseconds / 1000000 -
        offset * 60 * 1000
    );
    return date.toISOString().slice(0, 16);
  };
  return (
    <>
      <li className={styles.li_container}>
        <div className={styles.post}>
          <div className={styles.post_header}>
            <div className={styles.post_header_left}>
              <div className={styles.post_writer}>
                작성자 : {item.displayName}
              </div>
              <div className={styles.post_category}>{item.category}</div>
              <div className={styles.post_createdTime}>
                {timeConversion(item.createdTime)}
              </div>
            </div>
            <div>
              <button
                className={styles.post_optionBtn}
                onClick={handleOptionBtnClick}
              >
                <img src={threeDots} alt={threeDots} />
                {isOptionBtnClick && (
                  <div ref={actionsRef} className={styles.post_optionBtn_list}>
                    <div
                      onClick={() => {
                        if (item.uid !== user.uid) {
                          alert("본인의 게시물만 수정하실 수 있습니다.");
                          return;
                        }
                        handleEditModalOpen();
                      }}
                    >
                      <span>
                        <FaEdit />
                      </span>
                      <span>게시글 수정</span>
                    </div>
                    <div
                      onClick={() => {
                        if (item.uid !== user.uid) {
                          alert("본인의 게시물만 삭제하실 수 있습니다.");
                          return;
                        }
                        const desertRef = ref(
                          storage,
                          `images/${item.imgName}`
                        );
                        deleteDocument(item.id);
                        if (item.imgName) deleteObject(desertRef);
                      }}
                    >
                      <span>
                        <FaTrashAlt />
                      </span>
                      <span>게시글 삭제</span>
                    </div>
                  </div>
                )}
              </button>
            </div>
          </div>
          <div className={styles.post_content}>
            <div className={styles.post_content_title}>{item.title}</div>
            <p className={styles.post_content_detail}>{item.text}</p>
            {item.imageUrl && (
              <img
                src={item.imageUrl}
                alt="postImg"
                className={styles.post_image}
                onClick={() => imgClick(item.imgName, item.imageUrl)}
              />
            )}
          </div>
        </div>
      </li>
      {isEditClicked && (
        <Modal
          boardCategory={boardCategory}
          type="EDIT"
          uid={user.uid}
          displayName={user.displayName}
          handleModalClose={handleEditModalClose}
          item={item}
        />
      )}
    </>
  );
}
