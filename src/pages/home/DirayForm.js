import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { storage } from "../../firebase/config";
import { useFirestore } from "../../hooks/useFirestore";
import { v4 } from "uuid";
import { FaBook } from "react-icons/fa";
import styles from "./Home.module.css";

export default function DiaryForm({ uid, displayName }) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [isEditClicked] = useState(false);
  const { addDocument, response } = useFirestore("diary");

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
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <div className={styles.diaryForm_title}>
            <span>
              <FaBook />
            </span>
            <span> 글쓰기</span>
          </div>
          <label htmlFor="tit">제목 </label>
          <input
            value={title}
            id="tit"
            type="text"
            required
            onChange={handleDate}
          />

          <label htmlFor="txt">내용</label>
          <textarea
            value={text}
            id="txt"
            type="text"
            required
            onChange={handleDate}
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
