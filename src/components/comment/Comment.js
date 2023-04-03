import React, { useEffect, useRef, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import threeDots from "../../assets/images/threeDots.png";
import { useFirestore } from "../../hooks/useFirestore";
import { timeConversion } from "../../utils/timeConversion";
import styles from "./Comment.module.css";

export function Comment({ user, comment }) {
  const [isOptionBtnClick, setIsOptionBtnClick] = useState(false);
  const [editComment, setEditComment] = useState(comment.content);
  const [isEditClicked, setIsEditClicked] = useState(false);
  const { deleteDocument, updateComment } = useFirestore("comments");

  const actionsRef = useRef(null);

  const handleCommentChange = (e) => {
    setEditComment(e.target.value);
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    updateComment(comment.id, editComment, user.photoURL);
    setIsEditClicked(false);
  };

  const handleOptionBtnClick = () => {
    setIsOptionBtnClick((prev) => !prev);
  };

  const handleEditCancel = () => {
    setEditComment(comment.content);
    setIsEditClicked(false);
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
    <div className={styles.comment_container}>
      <div className={styles.comment_header}>
        <div className={styles.comment_header_left}>
          <div className={styles.comment_writer}>
            <div className={styles.comment_writer_profileImg}>
              <img src={comment.photoURL} alt="profileImg" />
            </div>
            <div>{comment.displayName}</div>
          </div>
          <div className={styles.comment_createdTime}>
            {timeConversion(comment.createdTime)}
          </div>
        </div>
        <div>
          <button
            className={styles.comment_optionBtn}
            onClick={handleOptionBtnClick}
          >
            <img src={threeDots} alt={threeDots} />
            {isOptionBtnClick && (
              <div ref={actionsRef} className={styles.comment_optionBtn_list}>
                <div
                  onClick={() => {
                    if (comment.uid !== user.uid) {
                      alert("본인의 게시물만 수정하실 수 있습니다.");
                      return;
                    }
                    setIsEditClicked(true);
                  }}
                >
                  <span>
                    <FaEdit />
                  </span>
                  <span>댓글 수정</span>
                </div>
                <div
                  onClick={() => {
                    if (comment.uid !== user.uid) {
                      alert("본인의 게시물만 삭제하실 수 있습니다.");
                      return;
                    }
                    // eslint-disable-next-line no-restricted-globals
                    if (confirm("정말 삭제하시겠습니까?")) {
                      deleteDocument(comment.id);
                    } else {
                      return;
                    }
                  }}
                >
                  <span>
                    <FaTrashAlt />
                  </span>
                  <span>댓글 삭제</span>
                </div>
              </div>
            )}
          </button>
        </div>
      </div>
      {isEditClicked ? (
        <>
          <form className={styles.Comments_form} onSubmit={handleCommentSubmit}>
            <textarea
              type="text"
              value={editComment}
              onChange={handleCommentChange}
              required
            ></textarea>
            <button type="submit">게시</button>
          </form>
          <button
            className={styles.Comments_form_edit_cancel}
            onClick={handleEditCancel}
          >
            수정 취소
          </button>
        </>
      ) : (
        <div className={styles.comment_content}>
          {comment.content.split("\n").map((line, index) => {
            return (
              <span key={index}>
                {line}
                <br />
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
