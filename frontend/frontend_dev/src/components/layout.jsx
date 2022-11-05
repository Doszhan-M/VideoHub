import React from "react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

import "../styles/css/layout.min.css";

import Header from "./header"
import Sidebar from "./sidebar"

import api from "../api/requests"
import { checkAuth } from "../store/userSlice"


const Layout = (props) => {
    const dispatch = useDispatch()
    
    useEffect(() => {
        api.check_session().then(response => {
            let authStatus = response.data.isAuthenticated
            dispatch(checkAuth(authStatus))
        });
    }, []);



    return (
        <main>
            <Header tasks={props.all_tasks} />
            <div className="container">
                <Sidebar />
                <div className="pages">
                    <Outlet />
                </div>
            </div>
        </main>
    )
}

export default Layout 