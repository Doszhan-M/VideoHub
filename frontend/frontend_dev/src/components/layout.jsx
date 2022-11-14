import React from "react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom"
import { useDispatch } from "react-redux"
import { slide as Burger } from 'react-burger-menu'
import "../styles/css/layout.min.css";
import { useMediaQuery } from 'react-responsive'

import Header from "./header"
import Sidebar from "./sidebar"

import api from "../api/requests"
import { checkAuth } from "../store/userSlice"


const Layout = (props) => {

    const dispatch = useDispatch()
    const isMobile = useMediaQuery({ query: '(max-width: 812px)' })

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
                {isMobile ? (
                    <Burger
                        customCrossIcon={<img src="/images/icons/icons8-close-30.png" />}
                        customBurgerIcon={<img src="/images/icons/burger.png" />}>
                        <Sidebar />
                    </Burger>
                ) : (
                    <Sidebar />

                )}

                <div className="pages">
                    <Outlet />
                </div>
            </div>
        </main>
    )
}

export default Layout 