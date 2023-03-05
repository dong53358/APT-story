import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import styles from "./Login.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, ispending, login } = useLogin();

  const handleData = (event) => {
    if (event.target.type === "email") {
      setEmail(event.target.value);
    } else if (event.target.type === "password") {
      setPassword(event.target.value);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    login(email, password);
  };

  return (
    <form className={styles.login_form} onSubmit={handleSubmit}>
      <fieldset>
        <legend>로그인</legend>
        <div className={styles.login_form_inputContainer}>
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
            id="myPassword"
            required
            placeholder="비밀번호"
            value={password}
            onChange={handleData}
          />
        </div>

        {!ispending && (
          <button type="submit" className={styles.btn}>
            로그인
          </button>
        )}
        {ispending && <string>로그인 진행중...</string>}
        {error && <string>{error}</string>}
      </fieldset>
    </form>
  );
}
