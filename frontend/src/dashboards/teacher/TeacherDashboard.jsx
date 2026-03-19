import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";
import TeacherCards from "./TeacherCards";
import Body from "./Body";
import Grading from "./Grading";
import TeacherStudents from "./TeacherStudents";
function DashboardHome() {
    return (
        <>
            <TeacherCards/>
            <div>
                <Body/>
            </div>
        </>
    );
}


function TeacherDashboard (){
    return(
        <div>
            <Header/>

            <div style={{display:"flex"}}>
              <SideBar/>
              <div>
                    <Routes>
                        <Route index element={<DashboardHome/>} />
                        <Route path="grading" element={<Grading/>} />
                        <Route path="students" element={<TeacherStudents/>} />
                    </Routes>
              </div>
            </div>
        </div>
    )
}
export default TeacherDashboard;