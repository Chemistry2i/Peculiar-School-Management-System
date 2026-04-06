import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";
import Body from "./Body";
import Grading from "./Grading";
import TeacherStudents from "./TeacherStudents";
import MyClasses from "./MyClasses";

function DashboardHome() {
    return (
        <>
            <div style={{ padding: '20px' }}>
                <Body />
            </div>
        </>
    );
}

function TeacherDashboard() {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
            <SideBar />
            
            <div style={{ marginLeft: '250px', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Header />
                
                <div style={{ padding: '20px', flex: 1 }}>
                    <Routes>
                        <Route path="/" element={<DashboardHome />} />
                        <Route path="grading" element={<Grading />} />
                        <Route path="students" element={<TeacherStudents />} />
                        <Route path="myclasses" element={<MyClasses />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default TeacherDashboard;