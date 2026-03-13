import React from "react";
import teacherPic from '/src/assets/team-1.jpg'


function Header (){
    return(
        <header style={{width:"100%",height:"60px",backgroundColor:"#2c4ebb",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"20px"}}>
            <h1 style={{color:"white",fontSize:"30px"}}>sms</h1>
            <div style={{display:"flex",alignItems:"center",gap:"30px"}}>
                <i class="fa-solid fa-bell" style={{fontSize:"25px",color:"white"}}></i>
                <img src={teacherPic} alt=""  style={{width:"50px",height:"50px",backgroundColor:"white",borderRadius:"50%"}}/>
            </div>
        </header>
    )
}
export default Header;