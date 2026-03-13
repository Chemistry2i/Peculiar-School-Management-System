import React from "react";
import AdminCards from "./AdminCards";
import Header from "./Header";
import SideBar from "./SideBar";
import Body from "./Body";


function OverviewDashboard (){
    return(
        <>
            <div className="admin-overview">
                <div>
                    <AdminCards/>
                    <Body/>
                </div>
            </div>
            
        </>
    )
}
export default OverviewDashboard;