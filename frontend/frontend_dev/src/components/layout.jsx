import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom"
import { useDispatch } from "react-redux"
import { slide as Burger } from 'react-burger-menu'
import "../styles/css/layout.min.css";
import { useMediaQuery } from 'react-responsive'

import Header from "./header"
import Sidebar from "./sidebar"

import api from "../api/requests"
import { websocketUrl } from "../utils/env_variables"
import { checkAuth, websocket, userInfo } from "../store/userSlice"
import getDate from "../utils/datetime"

import { ToastContainer, toast } from 'react-toastify';
import { fetchToken, onMessageListener } from '../firebase/firebase';


const Layout = (props) => {

    const [notification, setNotification] = useState('');
    const [isTokenFound, setTokenFound] = useState(false);
    // fetchToken(setTokenFound);

    onMessageListener().then(payload => {
        setNotification(payload.notification.title)
        console.log(payload);
        toast(notification)
    }).catch(err => console.log('failed: ', err));

    const onShowNotificationClicked = () => {
        fetchToken(setTokenFound);

        toast(notification)
    }


    // --------------------------------------------
    const dispatch = useDispatch()
    const isMobile = useMediaQuery({ query: '(max-width: 812px)' })

    const checkSessionActions = async () => {
        const authStatus = await api.check_session()
        dispatch(checkAuth(authStatus))
        if (authStatus) {
            await api.getMe().then(response => {
                dispatch(userInfo(response.data))
                let socketAvatar = response.data.avatar.replaceAll('/', '+')
                const socket = new WebSocket(`${websocketUrl}/websocket/api/chat/${response.data.first_name}/${socketAvatar}`)
                dispatch(websocket(socket))
            });
        } else {
            const socket = new WebSocket(`${websocketUrl}/websocket/api/chat/${null}/${null}`)
            dispatch(websocket(socket))
        }
    }

    useEffect(() => { checkSessionActions(); }, []);

    return (
        <main>


            <button onClick={onShowNotificationClicked}>Show Toast</button>
            {isTokenFound && <h1> Notification permission enabled 👍🏻 </h1>}
            {!isTokenFound && <h1> Need notification permission ❗️ </h1>}

            <ToastContainer position="top-left" theme="dark" />


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