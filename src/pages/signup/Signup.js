import styles from "./Signup.module.css";
import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const { error, isPending, signup } = useSignup();

  const handleData = (event) => {
    if (event.target.type === "email") {
      setEmail(event.target.value);
    } else if (event.target.type === "password") {
      setPassword(event.target.value);
    } else if (event.target.type === "text") {
      setDisplayName(event.target.value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    signup(email, password, displayName);
  };

  return (
    <form className={styles.signup_form} onSubmit={handleSubmit}>
      <fieldset>
        <legend>회원가입</legend>
        <div className={styles.signup_form_inputContainer}>
          <input
            type="email"
            id="myEmail"
            required
            placeholder="아이디"
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
            type="text"
            id="myNickName"
            required
            placeholder="닉네임"
            value={displayName}
            onChange={handleData}
          />
        </div>

        <button type="submit" className="btn">
          회원가입
        </button>
      </fieldset>
    </form>
  );
}
