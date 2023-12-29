import { auth, provider } from "../firebase-config.js";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
import {useDispatch} from "react-redux"
import { setisAuth } from "../state.js";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import "../styles/Auth.css"


const Auth = () => {
  const cookies = new Cookies();
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      if(result){
      dispatch(setisAuth(true));
      navigate("/");
    }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <Navbar/>
      <div className="auth">
      <p> Sign In With Google To Continue </p>
      <button onClick={signInWithGoogle}> Sign In With Google </button>
    </div>
    </div>
  );
};

export default Auth;