import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useReducer } from "react";
import { appFireStore, timestamp } from "../firebase/config";

const iniState = {
  document: null,
  isPending: false,
  error: null,
  success: false,
};

const storeReducer = (state, action) => {
  switch (action.type) {
    case "isPending":
      return { ispending: true, document: null, success: false, error: null };
    case "addDoc":
      return {
        ispending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "error":
      return {
        ispending: false,
        document: null,
        success: false,
        error: action.payload,
      };
    case "deleteDoc":
      return {
        ispending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "updateDoc":
      return {
        ispending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    default:
      return state;
  }
};

// 저장할 컬렌션을 인자로 전달합니다.
export const useFirestore = (transaction) => {
  const [response, dispatch] = useReducer(storeReducer, iniState);

  // colRef : 컬렉션의 참조를 요구합니다.
  const colRef = collection(appFireStore, transaction);
  // 컬렉션에 문서를 추가합니다.
  const addDocument = async (doc) => {
    dispatch({ type: "isPending" });
    try {
      const createdTime = timestamp.fromDate(new Date());
      let likeList = [];
      const docRef = await addDoc(colRef, { ...doc, createdTime, likeList });
      dispatch({ type: "addDoc", payload: docRef });
    } catch (error) {
      dispatch({ type: "error", payload: error.message });
    }
  };

  // user 컬렉션에 user 정보 저장
  const addUserNickname = async (email, uid, displayName) => {
    dispatch({ type: "isPending" });
    try {
      const createdTime = timestamp.fromDate(new Date());

      const imageUrl =
        "https://firebasestorage.googleapis.com/v0/b/mydiary-50193.appspot.com/o/images%2FuserImg.jpeg?alt=media&token=a92108c4-84d6-4acc-8c09-06ba66d10646";
      const imgName = "userImg.jpeg";
      const docRef = await addDoc(colRef, {
        email,
        uid,
        displayName,
        createdTime,
        imageUrl,
        imgName,
      });
      dispatch({ type: "addDoc", payload: docRef });
    } catch (error) {
      dispatch({ type: "error", payload: error.message });
    }
  };

  // 컬렉션에서 문서를 제거합니다.
  const deleteDocument = async (id) => {
    dispatch({ type: "isPending" });
    try {
      const docRef = await deleteDoc(doc(colRef, id));
      dispatch({ type: "deleteDoc", payload: docRef });
    } catch (error) {
      dispatch({ type: "error", payload: error.message });
    }
  };

  // 컬렉션에서 문서를 수정합니다.
  const updateDocument = async (id, title, text, category) => {
    dispatch({ type: "isPending" });
    try {
      const docRef = await updateDoc(doc(colRef, id), {
        title: title,
        text: text,
        category: category,
      });
      dispatch({ type: "updateDoc", payload: docRef });
    } catch (error) {
      dispatch({ type: "error", payload: error.message });
    }
  };

  // 컬렉션에서 문서를 수정합니다 + 이미지.
  const updateDocument_img = async (
    id,
    title,
    text,
    category,
    imageUrl,
    imgName
  ) => {
    dispatch({ type: "isPending" });
    try {
      const docRef = await updateDoc(doc(colRef, id), {
        title: title,
        text: text,
        category: category,
        imageUrl: imageUrl,
        imgName: imgName,
      });
      dispatch({ type: "updateDoc", payload: docRef });
    } catch (error) {
      dispatch({ type: "error", payload: error.message });
    }
  };

  // comments 컬렉션에서 문서를 수정합니다.
  const updateComment = async (id, editComment) => {
    dispatch({ type: "isPending" });
    try {
      const docRef = await updateDoc(doc(colRef, id), {
        content: editComment,
      });
      dispatch({ type: "updateDoc", payload: docRef });
    } catch (error) {
      dispatch({ type: "error", payload: error.message });
    }
  };

  // user 컬렉션 문서에 imageUrl 필드를 추가합니다..
  const updateUserDataImg = async (id, imageUrl, imgName) => {
    dispatch({ type: "isPending" });
    try {
      const docRef = await updateDoc(doc(colRef, id), {
        imageUrl: imageUrl,
        imgName: imgName,
      });
      dispatch({ type: "updateDoc", payload: docRef });
    } catch (error) {
      dispatch({ type: "error", payload: error.message });
    }
  };

  // user 컬렉션 문서의 nickname 을 수정합니다.
  const updateUserDataNickname = async (id, displayName) => {
    dispatch({ type: "isPending" });
    try {
      const docRef = await updateDoc(doc(colRef, id), {
        displayName: displayName,
      });
      dispatch({ type: "updateDoc", payload: docRef });
    } catch (error) {
      dispatch({ type: "error", payload: error.message });
    }
  };

  // 좋아요 버튼 클릭한 사용자 추가
  const updateLikeList = async (id, likeList) => {
    dispatch({ type: "isPending" });
    try {
      const docRef = await updateDoc(doc(colRef, id), {
        likeList: [...likeList],
      });
      dispatch({ type: "updateDoc", payload: docRef });
    } catch (error) {
      dispatch({ type: "error", payload: error.message });
    }
  };

  return {
    addDocument,
    addUserNickname,
    deleteDocument,
    updateDocument,
    updateDocument_img,
    updateComment,
    updateUserDataNickname,
    updateUserDataImg,
    updateLikeList,
    response,
  };
};
