import React from "react";
import './OverViewCards.css'

function OverViewCards(){
    return(
        <div className="overCards">
            <div className="Card">
                <i class="fa-solid fa-users" style={{border:"1px solid #2c4ebb", borderRadius:"50%",width:"50px", height: "50px", fontSize:"15px", display:"grid", placeItems:"center", color:"#2c4ebb",marginBottom:"5px"}}></i>
                <h1>120</h1>
                <p>Attendance</p>
            </div>

            <div className="Card">
                <i class="fa-solid fa-person-chalkboard" style={{border:"1px solid green", borderRadius:"50%",width:"50px", height: "50px", fontSize:"15px",display:"grid", placeItems:"center",color:"green",marginBottom:"5px"}}></i>
                <h1>15</h1>
                <p>Assignments Due</p>
            </div>

            <div className="Card">
                <i class="fa-solid fa-graduation-cap" style={{border:"1px solid orange", borderRadius:"50%",width:"50px", height: "50px", fontSize:"15px", display:"grid", placeItems:"center",color:"orange",marginBottom:"5px"}}></i>
                <h1>B+</h1>
                <p>Average Grade</p>
            </div>

            <div className="Card">
                <i class="fa-solid fa-font-awesome" style={{border:"1px solid #2c4ebb", borderRadius:"50%",width:"50px", height: "50px", fontSize:"15px", display:"grid", placeItems:"center",color:"#2c4ebb",marginBottom:"5px"}}></i>
                <h1>50</h1>
                <p>Reports</p>
            </div>

            <div className="Card">
                <i class="fa-solid fa-comment" style={{border:"1px solid green", borderRadius:"50%",width:"50px", height: "50px", fontSize:"15px", display:"grid", placeItems:"center",color:"green",marginBottom:"5px"}}></i>
                <h1>$45</h1>
                <p>Fee/Finance</p>
            </div>
        </div>
    )
}

export default OverViewCards;