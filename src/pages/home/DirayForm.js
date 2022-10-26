import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { storage } from "../../firebase/config";
import { useFirestore } from "../../hooks/useFirestore";
import { v4 } from "uuid";

export default function DiaryForm({ uid }) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [isEditClicked, setIsEditClicked] = useState(false);
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
      addDocument({ uid, title, text, isEditClicked });
      return;
    }
    const imageRef = ref(storage, `images/${image.name + v4()}`);
    let imageUrl = "";
    await uploadBytes(imageRef, image);
    imageUrl = await getDownloadURL(imageRef);
    addDocument({ uid, title, text, imageUrl, isEditClicked });
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>일기 쓰기</legend>
          <label htmlFor="tit">일기 제목 :</label>
          <input
            value={title}
            id="tit"
            type="text"
            required
            onChange={handleDate}
          />
          <input type="file" id="file" onChange={handleDate} />
          <label htmlFor="txt">일기 내용 :</label>
          <textarea
            value={text}
            id="txt"
            type="text"
            required
            onChange={handleDate}
          ></textarea>

          <button type="submit">저장하기</button>
        </fieldset>
      </form>
    </>
  );
}
