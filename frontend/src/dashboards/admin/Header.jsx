import React from "react";
import profilePic from '/src/assets/team-2.jpg'
import './Header.css'

function Header(){
    return(
        <header style={{width:"100%",height:"60px",background:" #2c4ebb",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"20px"}}>
            <div style={{display:"flex",alignItems:"center",gap:"100px"}}>
                <h1 style={{color:"white",fontSize:"30px"}}>sms</h1>
                <div className="admin-search-wrapper">
                    <i class="fa-solid fa-search"></i>
                    <input type="text" placeholder="student,teacher,......." />
                </div>
            </div>

            <div style={{color:"white",display:"flex",alignItems:"center", gap:"30px"}}>
                <i class="fa-solid fa-bell" style={{fontSize:"25px"}}></i>
                <div className="profile">
                    <img src={profilePic} alt="" style={{width:"50px",height:"50px",backgroundColor:"white",borderRadius:"50%"}}  />
                </div>
            </div>
        </header>
    )
}
export default Header;