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

        updateProfile(appAuth.currentUser, { displayName })
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
