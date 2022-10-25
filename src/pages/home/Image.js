import { listAll, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";
import { storage } from "../../firebase/config";
import { v4 } from "uuid";
import styles from "./Home.module.css";

export function Image() {
  const [image, setImage] = useState(null);
  const [imageList, setImageList] = useState([]);
  // Create a reference under which you want to list
  const imageListRef = ref(storage, "images/");
  useEffect(() => {
    listAll(imageListRef).then((response) => {
      console.log(response);
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  const imageUplode = () => {
    if (image == null) {
      console.log("null");
      return;
    }
    const imageRef = ref(storage, `images/${image.name + v4()}`);

    uploadBytes(imageRef, image).then((snapShot) => {
      getDownloadURL(snapShot.ref).then((url) => {
        setImageList((prev) => [...prev, url]);
      });
    });
  };
  return (
    <div className={styles.imgForm}>
      <input
        type="file"
        onChange={(event) => {
          setImage(event.target.files[0]);
        }}
      />
      <button onClick={imageUplode}>Image Upload</button>
      <div className={styles.imgList}>
        {imageList.map((url, index) => {
          return <img src={url} key={index} />;
        })}
      </div>
    </div>
  );
}
