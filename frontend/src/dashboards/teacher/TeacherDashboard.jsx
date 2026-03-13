import React from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import TeacherCards from "./TeacherCards";
import Body from "./Body";


function TeacherDashboard (){
    return(
        <div>
            <Header/>

            <div style={{display:"flex"}}>
              <SideBar/>
              <div>
                    <TeacherCards/>
                    <div>
                        <Body/>
                    </div>
              </div>
            </div>
        </div>
    )
}
export default TeacherDashboard;