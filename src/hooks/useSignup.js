import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { appAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
import { useFirestore } from "./useFirestore";

export const useSignup = () => {
  // 에러 정보를 저장
  const [error, setError] = useState(null);
  // 현재 서버와 통신상태를 저장
  const [isPending, setIspending] = useState(false);
  const { dispatch } = useAuthContext();
  const { addUserNickname } = useFirestore("user");

  const signup = (email, password, displayName) => {
    setError(null); // 아직 에러가 없음
    setIspending(true); // 통신 진행중

    createUserWithEmailAndPassword(appAuth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (!user) {
          throw new Error("회원가입에 실패했습니다.");
        }
        const photoURL =
          "https://firebasestorage.googleapis.com/v0/b/mydiary-50193.appspot.com/o/images%2FuserImg.jpeg?alt=media&token=a92108c4-84d6-4acc-8c09-06ba66d10646";
        updateProfile(appAuth.currentUser, { displayName, photoURL })
          .then(() => {
            addUserNickname(user.email, user.uid, user.displayName);
            dispatch({ type: "login", payload: user });
            setError(null);
            setIspending(false);
          })
          .catch((err) => {
            setError(err.message);
            setIspending(false);
          });
      })
      .catch((err) => {
        setError(err.message);
        setIspending(false);
      });
  };

  return { error, isPending, signup };
};
