import { useEffect, useState } from "react";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { db, auth} from "../firebase-config";
import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  deleteDoc,
  query,
  doc,
  getDocs
} from "firebase/firestore";
import { useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import {useSelector} from "react-redux"
import { useNavigate } from "react-router-dom";
import "../styles/Article.css"

function Article(){
  const isAuth=useSelector((state)=>state.isAuth);
  const navigate=useNavigate();
    const [Favorite,setFavorite]=useState(false);
    const favouriteRef = collection(db, "favourites");
    const location = useLocation();
  const props = location.state;
  let data=[];
  if(isAuth){
     data= {
      createdAt: serverTimestamp(),
      user: auth.currentUser.email,
      article: props,
    };
  }
    

      useEffect(() => {
        if(isAuth){
        const asyncFn = async () => { 
            const q = query(collection(db, "favourites"), where('user','==',auth.currentUser.email),where('article','==', props));
        const querySnapshot =await  getDocs(q);
        querySnapshot.forEach(() => {
            setFavorite(true) })
         }
        asyncFn();
      }
      }, []);

    const handleChange = async () => {
      if(isAuth){
        if(Favorite){
const q = query(collection(db, "favourites"), where('user','==',auth.currentUser.email),where('article','==', props));
const querySnapshot = await getDocs(q);
querySnapshot.forEach((curr) => {
const docref=doc(db,"favourites",curr.id);
deleteDoc(docref);
});

          setFavorite(!Favorite);
      }
      else{
          await addDoc(favouriteRef,data);
            setFavorite(!Favorite);
      }
      }
      else{
        navigate("/signin")
      }
        
      };
    

return(
    <div>
      <div><Navbar/></div>
        {/* <h1>Article Page</h1> */}
        <div className="article">
            <h3>{props.title}</h3>
            <div className="desc">{props.description}</div>
            <img src={props.urlToImage} alt=""/>
            <div className="link"><a href={props.url}>Link to full article</a></div>

            

        </div>
        <div className="fav-item">
            <div className="fav">
                {
                !Favorite?
            <div>Add to Favorite</div>
            :
            <div>Remove from Favorite</div>
            }
            </div>
            <button onClick={handleChange} className="like">{!Favorite?<MdFavoriteBorder/>:<MdFavorite/>}</button>
            </div>
    </div>
)
}

export default Article;