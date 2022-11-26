import React from "react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { slide as Burger } from 'react-burger-menu'
import "../styles/css/layout.min.css";
import { useMediaQuery } from 'react-responsive'

import Header from "./header"
import Sidebar from "./sidebar"

import api from "../api/requests"
import { checkAuth, websocket, userInfo } from "../store/userSlice"
import getDate from "../utils/datetime"


const Layout = (props) => {

    const dispatch = useDispatch()
    const isMobile = useMediaQuery({ query: '(max-width: 812px)' })

    const checkSessionActions = async () => {
        const authStatus = await api.check_session()
        dispatch(checkAuth(authStatus))
        if (authStatus) {
            await api.getMe().then(response => {
                dispatch(userInfo(response.data))
                let socketAvatar = response.data.avatar.replaceAll('/', '+')
                const socket = new WebSocket(`wss://video.localhost/websocket/api/chat/${response.data.first_name}/${socketAvatar}`)
                dispatch(websocket(socket))
            });
        } else {
            const socket = new WebSocket(`wss://video.localhost/websocket/api/chat/${null}/${null}`)
            dispatch(websocket(socket))
        }
    }

    useEffect(() => { checkSessionActions(); }, []);

    return (
        <main>
            <Header tasks={props.all_tasks} />
            <div className="container">
                {isMobile ? (
                    <Burger
                        customCrossIcon={<img src="/images/icons/icon_close.png" />}
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
            <footer>{getDate()}</footer>
        </main>
    )
}

export default Layout 