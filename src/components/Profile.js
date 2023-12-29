import { useState,useEffect } from "react";
import { db, auth} from "../firebase-config";
import {
    collection,
    where,
    onSnapshot,
    query,
  } from "firebase/firestore";
  import { useNavigate } from "react-router-dom";
  import { Navbar } from "./Navbar";
  import {useSelector} from "react-redux"
import "../styles/Profile.css"

const Profile=()=>{
  const navigate=useNavigate();
  const isAuth=useSelector((state)=>state.isAuth);
  const [gridview,setgridview]=useState(false);
  const [items,setitems]=useState([]);
  

  useEffect(() => {
    if(!isAuth ){
      navigate("/signin")
    }
    else if(auth.currentUser==null){
      navigate("/")
    }
    else{
        const asyncFn = async () => { 
          const q = query(collection(db, "favourites"), where('user','==',auth.currentUser.email));
          const unsuscribe = onSnapshot(q, (snapshot) => {
              let favs = [];
              snapshot.forEach((doc) => {
                favs.push({ ...doc.data(), id: doc.id });
              });
              setitems(favs);
            });
        
            return () => unsuscribe();
       }
      asyncFn();
      }
  }, []);

  const handleClick=(props)=>{
    navigate("/article", { state: props });
  }

  return ( 
      <div className="full">
        <Navbar/>
          {/* <h1>Profile Page </h1> */}
          <div className="profile-main">
              <h2>Your Favorite articles</h2>
              
              <div className="items">
    
    <div className="toggle-btn">
        {gridview?<div className="view">Grid View</div>:<div className="view">List View</div> }
    <input type="checkbox"
       id="switch"
       class="checkbox" onChange={(e)=>{setgridview(!gridview)}}/>
        
    <label for="switch"
       class="toggle">
    </label>
    </div>
    
    {!gridview?
    <div className="list">
    {items && items.map && items.map(item=>(
            <button className="list-button" onClick={()=>{
                handleClick(item.article);
            }} key={item}>{item.article.title}</button>
    
        ))}
    </div> 
    :
    <div className="grid-content">
        <div className="grid">
    {items && items.map && items.map(item=>(
            <button onClick={()=>{
                handleClick(item.article)
            }} className="grid-btn">{item.article.title}</button>
    
        ))}
    </div>
    </div>
    }
    </div>
              
          </div>
       </div>
  )
}

export default Profile;