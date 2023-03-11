import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { storage } from "../firebase/config";
import { useFirestore } from "../hooks/useFirestore";
import { v4 } from "uuid";
import closeBtn from "../assets/images/closeBtn.png";
import styles from "./Modal.module.css";

export default function DiaryForm({ uid, displayName, handleModalClose }) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [isEditClicked] = useState(false);
  const { addDocument, response } = useFirestore("board");

  useEffect(() => {
    if (response.success) {
      setTitle("");
      setText("");
    }
  }, [response.success]);

  const handleDate = (event) => {
    if (event.target.id === "tit") {
      setTitle(event.target.value);
    } else if (event.target.id === "txt") {
      setText(event.target.value);
    } else if (event.target.id === "file") {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (image == null) {
      addDocument({ uid, displayName, title, text, isEditClicked });

      handleModalClose();
      return;
    }

    const imgName = image.name + v4();
    const imageRef = ref(storage, `images/${imgName}`);
    let imageUrl = "";

    await uploadBytes(imageRef, image);

    imageUrl = await getDownloadURL(imageRef);

    addDocument({
      uid,
      displayName,
      title,
      text,
      imageUrl,
      imgName,
      isEditClicked,
    });

    handleModalClose();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.write_form}>
        <fieldset>
          <div className={styles.write_form_title}>
            <span>{displayName}</span>
            <span>글쓰기</span>
            <span>
              <img onClick={handleModalClose} src={closeBtn} alt="closeBtn" />
            </span>
          </div>
          <input
            value={title}
            id="tit"
            type="text"
            required
            onChange={handleDate}
            placeholder="제목"
          />
          <textarea
            value={text}
            id="txt"
            type="text"
            required
            onChange={handleDate}
            placeholder="내용"
          ></textarea>
          <input
            className={styles.fileInput}
            type="file"
            id="file"
            onChange={handleDate}
          />
          <button type="submit">등록</button>
        </fieldset>
      </form>
    </>
  );
}
