import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import { useAuthContext } from "./hooks/useAuthContext";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Nav from "./components/Nav";
import styles from "./App.module.css";
import Info from "./pages/info/Info";
import Free from "./pages/free/Free";
import Quest from "./pages/quest/Quest";

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
                  path="/info"
                  element={
                    user ? <Info /> : <Navigate replace={true} to="/login" />
                  }
                ></Route>
                <Route
                  path="/quest"
                  element={
                    user ? <Quest /> : <Navigate replace={true} to="/login" />
                  }
                ></Route>
                <Route
                  path="/free"
                  element={
                    user ? <Free /> : <Navigate replace={true} to="/login" />
                  }
                ></Route>
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
