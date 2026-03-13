import React from "react";
import studentPic from '/src/assets/team-4.jpg'

function Header() {
  return (
        <header style={{width: "100%", backgroundColor: "#2c4ebb", height: "70px", display:"flex", alignItems:"center", justifyContent:"space-between", padding: "20px 50px"}}>

            <h1 style={{color:"white"}}>SMS</h1>
             <div className="img">
                <img src={studentPic} style={{borderRadius: "50%", width: "55px", height: "55px", border:"2px solid #ffffff",backgroundColor:"white"}}alt="" />
             </div>
        </header>
  );
}

export default Header;