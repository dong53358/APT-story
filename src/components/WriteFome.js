import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { storage } from "../firebase/config";
import { useFirestore } from "../hooks/useFirestore";
import { v4 } from "uuid";
import closeBtn from "../assets/images/closeBtn.png";
import styles from "./Modal.module.css";
import PreviewImage from "./PreviewImage";

// function PreviewImage({ imageFile }) {
//   const [imageUrl, setImageUrl] = useState("''");

//   useEffect(() => {
//     if (imageFile) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setImageUrl(reader.result);
//       };
//       reader.readAsDataURL(imageFile);
//     }
//   }, [imageFile]);

//   return imageUrl ? <img src={imageUrl} alt="preview" /> : null;
// }

export default function WriteFome({
  type,
  uid,
  displayName,
  handleModalClose,
  item,
}) {
  const [category, setCategory] = useState(item?.category || "자유");
  const [title, setTitle] = useState(item?.title || "");
  const [imageFile, setImage] = useState(item?.imageUrl || "");
  const [imgUrl, setImgUrl] = useState("");
  const [text, setText] = useState(item?.text || "");
  const [isEditClicked] = useState(false);
  const { addDocument, updateDocument, response } = useFirestore("board");
  console.log(imageFile);
  useEffect(() => {
    if (response.success) {
      setTitle("");
      setText("");
      setCategory("자유");
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
    if (type === "ADD") {
      if (imageFile == null) {
        addDocument({ uid, displayName, category, title, text, isEditClicked });

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
        category,
        title,
        text,
        imageUrl,
        imgName,
        isEditClicked,
      });
      handleModalClose();
      return;
    }
    const imgName = imageFile.name + v4();
    const imageRef = ref(storage, `images/${imgName}`);
    let imageUrl = "";

    await uploadBytes(imageRef, imageFile);

    imageUrl = await getDownloadURL(imageRef);
    updateDocument(item.id, title, text, category, imageUrl, imgName);

    handleModalClose();
  };

  useEffect(() => {
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setImgUrl(reader.result);
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
            onChange={handleDate}
            maxLength="50"
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
            accept="image/*"
            onChange={handleDate}
          />
          <PreviewImage imageUrl={imgUrl} />
          <button type="submit">등록</button>
        </fieldset>
      </form>
    </>
  );
}
