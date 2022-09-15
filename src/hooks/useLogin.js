import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { appAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  // 에러 정보를 저장
  const [error, setError] = useState(null);
  // 현재 서버와 통신상태를 저장
  const [isPending, setIspending] = useState(false);
  const { dispatch } = useAuthContext();

  const login = (email, password) => {
    setError(null); // 아직 에러가 없음
    setIspending(true); // 통신 진행중

    signInWithEmailAndPassword(appAuth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch({ type: "login", payload: user });
        setError(null);
        setIspending(false);
        if (!user) {
          throw new Error("로그인에 실패했습니다.");
        }
      })
      .catch((err) => {
        setError(err.message);
        setIspending(false);
        console.log(err.message);
      });
  };
  return { error, isPending, login };
};
