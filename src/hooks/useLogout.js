import { signOut } from "firebase/auth";
import { useState } from "react";
import { appAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const [error, setError] = useState(null);
  const [isPending, setIspending] = useState(false);
  const { dispatch } = useAuthContext();

  const logout = () => {
    setError(null);
    setIspending(true);

    signOut(appAuth)
      .then(() => {
        // Sign-out successful.
        dispatch({ type: "logout" });
        setError(null);
        setIspending(false);
      })
      .catch((error) => {
        // An error happened.
        setError(error.message);
        setIspending(false);
      });
  };
  return { error, isPending, logout };
};
