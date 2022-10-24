import { ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { storage } from "../../firebase/config";
import { v4 } from "uuid";

export function Image() {
  const [image, setImage] = useState(null);
  // Create a reference under which you want to list

  const imageUplode = () => {
    if (image == null) {
      console.log("null");
      return;
    }
    const imageRef = ref(storage, `images/${image.name + v4()}`);
    uploadBytes(imageRef, image).then(() => {
      alert("Image Uploaded");
    });
  };
  return (
    <div>
      <input
        type="file"
        onChange={(event) => {
          setImage(event.target.files[0]);
        }}
      />
      <button onClick={imageUplode}>Image Upload</button>
    </div>
  );
}
