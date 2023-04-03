import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { useEffect, useState } from "react";
import { storage } from "../../firebase/config";
import { useFirestore } from "../../hooks/useFirestore";
import { v4 } from "uuid";
import closeBtn from "../../assets/images/closeBtn.png";
import styles from "../writeFome/WriteFome.module.css";

export default function WriteFome({
  boardCategory,
  type,
  uid,
  displayName,
  photoURL,
  handleModalClose,
  item,
}) {
  const [category, setCategory] = useState(item?.category || boardCategory);
  const [title, setTitle] = useState(item?.title || "");
  const [imageFile, setImageFile] = useState("");
  const [previewImg, setPreviewImg] = useState(item?.imageUrl || "");
  const [text, setText] = useState(item?.text || "");
  const { addDocument, updateDocument, updateDocument_img, response } =
    useFirestore("board");

  useEffect(() => {
    if (response.success) {
      setTitle("");
      setText("");
      setCategory(boardCategory);
      setImageFile("");
    }
  }, [response.success]);

  const handleChange = (event) => {
    if (event.target.id === "tit") {
      setTitle(event.target.value);
    } else if (event.target.id === "txt") {
      setText(event.target.value);
    } else if (event.target.id === "file") {
      setImageFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // add
    if (type === "ADD") {
      if (imageFile === "") {
        addDocument({ uid, displayName, photoURL, category, title, text });
        handleModalClose();
        return;
      }

      const imgName = imageFile.name + v4();
      const imageRef = ref(storage, `images/${imgName}`);
      let imageUrl = "";

      await uploadBytes(imageRef, imageFile);

      imageUrl = await getDownloadURL(imageRef);

      addDocument({
        uid,
        displayName,
        photoURL,
        category,
        title,
        text,
        imageUrl,
        imgName,
      });
      handleModalClose();
      return;
    }
    // update
    if (imageFile === "") {
      updateDocument(item.id, title, text, category, photoURL);
      handleModalClose();
      return;
    }

    const desertRef = ref(storage, `images/${item.imgName}`);
    if (item.imgName) deleteObject(desertRef);

    const imgName = imageFile.name + v4();
    const imageRef = ref(storage, `images/${imgName}`);
    let imageUrl = "";

    await uploadBytes(imageRef, imageFile);

    imageUrl = await getDownloadURL(imageRef);

    updateDocument_img(
      item.id,
      title,
      text,
      category,
      imageUrl,
      imgName,
      photoURL
    );
    handleModalClose();
  };

  useEffect(() => {
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImg(reader.result);
      };
      reader.readAsDataURL(imageFile);
    }
  }, [imageFile]);

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
          <select
            className={styles.write_form_category}
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="자유">자유</option>
            <option value="정보공유">정보공유</option>
            <option value="질문">질문</option>
          </select>
          <input
            value={title}
            id="tit"
            type="text"
            required
            onChange={handleChange}
            maxLength="50"
            placeholder="제목"
          />
          <textarea
            value={text}
            id="txt"
            type="text"
            required
            onChange={handleChange}
            placeholder="내용"
          ></textarea>
          <input
            className={styles.fileInput}
            type="file"
            id="file"
            accept="image/*"
            onChange={handleChange}
          />
          {previewImg && (
            <div className={styles.previewImg}>
              <img src={previewImg} alt="preview" />
            </div>
          )}
          <button type="submit">등록</button>
        </fieldset>
      </form>
    </>
  );
}
