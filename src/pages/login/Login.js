import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { passwordValidation } from "../../utils/validations";
import google from "../../assets/images/googleLogo.png";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(true);
  const { error, ispending, login, googleLogin } = useLogin();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (passwordValidation(password)) {
      setPasswordError(true);
      login(email, password);
    } else {
      setPasswordError(false);
    }
  };

  const handleGoogleLoginBtn = (event) => {
    event.preventDefault();
    googleLogin();
  };

  return (
    <>
      <div className={styles.login_head}>
        <span>APT story</span>
        <span>APT story에서 아파트 입주민들과 함께 이야기를 나눠보세요.</span>
        <span>로그인 후 사용하실 수 있습니다</span>
      </div>
      <form className={styles.login_form} onSubmit={handleSubmit}>
        <fieldset>
          <legend>로그인</legend>
          <div className={styles.login_form_inputContainer}>
            <input
              type="email"
              id="myEmail"
              required
              placeholder="이메일"
              value={email}
              onChange={handleEmailChange}
            />
            <input
              type="password"
              id="myPassword"
              required
              placeholder="비밀번호"
              value={password}
              onChange={handlePasswordChange}
            />
            {!passwordError && (
              <span className={styles.login_form_input_span}>
                비밀번호가 6자 이상이어야 합니다
              </span>
            )}
          </div>

          {!ispending && (
            <>
              <button type="submit" className={styles.login_form_btn}>
                로그인
              </button>
              <button
                className={styles.login_form_google_btn}
                onClick={handleGoogleLoginBtn}
              >
                <span>
                  <img src={google} alt="Image" />
                </span>
                <span>구글계정으로 로그인</span>
              </button>
            </>
          )}
          {ispending && <string>로그인 진행중...</string>}
          {error && <div className={styles.login_form_error}>{error}</div>}
        </fieldset>
      </form>
      <div className={styles.link_signup}>
        <Link to="/signup">회원가입</Link>
      </div>
    </>
  );
}
