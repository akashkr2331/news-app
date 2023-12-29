import { useState, useEffect } from "react";
import "../styles/home.css"
import { useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";

function Home(){
    const navigate=useNavigate();
    const [items,setitems]=useState([]);
    const [gridview,setgridview]=useState(false);
    useEffect(() => {
        const latestNews=async ()=>{
        //   const response= await axios.get(`https://newsapi.org/v2/top-headlines?country=in&apiKey=d8446f43626643d79745c473523def37`)
          const response=await fetch("https://newsapi.org/v2/top-headlines?country=us&apiKey=d8446f43626643d79745c473523def37"
          , { cache: 'force-cache' })
        if(response){
            const data = await response.json();
            if(data){
            setitems(data.articles)
        }
          }
          }
          latestNews();
      }, []);

      const handleClick=(props)=>{
        navigate("/article", { state: props });
      }

    return(
        <div>
            <Navbar/>
                <div>

                <h2>Today's latest news</h2>
<div>
    
<div className="toggle-btn">
    {gridview?<div className="view">Grid View</div>:<div className="view">List View</div> }
<input type="checkbox"
   id="switch"
   class="checkbox" onChange={(e)=>{setgridview(!gridview)}}/>
    
<label for="switch"
   class="toggle"/>
</div>

{!gridview?
<div className="list">
{items && items.map && items.map(item=>(
        <button className="list-button" onClick={()=>{
            handleClick(item);
        }}>{item.title}</button>

    ))}
</div> 
:
<div className="grid-content">
    <div className="grid">
{items && items.map && items.map(item=>(
        <button onClick={()=>{
            handleClick(item)
        }} className="grid-btn">{item.title}</button>

    ))}
</div>
</div>
}
</div>
</div>      
        </div>
    )
}

export default Home;