import { auth } from "../firebase-config.js";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import {useDispatch,useSelector} from "react-redux"
import {setMode, setisAuth } from "../state";
import "../styles/Navbar.css"
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";

const cookies = new Cookies();

export const Navbar = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const isAuth=useSelector((state)=>state.isAuth);
  const mode=useSelector((state)=>state.mode);

  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    dispatch(setisAuth(false))
  };

  return (
    <div className="main-nav">
      

      <div className="home-nav"><button onClick={() => navigate("/")} className="home-btn">Home</button></div>

      {isAuth && (
        <div className="profile-nav">
        <button onClick={() => navigate("/profile")} className="profile-btn">Profile</button> 
       </div>

           
          
    )}

{isAuth && (
        <div className="sign-out-nav">
        <button onClick={signUserOut} className="sign-out-btn"> Sign Out</button>
      </div>
    )}

    {!isAuth && (
      <div className="sign-in-nav">
      <button onClick={()=>navigate("/signin")} className="sign-in-btn"> Sign IN</button>
    </div>
    )}
    
      <div>
        <button onClick={()=>dispatch(setMode())}>
          {mode=='light'? <CiLight/>:<MdDarkMode/>}
        </button>
      </div>
    </div>
  );
};