import React from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import AdminCards from "./AdminCards";
import Body from "./Body";
// import StudentSearch from "../../StudentSearch";
import StudentSearch from "./StudentSearch"
// import TeacherSearch from "../../TeacherSearch";
import { Routes,Route } from "react-router-dom";
import OverviewDashboard from "./OverviewDashboard";
import TeacherSearch from "./TeacherSearch";
import Attendance from "./Attendance";
import Grades from "./Grades";
import TimetableByclass from "./TimetableByclass";

function AdminDashboard (){
    return(
        <div>
            <Header/>
            <div className="admin-overview">
                <SideBar/>

                <div>
                    {/* <AdminCards/> */}

                    <div>
                        <Routes>
                            <Route path="/" element={<OverviewDashboard/>} />
                            <Route path="students" element={<StudentSearch/>} />
                            <Route path="teachers" element={<TeacherSearch/>} />
                            <Route path="grades" element={<Grades/>} />
                            <Route path="attendance" element={<Attendance/>} />
                            <Route path="timetable" element={<TimetableByclass/>} />
                        </Routes>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
export default AdminDashboard;