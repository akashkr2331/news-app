import Home from './home';
import React, { useState } from "react";
import { Auth } from "./Auth";
import { AppWrapper } from "./Navbar";
import Cookies from "universal-cookie";
const cookies = new Cookies();

function Main() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));

  if (!isAuth) {
    return (
      <AppWrapper
        isAuth={isAuth}
      >
        <Auth setIsAuth={setIsAuth} />
      </AppWrapper>
    );
  }

  return (
    <div className="App">
      
      <AppWrapper isAuth={isAuth} setIsAuth={setIsAuth}>
        <Home/>
        </AppWrapper>

      
    </div>
  );
}

export default Main;
