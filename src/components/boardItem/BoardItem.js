import { useEffect, useRef, useState } from "react";
import { FaEdit, FaHeart, FaRegCommentAlt, FaTrashAlt } from "react-icons/fa";
import { useFirestore } from "../../hooks/useFirestore";
import styles from "../boardItem/BoardItem.module.css";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "../../firebase/config";
import threeDots from "../../assets/images/threeDots.png";
import Modal from "../modal/Modal";
import { useAuthContext } from "../../hooks/useAuthContext";
import Comments from "../comments/Comments";
import { timeConversion } from "../../utils/timeConversion";
import { useCollection } from "../../hooks/useCollection";

export function BoardItem({ boardCategory, item, imgClick }) {
  const { user } = useAuthContext();
  const [isOptionBtnClick, setIsOptionBtnClick] = useState(false);
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [isCommentsClicked, setIsCommentsClicked] = useState(false);
  const { documents: commentsData, error } = useCollection(
    "comments",
    ["boardId", "==", item.id],
    "asc"
  );

  const actionsRef = useRef(null);

  const { deleteDocument } = useFirestore("board");
  const { deleteDocument: deleteComments } = useFirestore("comments");

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

  const handleCommentsOpen = () => {
    setIsCommentsClicked((prev) => !prev);
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
                        // eslint-disable-next-line no-restricted-globals
                        if (confirm("정말 삭제하시겠습니까?")) {
                          const desertRef = ref(
                            storage,
                            `images/${item.imgName}`
                          );

                          deleteDocument(item.id);
                          for (let comment of commentsData) {
                            deleteComments(comment.id);
                          }
                          if (item.imgName) deleteObject(desertRef);
                        } else {
                          return;
                        }
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
            <div className={styles.post_content_title}>
              <span>{item.title}</span>{" "}
              <span className={styles.post_comment_count}>
                {commentsData.length === 0 ? null : `[${commentsData.length}]`}
              </span>
            </div>
            <p className={styles.post_content_detail}>
              {item.text.split("\n").map((line, index) => {
                return (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                );
              })}
            </p>
            {item.imageUrl && (
              <img
                src={item.imageUrl}
                alt="postImg"
                className={styles.post_image}
                onClick={() => imgClick(item.imgName, item.imageUrl)}
              />
            )}
          </div>
          <div className={styles.post_btn_container}>
            <div className={styles.post_like_btn}>
              <span>
                <FaHeart />
              </span>
              <span>좋아요</span>
            </div>
            <div
              className={styles.post_comment_btn}
              onClick={handleCommentsOpen}
            >
              <span>
                <FaRegCommentAlt />
              </span>
              <span>댓글 보기</span>
            </div>
          </div>
        </div>
        {isCommentsClicked && (
          <Comments
            commentsData={commentsData}
            boardId={item.id}
            error={error}
          />
        )}
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
