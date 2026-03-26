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
import TimetableByclass from "./TimetableByClass";
import Users from "./Users";
import AddClass from "../AdminForms/AddClass";

function AdminDashboard (){
    return(
        <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
            <SideBar/>
            
            <div style={{ marginLeft: '250px', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Header/>
                
                <div style={{ padding: '20px', flex: 1 }}>
                    <Routes>
                        <Route path="/" element={<OverviewDashboard/>} />
                        <Route path="students" element={<StudentSearch/>} />
                        <Route path="users" element={<Users/>} />
                        <Route path="teachers" element={<TeacherSearch/>} />
                        <Route path="grades" element={<Grades/>} />
                        <Route path="attendance" element={<Attendance/>} />
                        <Route path="timetable" element={<TimetableByclass/>} />
                        <Route path="addclass" element={<AddClass/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    )
}
export default AdminDashboard;