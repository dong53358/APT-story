import { useEffect, useRef, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useFirestore } from "../../hooks/useFirestore";
import styles from "./Home.module.css";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "../../firebase/config";
import threeDots from "../../assets/images/threeDots.png";
import Modal from "../../components/Modal";
import { useAuthContext } from "../../hooks/useAuthContext";

export function BoardItem({ item, imgClick }) {
  const { user } = useAuthContext();
  const [isOptionBtnClick, setIsOptionBtnClick] = useState(false);
  const [isEditClicked, setIsEditClicked] = useState(false);
  const actionsRef = useRef(null);

  const { deleteDocument, updateDocumentEditCliked, updateDocument } =
    useFirestore("board");

  const handleEditModalOpen = () => {
    setIsEditClicked(true);
  };

  const handleEditModalClose = () => {
    setIsEditClicked(false);
  };

  const [newTitle, setNewTitle] = useState(item.title);
  const [newText, setNewText] = useState(item.text);

  const handleOptionBtnClick = () => {
    setIsOptionBtnClick((prev) => !prev);
  };

  const editInputRef = useRef(null);

  const onChangeEditInput = (e) => {
    if (e.target.id === "tit") {
      setNewTitle(e.target.value);
    } else if (e.target.id === "txt") {
      setNewText(e.target.value);
    }
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
        {/* {<form
                  className={styles.editForm}
                  onSubmit={(event) => {
                    event.preventDefault();
                    updateDocumentEditCliked(item.id, item.isEditClicked);
                  }}
                >
                  <textarea
                    type="text"
                    id="tit"
                    className={styles.editInput}
                    value={newTitle}
                    ref={editInputRef}
                    onChange={onChangeEditInput}
                  />
                  <textarea
                    type="text"
                    id="txt"
                    className={styles.editInput}
                    value={newText}
                    ref={editInputRef}
                    onChange={onChangeEditInput}
                  />
                  <button
                    type="submit"
                    onClick={(event) => {
                      event.stopPropagation();
                      updateDocument(item.id, newTitle, newText);
                    }}
                  >
                    <FaCheck />
                  </button>
                </form>} */}
        {/* <div className={styles.btn}>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  updateDocumentEditCliked(item.id, item.isEditClicked);
                }}
              >
                <FaEdit />
              </button>
              <button
                type="button"
                onClick={() => {
                  const desertRef = ref(storage, `images/${item.imgName}`);
                  deleteDocument(item.id);
                  if (item.imgName) deleteObject(desertRef);
                }}
              >
                <FaTrashAlt />
              </button>
            </div> */}
      </li>
      {isEditClicked && (
        <Modal
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
