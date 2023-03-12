import { useEffect, useState } from "react";

export default function PreviewImage({ imageFile }) {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(imageFile);
    }
  }, [imageFile]);

  return imageUrl ? <img src={imageUrl} alt="preview" /> : null;
}
