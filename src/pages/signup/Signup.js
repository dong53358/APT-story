import styles from "./Signup.module.css";
import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import { Link } from "react-router-dom";
import { useCollection } from "../../hooks/useCollection";
import checkNicknameValid from "../../utils/checkNicknameValid";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [isNicknameAvailability, setIsNicknameAvailability] = useState("");
  const { error, signup } = useSignup();
  const { documents } = useCollection("user");

  const handleData = (event) => {
    if (event.target.type === "email") {
      setEmail(event.target.value);
    } else if (event.target.id === "myPassWord") {
      setPassword(event.target.value);
    } else if (event.target.id === "myPassWord2") {
      setPassword2(event.target.value);
    } else if (event.target.type === "text") {
      setDisplayName(event.target.value);
    }
  };

  const handleDuplicationClick = () => {
    if (checkNicknameValid(documents, displayName)) {
      setIsNicknameAvailability(true);
      return true;
    } else {
      setIsNicknameAvailability(false);
      return false;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password === password2) {
      if (!handleDuplicationClick()) {
        alert("동일한 닉네임이 있습니다.\n다른 닉네임을 입력해주세요.");
        return;
      }
      signup(email, password, displayName);
    } else {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
  };

  return (
    <>
      <div className={styles.signup_head}>
        <span>APT story</span>
        <span>APT story에서 아파트 입주민들과 함께 이야기를 나눠보세요.</span>
      </div>
      <form className={styles.signup_form} onSubmit={handleSubmit}>
        <fieldset>
          <legend>회원가입</legend>
          <div className={styles.signup_form_inputContainer}>
            <input
              type="email"
              id="myEmail"
              required
              placeholder="이메일"
              value={email}
              onChange={handleData}
            />
            <input
              type="password"
              id="myPassWord"
              required
              placeholder="비밀번호"
              value={password}
              onChange={handleData}
            />
            <input
              type="password"
              id="myPassWord2"
              required
              placeholder="비밀번호 확인"
              value={password2}
              onChange={handleData}
            />
            <div className={styles.nickName_container}>
              <input
                type="text"
                id="myNickName"
                required
                placeholder="닉네임"
                minLength="2"
                maxLength="12"
                value={displayName}
                onChange={handleData}
              />
              <button type="button" onClick={handleDuplicationClick}>
                중복확인
              </button>
            </div>
          </div>

          <button type="submit" className="btn">
            회원가입
          </button>
          {isNicknameAvailability !== "" &&
            (isNicknameAvailability ? (
              <div className={styles.signup_form_error}>
                <span>해당 닉네임 사용가능합니다.</span>
              </div>
            ) : (
              <div className={styles.signup_form_error}>
                <span>동일한 닉네임이 존재합니다.</span>
              </div>
            ))}
          {error && <div className={styles.signup_form_error}>{error}</div>}
        </fieldset>
      </form>
      <div className={styles.link_login}>
        <Link to="/login">로그인</Link>
      </div>
    </>
  );
}
