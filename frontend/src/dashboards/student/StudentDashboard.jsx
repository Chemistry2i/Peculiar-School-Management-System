import React from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import Body from "./Body";
import Footer from "./Footer";

function StudentDashboard() {
  return (
    <>
        <Header />
        <SideBar />
        <div style={{ marginLeft: '250px', paddingBottom: '60px' }}>
            <Body />
            <Footer />
        </div>
    </>
  );
}

export default StudentDashboard;