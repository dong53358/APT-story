import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/header/Header";
import { useAuthContext } from "./hooks/useAuthContext";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Nav from "./components/nav/Nav";
import styles from "./App.module.css";
import Info from "./pages/info/Info";
import Free from "./pages/free/Free";
import Quest from "./pages/quest/Quest";
import Profile from "./pages/mypage/Profile";
import MyPosts from "./pages/mypage/MyPosts";
import LikePosts from "./pages/mypage/LikePosts";

function App() {
  const { isAuthReady, user } = useAuthContext();
  return (
    <div className="App">
      {isAuthReady ? (
        <BrowserRouter>
          <>
            <Header />
            <div className={styles.container}>
              {user ? <Nav /> : null}
              <Routes>
                <Route
                  path="/"
                  element={
                    user ? <Home /> : <Navigate replace={true} to="/login" />
                  }
                >
                  <Route path="/img/:Id" element={<Home />}></Route>
                </Route>
                <Route
                  path="/login"
                  element={
                    !user ? <Login /> : <Navigate replace={true} to="/" />
                  }
                ></Route>
                <Route
                  path="/signup"
                  element={
                    !user ? <Signup /> : <Navigate replace={true} to="/" />
                  }
                ></Route>
                <Route
                  path="/free"
                  element={
                    user ? <Free /> : <Navigate replace={true} to="/login" />
                  }
                >
                  <Route path="/free/img/:Id" element={<Free />}></Route>
                </Route>
                <Route
                  path="/info"
                  element={
                    user ? <Info /> : <Navigate replace={true} to="/login" />
                  }
                >
                  <Route path="/info/img/:Id" element={<Info />}></Route>
                </Route>
                <Route
                  path="/quest"
                  element={
                    user ? <Quest /> : <Navigate replace={true} to="/login" />
                  }
                >
                  <Route path="/quest/img/:Id" element={<Quest />}></Route>
                </Route>
                <Route
                  path="/mypage/profile"
                  element={
                    user ? <Profile /> : <Navigate replace={true} to="/login" />
                  }
                ></Route>
                <Route
                  path="/mypage/my-posts"
                  element={
                    user ? <MyPosts /> : <Navigate replace={true} to="/login" />
                  }
                >
                  <Route
                    path="/mypage/my-posts/img/:Id"
                    element={<MyPosts />}
                  ></Route>
                </Route>
                <Route
                  path="/mypage/liked-posts"
                  element={
                    user ? (
                      <LikePosts />
                    ) : (
                      <Navigate replace={true} to="/login" />
                    )
                  }
                >
                  <Route
                    path="/mypage/liked-posts/img/:Id"
                    element={<LikePosts />}
                  ></Route>
                </Route>
              </Routes>
            </div>
          </>
        </BrowserRouter>
      ) : (
        "loading..."
      )}
    </div>
  );
}

export default App;
