import React from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import Banner from "./Banner";
import OverViewCards from "./OverViewCards";
import Charts from "./Charts";

function StudentDashboard() {
  return (
    <>
        <Header />
        <div className="Home" style={{display: "flex", gap: "20px"}}>
            <SideBar />
            <div style={{ width:"100%",padding:"20px"}}>
                <Banner />
                <OverViewCards />
                <Charts />
            </div>
        </div>


    </>
  );
}

export default StudentDashboard;