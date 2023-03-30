import React, { useEffect, useState } from "react";
import { Comment } from "../comment/Comment";
import { useFirestore } from "../../hooks/useFirestore";
import { useAuthContext } from "../../hooks/useAuthContext";
import styles from "./Comments.module.css";

export function Comments({ commentsData, boardId, error }) {
  const { user } = useAuthContext();
  const [comment, setComment] = useState("");
  const { addDocument, response } = useFirestore("comments");

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();

    addDocument({
      content: comment,
      displayName: user.displayName,
      uid: user.uid,
      photoURL: user.photoURL,
      boardId: boardId,
    });
  };

  useEffect(() => {
    if (response.success) {
      setComment("");
    }
  }, [response.success]);

  return (
    <div className={styles.Comments_Container}>
      <div className={styles.Comments_comments}>
        {error && <strong>{error}</strong>}
        {commentsData?.map((comment) => {
          return <Comment key={comment.id} user={user} comment={comment} />;
        })}
      </div>
      <form className={styles.Comments_form} onSubmit={handleCommentSubmit}>
        <textarea
          type="text"
          value={comment}
          onChange={handleCommentChange}
          required
        ></textarea>
        <button type="submit">게시</button>
      </form>
    </div>
  );
}

export default Comments;
