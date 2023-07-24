import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./views/Home";
import Header from "./components/common/header/index";
import Footer from "./components/common/footer";
import useUserAuthentication from "./custom-hooks/useUserAuthentication";
import styles from "./styles/authentication.module.scss";

function App() {
  // const location = useLocation();
  // const navigate = useNavigate();
  const { isAuthenticating, isAuthenticated } = useUserAuthentication();

  // useEffect(() => {
  //   const token = sessionStorage.getItem("token");
  //   if (location.state !== null) {
  //     if (location.state.prevRoute === "check" && token === "enabled") {
  //       console.log(location.state.prevRoute);
  //       return;
  //     }
  //   }
  //   if (token === null) {
  //     navigate("not-found");
  //   }
  // }, []);

  return (
    <>
      <Header />
      {isAuthenticating ? (
        <div className={styles.mainwrapper}>Authenticating...</div>
      ) : (
        <>
          {isAuthenticated ? (
            <Routes>
              <Route path="/" exact element={<Home />} />
            </Routes>
          ) : (
            <Navigate to="/not-authorized" />
          )}
        </>
      )}
      <Footer />
    </>
  );
}

export default App;
