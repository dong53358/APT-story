import React, { useEffect, useRef, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { v4 } from "uuid";
import styles from "./MyPage.module.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { appAuth, storage } from "../../firebase/config";
import { useFirestore } from "../../hooks/useFirestore";
import { updatePassword, updateProfile } from "firebase/auth";
import checkNicknameValid from "../../utils/checkNicknameValid";

const Profile = () => {
  const { user } = useAuthContext();
  const { documents: usersData } = useCollection("user");
  const { documents: userData } = useCollection("user", [
    "uid",
    "==",
    user.uid,
  ]);
  const { updateUserDataImg, updateUserDataNickname, response } =
    useFirestore("user");
  const [isProfileEditMode, setIsProfileEditMode] = useState(false);
  const [isPasswordEditMode, setIsPasswordEditMode] = useState(false);
  const imgInputRef = useRef("");
  const [previewImg, setPreviewImg] = useState("");
  const [profileImgFile, setProfileImgFile] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [nickname, setNickname] = useState(user.displayName);
  const [isNicknameAvailability, setIsNicknameAvailability] = useState("");

  const handlePasswordEditModeChange = () => {
    setIsPasswordEditMode((prev) => !prev);
    setIsProfileEditMode(false);
  };

  const handleProfileEditModeChange = () => {
    setIsProfileEditMode((prev) => !prev);
    setIsPasswordEditMode(false);
  };

  const handleChange = (event) => {
    if (event.target.id === "password") {
      setPassword(event.target.value);
    } else if (event.target.id === "password2") {
      setPassword2(event.target.value);
    } else if (event.target.id === "file") {
      setProfileImgFile(event.target.files[0]);
    } else if (event.target.id === "nickname") {
      setNickname(event.target.value);
    }
  };

  const handlePasswordChangeSubmit = async (event) => {
    event.preventDefault();
    if (password === password2) {
      await updatePassword(user, password)
        .then(() => {
          alert("비밀번호가 변경되었습니다.");
          setPassword("");
          setPassword2("");
          setIsPasswordEditMode(false);
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };

  const handleProfileSubmit = async (event) => {
    event.preventDefault();
    if (userData[0].imgName === "userImg.jpeg") {
      const imgName = profileImgFile.name + v4();
      const imageRef = ref(storage, `images/${imgName}`);
      let imageUrl = "";

      await uploadBytes(imageRef, profileImgFile);
      imageUrl = await getDownloadURL(imageRef);
      updateUserDataImg(userData[0].id, imageUrl, imgName);
      updateProfile(appAuth.currentUser, { photoURL: imageUrl });
    } else {
      const desertRef = ref(storage, `images/${userData[0].imgName}`);
      deleteObject(desertRef);

      const imgName = profileImgFile.name + v4();
      const imageRef = ref(storage, `images/${imgName}`);
      let imageUrl = "";

      await uploadBytes(imageRef, profileImgFile);
      imageUrl = await getDownloadURL(imageRef);
      updateUserDataImg(userData[0].id, imageUrl, imgName);
      updateProfile(appAuth.currentUser, { photoURL: imageUrl });
    }
  };

  const handleDuplicationClick = () => {
    if (checkNicknameValid(usersData, nickname)) {
      setIsNicknameAvailability(true);
      return true;
    } else {
      setIsNicknameAvailability(false);
      return false;
    }
  };

  const handleNicknameSubmit = async (event) => {
    event.preventDefault();
    if (!handleDuplicationClick()) {
      alert("동일한 닉네임이 있습니다.\n다른 닉네임을 입력해주세요.");
      return;
    }
    await updateUserDataNickname(userData[0].id, nickname);
    await updateProfile(appAuth.currentUser, { displayName: nickname });

    alert("닉네임이 변경되었습니다.");
    setIsProfileEditMode(false);
  };

  useEffect(() => {
    if (profileImgFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImg(reader.result);
      };
      reader.readAsDataURL(profileImgFile);
    }
  }, [profileImgFile]);

  useEffect(() => {
    if (response.success) {
      setPreviewImg("");
      setProfileImgFile("");
      imgInputRef.current.value = "";
    }
  }, [response]);

  return (
    <div className={styles.cont}>
      <div className={styles.profile_container}>
        <div className={styles.profile_img}>
          {userData && <img src={userData[0]?.imageUrl} alt="profileImg" />}
        </div>
        <div className={styles.profile_account}>
          <div className={styles.profile_account_displayName}>
            {user.displayName}
          </div>
          <div className={styles.profile_account_btn_container}>
            <button
              className={styles.profile_account_btn}
              onClick={handlePasswordEditModeChange}
            >
              <span>
                <FaEdit />
              </span>
              <span>비밀번호 변경</span>
            </button>
            <button
              className={styles.profile_account_btn}
              onClick={handleProfileEditModeChange}
            >
              <span>
                <FaEdit />
              </span>
              <span>프로필 편집</span>
            </button>
          </div>
        </div>
      </div>
      {isPasswordEditMode && (
        <div className={styles.password_edit_form_container}>
          <form
            className={styles.password_edit_form}
            onSubmit={handlePasswordChangeSubmit}
          >
            <div>
              <label>비밀번호 </label>
              <input
                type="password"
                id="password"
                onChange={handleChange}
                value={password}
              />
            </div>
            <div>
              <label>비밀번호 확인</label>
              <input
                type="password"
                id="password2"
                onChange={handleChange}
                value={password2}
              />
            </div>
            <div>
              <button type="submit">비밀번호 수정</button>
            </div>
          </form>
        </div>
      )}
      {isProfileEditMode && (
        <div className={styles.profile_edit_form_container}>
          <form onSubmit={handleProfileSubmit}>
            <div>
              <label>변경할 프로필 이미지</label>
              <input
                type="file"
                id="file"
                accept="image/*"
                required
                onChange={handleChange}
                ref={imgInputRef}
              />
              {previewImg && (
                <div className={styles.profile_previewImg}>
                  <img src={previewImg} alt="previewImg" />
                </div>
              )}
            </div>
            <div>
              <button type="submit">프로필 수정</button>
            </div>
          </form>
          <form
            className={styles.profile_nickname_edit_form}
            onSubmit={handleNicknameSubmit}
          >
            <div>
              <label>변경할 닉네임</label>
              <input
                id="nickname"
                type="text"
                value={nickname}
                onChange={handleChange}
              />
            </div>
            <div>
              <button type="button" onClick={handleDuplicationClick}>
                중복 확인
              </button>
              <button type="submit">닉네임 수정</button>
            </div>
          </form>
          {isNicknameAvailability !== "" &&
            (isNicknameAvailability ? (
              <div className={styles.nickname_form_error}>
                <span>해당 닉네임 사용가능합니다.</span>
              </div>
            ) : (
              <div className={styles.nickname_form_error}>
                <span>동일한 닉네임이 존재합니다.</span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
